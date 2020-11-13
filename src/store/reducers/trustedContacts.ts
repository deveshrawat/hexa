import TrustedContactsService from '../../bitcoin/services/TrustedContactsService';
import { SERVICES_ENRICHED } from '../actions/storage';
import { TRUSTED_CONTACTS } from '../../common/constants/serviceTypes';
import {
  TRUSTED_CONTACT_APPROVED,
  EPHEMERAL_CHANNEL_FETCHED,
  EPHEMERAL_CHANNEL_UPDATED,
  TRUSTED_CHANNEL_UPDATED,
  TRUSTED_CHANNEL_FETCHED,
  PAYMENT_DETAILS_FETCHED,
  CLEAR_PAYMENT_DETAILS,
  SWITCH_TC_LOADING,
  APPROVE_TRUSTED_CONTACT,
  UPDATE_ADDRESS_BOOK_LOCALLY,
  UPDATE_TRUSTED_CONTACT_INFO,
} from '../actions/trustedContacts';
import {
  EphemeralDataElements,
} from '../../bitcoin/utilities/Interface';
import { ContactRecipientDescribing } from '../../common/data/models/interfaces/RecipientDescribing';


export type AddressBook = {
  myKeepers: ContactRecipientDescribing[];
  contactsKeptByUser: ContactRecipientDescribing[];
  otherTrustedContacts: ContactRecipientDescribing[];
  trustedContacts: ContactRecipientDescribing[];
};


export type TrustedContactsState = {
  service: TrustedContactsService;

  approvedTrustedContacts: {
    [contactName: string]: {
      approved: Boolean;
    };
  };

  ephemeralChannel: {
    [contactName: string]: { updated: Boolean; data?: EphemeralDataElements };
  };

  trustedChannel: { [contactName: string]: { updated: Boolean; data?: unknown } };

  paymentDetails: {
    address?: string;
    paymentURI?: string;
  };

  loading: {
    updateEphemeralChannel: Boolean;
    updateTrustedChannel: Boolean;
    trustedChannelsSetupSync: Boolean;
    approvingTrustedContact: Boolean;
    walletCheckIn: Boolean;
  };

  addressBook: AddressBook;
  trustedContactsInfo: unknown;

  trustedContactRecipients: ContactRecipientDescribing[];
};


const initialState: TrustedContactsState = {
  service: null,
  approvedTrustedContacts: null,
  ephemeralChannel: null,
  trustedChannel: null,
  paymentDetails: null,
  loading: {
    updateEphemeralChannel: false,
    updateTrustedChannel: false,
    trustedChannelsSetupSync: false,
    approvingTrustedContact: false,
    walletCheckIn: false,
  },
  addressBook: null,
  trustedContactsInfo: null,
  trustedContactRecipients: [],
};


export default (state: TrustedContactsState = initialState, action) => {
  switch (action.type) {
    case SERVICES_ENRICHED:
      return {
        ...state,
        service: action.payload.services[TRUSTED_CONTACTS],
      };

    case APPROVE_TRUSTED_CONTACT:
      return {
        ...state,
        loading: {
          ...state.loading,
          approvingTrustedContact: true,
        },
      };

    case TRUSTED_CONTACT_APPROVED:
      return {
        ...state,
        approvedTrustedContacts: {
          ...state.approvedTrustedContacts,
          [action.payload.contactName]: {
            approved: action.payload.approved,
          },
        },
        loading: {
          ...state.loading,
          approvingTrustedContact: false,
        },
      };

    case EPHEMERAL_CHANNEL_UPDATED:
      return {
        ...state,
        ephemeralChannel: {
          ...state.ephemeralChannel,
          [action.payload.contactName]: {
            updated: action.payload.updated,
            data: action.payload.data,
          },
        },
      };

    case EPHEMERAL_CHANNEL_FETCHED:
      return {
        ...state,
        ephemeralChannel: {
          ...state.ephemeralChannel,
          [action.payload.contactName]: {
            data: action.payload.data,
          },
        },
      };

    case TRUSTED_CHANNEL_UPDATED:
      return {
        ...state,
        trustedChannel: {
          ...state.trustedChannel,
          [action.payload.contactName]: {
            updated: action.payload.updated,
            data: action.payload.data,
          },
        },
      };

    case TRUSTED_CHANNEL_FETCHED:
      return {
        ...state,
        trustedChannel: {
          ...state.trustedChannel,
          [action.payload.contactName]: {
            data: action.payload.data,
          },
        },
      };

    case PAYMENT_DETAILS_FETCHED:
      return {
        ...state,
        paymentDetails: action.payload.paymentDetails,
      };

    case CLEAR_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: null,
      };

    case SWITCH_TC_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.beingLoaded]: !state.loading[
            action.payload.beingLoaded
          ],
        },
      };

    case UPDATE_ADDRESS_BOOK_LOCALLY:
      return {
        ...state,
        addressBook: action.payload,
      };

    case UPDATE_TRUSTED_CONTACT_INFO:
      return {
        ...state,
        trustedContactInfo: action.payload.trustedContactInfo,

        // TODO: Compute `trustedContactRecipients` here
      };
  }

  return state;
};
