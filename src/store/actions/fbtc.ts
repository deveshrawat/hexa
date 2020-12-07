import { Action } from "redux";
import AccountShell from "../../common/data/models/AccountShell";
import { FBTCAccountData } from "../reducers/fbtc";

export const ACCOUNT_SYNC = 'ACCOUNT_SYNC';
export const ACCOUNT_SYNC_FAIL = 'ACCOUNT_SYNC_FAIL';
export const ACCOUNT_SYNC_SUCCESS = 'ACCOUNT_SYNC_SUCCESS';
export const ACCOUNT_SYNC_CLEAR = 'ACCOUNT_SYNC_CLEAR';

export const GET_QUOTE = 'GET_QUOTE';
export const GET_QUOTE_FAIL = 'GET_QUOTE_FAIL';
export const GET_QUOTE_SUCCESS = 'GET_QUOTE_SUCCESS';
export const CLEAR_QUOTE_DETAILS = 'CLEAR_QUOTE_DETAILS';

export const EXECUTE_ORDER = 'EXECUTE_ORDER';
export const EXECUTE_ORDER_FAIL = 'EXECUTE_ORDER_FAIL';
export const EXECUTE_ORDER_SUCCESS = 'EXECUTE_ORDER_SUCCESS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export const GET_BALANCES = 'GET_BALANCES';
export const GET_BALANCES_FAIL = 'GET_BALANCES_FAIL';
export const GET_BALANCES_SUCCESS = 'GET_BALANCES_SUCCESS';

export const STORE_FBTC_ACC_DATA = 'STORE_FBTC_ACC_DATA';
export const FBTC_VOUCHER = 'FBTC_VOUCHER';
export const CLEAR_FBTC_VOUCHER = 'CLEAR_FBTC_VOUCHER';

export const CREATE_NEW_FAST_BITCOINS_SUB_ACCOUNT = 'CREATE_NEW_FAST_BITCOINS_SUB_ACCOUNT';

export const FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED = 'FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED';


export const accountSync = (data) => {
  return {
    type: ACCOUNT_SYNC,
    payload: { data },
  };
};

export const ClearAccountSyncData = () => {
  return { type: ACCOUNT_SYNC_CLEAR };
};

export const accountSyncSuccess = data => {
  return {
    type: ACCOUNT_SYNC_SUCCESS,
    payload: { accountSyncDetails: data },
  };
};

export const accountSyncFail = (data) => {
  console.log("Account sync fail", data);
  return {type: ACCOUNT_SYNC_FAIL,
    payload: { data }
  };
};

export function getQuote(data) {
  console.log('data getQuote', data);
  return {
    type: GET_QUOTE,
    payload: { data },
  };
}

export function getQuoteSuccess(data) {
  return {
    type: GET_QUOTE_SUCCESS,
    payload: { getQuoteDetails: data },
  };
};

export function ClearQuoteDetails() {
  return {
    type: CLEAR_QUOTE_DETAILS,
    payload: { getQuoteDetails: null },
  };
};

export const getQuoteFail = (data) => {
  return {
    type: GET_QUOTE_FAIL,
    payload: {
      getQuoteDetails: null,
      data
    },
  };
};

export const executeOrder = (data) => {
  console.log('data getQuote', data);
  return {
    type: EXECUTE_ORDER,
    payload: { data },
  };
};

export const ClearOrderDetails = () => {
  return {
    type: CLEAR_ORDER_DETAILS,
  };
};

export const executeOrderSuccess = (data) => {
  return {
    type: EXECUTE_ORDER_SUCCESS,
    payload: {
      executeOrderDetails: data,
    },
  };
};

export const executeOrderFail = (data) => {
  return {
    type: EXECUTE_ORDER_FAIL,
    payload: {
      executeOrderDetails: null,
      data
    },
  };
};

export const getBalancesSuccess = (data) => {
  return {
    type: GET_BALANCES_SUCCESS,
    payload: {
      getBalancesDetails: data,
    },
  };
};

export const getBalancesFail = () => {
  return {
    type: GET_BALANCES_FAIL,
    payload: {
      getBalancesDetails: null,
    },
  };
};

export const storeFbtcData = (fbtcAccountData: FBTCAccountData) => {
  return {
    type: STORE_FBTC_ACC_DATA,
    payload: {
      fbtcAccountData,
    },
  };
};

export const storeFbtcVoucher = (voucher) => {
  //console.log('INSIDE Action storeFbtcVoucher',voucher)
  return {
    type: FBTC_VOUCHER,
    payload: {
      FBTCVoucher: voucher
    },
  };
};

export const clearFbtcVoucher = () => {
  return {
    type: CLEAR_FBTC_VOUCHER,
    payload: {
      FBTCVoucher: null
    },
  };
};

export interface CreateNewFastBitcoinsSubAccountAction extends Action {
  type: typeof CREATE_NEW_FAST_BITCOINS_SUB_ACCOUNT;

  /**
  * The account shell to use as sub-account's "deposit account".
  */
  payload: AccountShell;
}

export const createNewFastBitcoinsSubAccount = (
  payload: AccountShell,
): CreateNewFastBitcoinsSubAccountAction => {
  return { type: CREATE_NEW_FAST_BITCOINS_SUB_ACCOUNT, payload };
};


export interface FastBitcoinsSubAccountCreationCompletionAction extends Action {
  type: typeof FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED;

  /**
   * The "deposit account" shell in which the new FBTC sub-account is
   * stored as a secondary sub-account.
   */
  payload: AccountShell;
}

export const fastBitcoinsSubAccountCreationCompleted = (accountShell: AccountShell): FastBitcoinsSubAccountCreationCompletionAction => {
  return {
    type: FAST_BITCOINS_SUB_ACCOUNT_CREATION_COMPLETED,
    payload: accountShell,
  };
};
