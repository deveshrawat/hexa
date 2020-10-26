import { call, delay, put, select } from 'redux-saga/effects';
import { createWatcher } from '../utils/utilities';
import {
  INIT_DB,
  dbInitialized,
  FETCH_FROM_DB,
  dbFetched,
  INSERT_INTO_DB,
  dbInserted,
  ENRICH_SERVICES,
  servicesEnriched,
} from '../actions/storage';
import dataManager from '../../storage/database-manager';
import RegularAccount from '../../bitcoin/services/accounts/RegularAccount';
import TestAccount from '../../bitcoin/services/accounts/TestAccount';
import SecureAccount from '../../bitcoin/services/accounts/SecureAccount';
import S3Service from '../../bitcoin/services/sss/S3Service';
import TrustedContactsService from '../../bitcoin/services/TrustedContactsService';
import { AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import semver from 'semver';
import { updateWalletImage } from '../actions/sss';
import { calculateExchangeRate, startupSync } from '../actions/accounts';
import { syncLastSeens } from '../actions/trustedContacts';
// import { timer } from '../../utils'

function* initDBWorker() {
  try {
    yield call(dataManager.initialize);
    yield put(dbInitialized(true));
  } catch (err) {
    console.log(err);
    yield put(dbInitialized(false));
  }
}

export const initDBWatcher = createWatcher(initDBWorker, INIT_DB);

function* fetchDBWorker() {
  try {
    // let t = timer('fetchDBWorker')
    const key = yield select((state) => state.storage.key);
    const database = yield call(dataManager.fetch, key);
    if (key && database) {
      yield call(servicesEnricherWorker, { payload: { database } });
      yield put(dbFetched(database));

      if (yield call(AsyncStorage.getItem, 'walletExists')) {
        // actions post DB fetch
        yield put(syncLastSeens());
        yield put(updateWalletImage());
        yield put(calculateExchangeRate());
        yield put(startupSync());
      }
    } else {
      // DB would be absent during wallet setup
    }
  } catch (err) {
    console.log(err);
  }
}

export const fetchDBWatcher = createWatcher(fetchDBWorker, FETCH_FROM_DB);

export function* insertDBWorker({ payload }) {
  try {
    const storage = yield select((state) => state.storage);
    const { database, insertedIntoDB, key } = storage;
    if (!key) {
      // dispatch failure
      console.log('Key missing');
      return;
    }

    const updatedDB = {
      ...database,
      ...payload,
    };

    const inserted = yield call(
      dataManager.insert,
      updatedDB,
      key,
      insertedIntoDB,
    );
    if (!inserted) {
      // dispatch failure
      console.log('Failed to insert into DB');
      return;
    }
    yield put(dbInserted(payload));
    // !insertedIntoDB ? yield put( enrichServices( updatedDB ) ) : null; // enriching services post initial insertion
    yield call(servicesEnricherWorker, { payload: { database: updatedDB } });
  } catch (err) {
    console.log(err);
  }
}
export const insertDBWatcher = createWatcher(insertDBWorker, INSERT_INTO_DB);

function* servicesEnricherWorker({ payload }) {
  try {
    const database = payload.database
      ? payload.database
      : yield select((state) => state.storage.database);
    if (!database) {
      throw new Error('Database missing; services encrichment failed');
    }

    let dbVersion = database.VERSION;
    let appVersion = DeviceInfo.getVersion();
    if (appVersion === '0.7') {
      appVersion = '0.7.0';
    }
    if (appVersion === '0.8') {
      appVersion = '0.8.0';
    }
    if (appVersion === '0.9') {
      appVersion = '0.9.0';
    }
    const {
      REGULAR_ACCOUNT,
      TEST_ACCOUNT,
      SECURE_ACCOUNT,
      S3_SERVICE,
      TRUSTED_CONTACTS,
    } = database.SERVICES;

    let services;
    let migrated = false;
    if (!database.VERSION) {
      dbVersion = '0.7.0';
    } else if (database.VERSION === '0.8') {
      dbVersion = '0.8.0';
    } else if (database.VERSION === '0.9') {
      dbVersion = '0.9.0';
    } else if (database.VERSION === '1.0') {
      dbVersion = '1.0.0';
    }
    if (semver.gt(appVersion, dbVersion)) {
      if (dbVersion === '0.7.0' && semver.gte(appVersion, '0.9.0')) {
        // version 0.7.0 support
        console.log('Migration running for 0.7.0');
        services = {
          REGULAR_ACCOUNT: RegularAccount.fromJSON(REGULAR_ACCOUNT),
          TEST_ACCOUNT: TestAccount.fromJSON(TEST_ACCOUNT),
          SECURE_ACCOUNT: SecureAccount.fromJSON(SECURE_ACCOUNT),
          S3_SERVICE: S3Service.fromJSON(S3_SERVICE),
          TRUSTED_CONTACTS: new TrustedContactsService(),
        };
        // hydrating new/missing async storage variables
        yield call(
          AsyncStorage.setItem,
          'walletID',
          services.S3_SERVICE.sss.walletId,
        );

        migrated = true;
      } else {
        // default enrichment (when database versions are different but migration is not available)
        services = {
          REGULAR_ACCOUNT: RegularAccount.fromJSON(REGULAR_ACCOUNT),
          TEST_ACCOUNT: TestAccount.fromJSON(TEST_ACCOUNT),
          SECURE_ACCOUNT: SecureAccount.fromJSON(SECURE_ACCOUNT),
          S3_SERVICE: S3Service.fromJSON(S3_SERVICE),
          TRUSTED_CONTACTS: TRUSTED_CONTACTS
            ? TrustedContactsService.fromJSON(TRUSTED_CONTACTS)
            : new TrustedContactsService(),
        };
      }

      if (semver.eq(appVersion, '1.1.0')) {
        // version 1.0 and lower support

        // re-derive primary extended keys (standardization)
        const secureAccount: SecureAccount = services.SECURE_ACCOUNT;
        if (secureAccount.secureHDWallet.rederivePrimaryXKeys()) {
          console.log('Standardized Primary XKeys for secure a/c');
          migrated = true;
        }
      }
    } else {
      services = {
        REGULAR_ACCOUNT: RegularAccount.fromJSON(REGULAR_ACCOUNT),
        TEST_ACCOUNT: TestAccount.fromJSON(TEST_ACCOUNT),
        SECURE_ACCOUNT: SecureAccount.fromJSON(SECURE_ACCOUNT),
        S3_SERVICE: S3Service.fromJSON(S3_SERVICE),
        TRUSTED_CONTACTS: TRUSTED_CONTACTS
          ? TrustedContactsService.fromJSON(TRUSTED_CONTACTS)
          : new TrustedContactsService(),
      };
    }
    yield put(servicesEnriched(services));
    if (migrated) {
      database.VERSION = DeviceInfo.getVersion();
      yield call(insertDBWorker, { payload: database });
    }
  } catch (err) {
    console.log(err);
  }
}

export const servicesEnricherWatcher = createWatcher(
  servicesEnricherWorker,
  ENRICH_SERVICES,
);
