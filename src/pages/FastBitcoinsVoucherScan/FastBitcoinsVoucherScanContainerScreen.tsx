import { TouchableOpacity, useBottomSheetModal } from '@gorhom/bottom-sheet';
import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
import AppConfig from 'react-native-config';
import HeadingStyles from '../../common/Styles/HeadingStyles';
import FormStyles from '../../common/Styles/FormStyles';
import { NavigationScreenComponent } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { NavigationOptions } from '../../navigation/options/DefaultStackScreenNavigationOptions';
import useAccountShellsInUTXOCompatibilityGroup from '../../utils/hooks/state-selectors/accounts/UseAccountShellsInUTXOCompatibilityGroup';
import UTXOCompatibilityGroup from '../../common/data/enums/UTXOCompatibilityGroup';
import { KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view';
import CoveredQRCodeScanner from '../../components/qr-code-scanning/CoveredQRCodeScanner';
import BottomInfoBox from '../../components/BottomInfoBox';
import RecipientAddressTextInputSection from '../../components/send/RecipientAddressTextInputSection';
import RecipientSelectionStrip from '../../components/send/RecipientSelectionStrip';
import { BarCodeReadEvent } from 'react-native-camera';
import { Input, ListItem } from 'react-native-elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import AccountShell from '../../common/data/models/AccountShell';
import { RFValue } from 'react-native-responsive-fontsize';
import useActiveAccountShells from '../../utils/hooks/state-selectors/accounts/UseActiveAccountShells';
import SubAccountKind from '../../common/data/enums/SubAccountKind';
import DepositAccountShellListItem from './DepositSubAccountListItem';
import defaultBottomSheetConfigs from '../../common/configs/BottomSheetConfigs';
import DepositAccountSelectionSheet from '../../components/bottom-sheets/fast-bitcoins-voucher-scan/DepositAccountSelectionSheet';
import useFastBitcoinsDepositAccountShell from '../../utils/hooks/state-selectors/fast-bitcoins/UseFastBitcoinsDepositAccountShell';
import useFastBitcoinsState from '../../utils/hooks/state-selectors/fast-bitcoins/UseFastBitcoinsState';
import { createNewFastBitcoinsSubAccount, storeFbtcData } from '../../store/actions/fbtc';
import VoucherCodeInputSection from './VoucherCodeInputSection';
import FastBitcoinsRegistrationBottomSheet from '../../components/bottom-sheets/fast-bitcoins-voucher-scan/FastBitcoinsRegistrationBottomSheet';
import { FBTCAccountData } from '../../store/reducers/fbtc';

export type Props = {
  navigation: any;
};

export enum SectionKind {
  SCAN_VOUCHER = 'SCAN_VOUCHER',
  ENTER_VOUCHER_CODE = 'ENTER_VOUCHER_CODE',
  INFO_MESSAGE = 'INFO_MESSAGE',
  DEPOSIT_ACCOUNT = 'DEPOSIT_ACCOUNT',
}

const sectionListItemKeyExtractor = (index) => String(index);


const FastBitcoinsVoucherScanContainerScreen: React.FC<Props> = ({
  navigation,
}: Props) => {
  const dispatch = useDispatch();
  const { present: presentBottomSheet, dismiss: dismissBottomSheet } = useBottomSheetModal();

  const accountShells = useActiveAccountShells();
  const fastBitcoinsState = useFastBitcoinsState();

  const [selectedDepositAccountShell, setSelectedDepositAccountShell] = useState(
    useFastBitcoinsDepositAccountShell()
  );

  const eligibleDepositAccountShells = useMemo(() => {
    return accountShells
      .filter(shell => [
        SubAccountKind.REGULAR_ACCOUNT,
        SubAccountKind.SECURE_ACCOUNT,
      ].includes(shell.primarySubAccount.kind))
  }, [accountShells]);

  const fbtcAccountData = useMemo(() => {
    return fastBitcoinsState.fbtcAccountData;
  }, [fastBitcoinsState]);

  const isUserRegisteredWithFBTC = useMemo(() => {
    return fbtcAccountData?.userKey != null;
  }, [fbtcAccountData]);


  const sections = useMemo(() => {
    return [
      {
        kind: SectionKind.SCAN_VOUCHER,
        data: [null],
        renderItem: () => {
          return (
            <View style={styles.viewSectionContainer}>
              <CoveredQRCodeScanner
                onCodeScanned={handleVoucherScan}
                containerStyle={styles.qrScannerContainer}
              />
            </View>
          );
        },
      },
      {
        kind: SectionKind.ENTER_VOUCHER_CODE,
        data: [null],
        renderItem: () => {
          return (
            <View style={styles.viewSectionContainer}>
              <VoucherCodeInputSection
                containerStyle={{ ...styles.viewSectionContentContainer, margin: 0 }}
                placeholder="Enter Voucher Code"
                onCodeEntered={handleVoucherCodeSubmit}
              />
            </View>
          );
        },
      },
      ...(isUserRegisteredWithFBTC ? [
        {
          kind: SectionKind.INFO_MESSAGE,
          data: [null],
          renderItem: () => {
            return (
              <View style={styles.viewSectionContainer}>
                <BottomInfoBox
                  containerStyle={styles.infoBoxContainer}
                  title="Already registered with FastBitcoins?"
                  infoText={"Go to your FastBitcoins.com account on this device and choose Hexa from \"Linked Wallets\""}
                />
              </View>
            );
          }
        },
      ] : []),
      {
        kind: SectionKind.DEPOSIT_ACCOUNT,
        data: [selectedDepositAccountShell],
        renderItem: () => {
          const accountShell = selectedDepositAccountShell || eligibleDepositAccountShells[0];

          return (
            <View style={styles.viewSectionContainer}>
              <ListItem
                disabled={isUserRegisteredWithFBTC}
                onPress={showDepositAccountSelectionSheet}
                containerStyle={{ paddingHorizontal: 24 }}
              >
                <DepositAccountShellListItem
                  accountShell={accountShell}
                  showsDisclosureIndicator={isUserRegisteredWithFBTC == false}
                />
              </ListItem>
            </View>
          );
        },
      },
    ];
  }, [eligibleDepositAccountShells, selectedDepositAccountShell, isUserRegisteredWithFBTC]);


  const showDepositAccountSelectionSheet = useCallback(() => {
    presentBottomSheet(
      <DepositAccountSelectionSheet
        eligibleDepositAccountShells={eligibleDepositAccountShells}
        onSelect={handleDepositAccountShellSelection}
      />,
      {
        ...defaultBottomSheetConfigs,
        snapPoints: [0, '66%'],
      },
    );
  }, [presentBottomSheet, dismissBottomSheet]);

  const showFastBitcoinsRegistrationBottomSheet = useCallback(() => {
    presentBottomSheet(
      <FastBitcoinsRegistrationBottomSheet
        link={AppConfig.FBTC_REGISTRATION_URL}
        openLinkVerification={() => {
          Linking.openURL(AppConfig.FBTC_REGISTRATION_URL);
          dismissBottomSheet();
          navigation.goBack();
        }}
      />,
      {
        ...defaultBottomSheetConfigs,
        snapPoints: [0, '45%'],
      },
    );
  }, [presentBottomSheet, dismissBottomSheet]);


  function hasRedeemedVoucherCode(voucherCode: string) {
    return Object
    .values(fastBitcoinsState.depositAccountLedger)
    .some(depositAccountHistory => {
      return depositAccountHistory
      .vouchers
      .some(voucher => voucher.code == voucherCode);
    });
  }


  function handleDepositAccountShellSelection(accountShell: AccountShell) {
    dismissBottomSheet();
    setSelectedDepositAccountShell(accountShell);
  }


  function handleVoucherScan({ data: barcodeDataString }: BarCodeReadEvent) {
    if (barcodeDataString.includes('fastbitcoins.com')) {
      const voucherCode = barcodeDataString.slice(barcodeDataString.lastIndexOf('/') + 1);

      handleVoucherCodeSubmit(voucherCode);
    }
  }

  function handleVoucherCodeSubmit(voucherCode: string) {
    // TODO:
    // - Create a sub-account if none exists
    // - Implement the functionality here: https://github.com/bithyve/hexa/blob/c5595b22733ca282e6c7893c3cf2f226e140a9e4/src/pages/FastBitcoin/VoucherScanner.tsx#L357
    if (voucherCode.length != 12) { return }

    if (isUserRegisteredWithFBTC) {
      processVoucherCode(voucherCode);
    } else {
      showFastBitcoinsRegistrationBottomSheet();
    }
  }

  function syncFastBitcoinsAccountData() {
      let data = { userKey }
      // setShowLoader(true);
      dispatch(accountSync(data));
  }

  function processVoucherCode(voucherCode: string) {
    if (fbtcAccountData == null) {
      initializeFBTCAccountData();
      syncFastBitcoinsAccountData();
    }

    saveVoucherCodeToAccount(voucherCode);
  }


  function saveVoucherCodeToAccount(voucherCode: string) {
    if (hasRedeemedVoucherCode(voucherCode)) {
      // error bottom sheet
    } else {
      dispatch(redeemVoucher({
        code: voucherCode,
        depositAccountShell: selectedDepositAccountShell,
      }))
      dispatch(storeFbtcData(fBTCAccount));
    }
  }

  function initializeFBTCAccountData() {
    const fbtcAccountData: FBTCAccountData = {
      userKey,
      registrationTimestamp: Date.now(),
      redeemVouchers: false,
      exchangeBalances: false,
      sellBitcoins: false,
    };

    dispatch(storeFbtcData(fbtcAccountData));
    dispatch(createNewFastBitcoinsSubAccount(selectedDepositAccountShell));
  }


  function renderSectionHeader(sectionKind: SectionKind): ReactElement | null {
    switch (sectionKind) {
      case SectionKind.DEPOSIT_ACCOUNT:
        return <Text style={styles.listSectionHeading}>
          {isUserRegisteredWithFBTC ? 'Connected Deposit Account' : 'Choose a Deposit Account'}
        </Text>;
      default:
        return null;
    }
  }

  return (
    <View style={styles.rootContainer}>
      <KeyboardAwareSectionList
        extraData={[
          eligibleDepositAccountShells,
        ]}
        showsVerticalScrollIndicator={false}
        sections={sections}
        renderSectionHeader={({ section }) => renderSectionHeader(section.kind)}
        keyExtractor={sectionListItemKeyExtractor}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const qrScannerHeight = heightPercentageToDP(35);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  viewSectionContainer: {
    marginBottom: 16,
  },

  viewSectionContentContainer: {
    paddingHorizontal: 22,
  },

  listSectionHeading: {
    ...HeadingStyles.listSectionHeading,
    marginBottom: 9,
    paddingHorizontal: 22,
    fontSize: RFValue(13),
  },

  qrScannerContainer: {
    width: '100%',
    maxWidth: qrScannerHeight * (1.31),
    height: qrScannerHeight,
    marginBottom: 9,
  },

  // Undo the info box component's coupling to margin
  // infoBoxContainer: {
  //   marginTop: 0,
  //   marginRight: 0,
  //   marginBottom: 0,
  //   marginLeft: 0,
  // },
});

export default FastBitcoinsVoucherScanContainerScreen;
