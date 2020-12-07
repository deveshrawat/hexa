import AccountShell from '../../common/data/models/AccountShell';
import {
  ACCOUNT_SYNC_FAIL,
  ACCOUNT_SYNC_SUCCESS,
  ACCOUNT_SYNC_CLEAR,
  GET_QUOTE_FAIL,
  GET_QUOTE_SUCCESS,
  EXECUTE_ORDER_FAIL,
  EXECUTE_ORDER_SUCCESS,
  GET_BALANCES_FAIL,
  GET_BALANCES_SUCCESS,
  CLEAR_QUOTE_DETAILS,
  CLEAR_ORDER_DETAILS,
  STORE_FBTC_ACC_DATA,
  FBTC_VOUCHER,
  CLEAR_FBTC_VOUCHER,
  FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED,
} from '../actions/fbtc';

type AccountShellID = string;

export type FBTCQuoteDetails = {
  amount: number;
  bitcoinAmount: number;
  exchangeRate: number;
  currencyCode: string;
};

export type FBTCVoucher = {
  code: string;
  quoteDetails: FBTCQuoteDetails | null;
}

export type FBTCDepositAccountHistory = {
  vouchers: FBTCVoucher[];
}

export type FBTCAccountData = {
  userKey: string | null;
  registrationTimestamp: number;

  // TODO: Figure out what these mean and if/why they're needed.
  redeemVouchers: boolean;
  exchangeBalances: boolean;
  sellBitcoins: boolean;
}

export type FastBitcoinsState = {
  accountSyncRequest: boolean;
  accountSyncDetails: null;
  getQuoteRequest: boolean;
  getQuoteDetails: unknown;
  executeOrderRequest: boolean;
  executeOrderDetails: unknown;
  getBalancesRequest: boolean;
  getBalancesDetails: unknown;
  accountSyncFail: boolean;
  accountSyncFailMessage: unknown;
  getQuoteFail: boolean;
  getQuoteFailMessage: unknown;
  executeOrderFail: boolean;
  executeOrderFailMessage: unknown;
  fbtcAccountData: FBTCAccountData | null;
  FBTCVoucher: unknown;
  currentDepositAccountShell: AccountShell | null;
  depositAccountLedger: Record<AccountShellID, FBTCDepositAccountHistory>;
};

const INITIAL_STATE: FastBitcoinsState = {
  accountSyncRequest: false,
  accountSyncDetails: null,
  getQuoteRequest: false,
  getQuoteDetails: null,
  executeOrderRequest: false,
  executeOrderDetails: null,
  getBalancesRequest: false,
  getBalancesDetails: null,
  accountSyncFail: false,
  accountSyncFailMessage: null,
  getQuoteFail: false,
  getQuoteFailMessage: null,
  executeOrderFail: false,
  executeOrderFailMessage: null,
  fbtcAccountData: null,
  FBTCVoucher: null,
  currentDepositAccountShell: null,
};

const reducer = (state: FastBitcoinsState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_SYNC_FAIL:
      console.log(
        'action.payload.accountSyncFailMessage',
        action.payload.accountSyncFail,
        action.payload.accountSyncFailMessage,
      );
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncFail: action.payload.data.accountSyncFail,
        accountSyncFailMessage: action.payload.data.accountSyncFailMessage,
      };
    case ACCOUNT_SYNC_SUCCESS:
      console.log(
        'payload.accountSyncDetails',
        action.payload.accountSyncDetails,
      );
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncDetails: action.payload.accountSyncDetails,
      };
    case ACCOUNT_SYNC_CLEAR:
      return {
        ...state,
        accountSyncRequest: false,
        accountSyncDetails: null,
      };
    case GET_QUOTE_FAIL:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: null,
        getQuoteFail: action.payload.data.getQuoteFail,
        getQuoteFailMessage: action.payload.data.getQuoteFailMessage,
      };
    case GET_QUOTE_SUCCESS:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: action.payload.getQuoteDetails,
      };
    case CLEAR_QUOTE_DETAILS:
      return {
        ...state,
        getQuoteRequest: false,
        getQuoteDetails: null,
      };
    case EXECUTE_ORDER_FAIL:
      return {
        ...state,
        executeOrderRequest: false,
        getQuoteDetails: null,
        executeOrderDetails: null,
        executeOrderFail: action.payload.data.executeOrderFail,
        executeOrderFailMessage: action.payload.data.executeOrderFailMessage,
      };
    case EXECUTE_ORDER_SUCCESS:
      return {
        ...state,
        executeOrderRequest: false,
        executeOrderDetails: action.payload.executeOrderDetails,
      };
    case CLEAR_ORDER_DETAILS:
      return {
        ...state,
        executeOrderRequest: false,
        executeOrderDetails: null,
      };
    case GET_BALANCES_FAIL:
      return {
        ...state,
        getBalancesRequest: false,
      };

    case GET_BALANCES_SUCCESS:
      return {
        ...state,
        getBalancesRequest: false,
        getBalancesDetails: action.payload.getBalancesDetails,
      };

    case STORE_FBTC_ACC_DATA:
      return {
        ...state,
        fbtcAccountData: action.payload.fbtcAccountData,
      };

    case FBTC_VOUCHER:
      return {
        ...state,
        FBTCVoucher: action.payload.FBTCVoucher,
      };

    case CLEAR_FBTC_VOUCHER:
      return {
        ...state,
        FBTCVoucher: null,
      };


    case FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED:
      const accountShell = action.payload;

      state.depositAccountLedger[accountShell.id] = {
        voucherCodes: [],
      };

      return {
        ...state,
        currentDepositAccountShell: action.payload,
      }

    default:
      return state;
  }
};
export default reducer;
