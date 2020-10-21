import config from '../../HexaConfig';
import { ErrMap } from '../../utilities/ErrMap';
import {
  BuddyStaticNonPMDD,
  EncDynamicNonPMDD,
  MetaShare,
  SocialStaticNonPMDD,
  EncryptedImage,
  WalletImage,
} from '../../utilities/Interface';
import SSS from '../../utilities/sss/SSS';

export default class S3Service {
  public static fromJSON = (json: string) => {
    const { sss } = JSON.parse(json);
    const {
      mnemonic,
      encryptedSecrets,
      shareIDs,
      metaShares,
      healthCheckInitialized,
      walletId,
      healthCheckStatus,
      pdfHealth,
    }: {
      mnemonic: string;
      encryptedSecrets: string[];
      shareIDs: string[];
      metaShares: MetaShare[];
      healthCheckInitialized: boolean;
      walletId: string;
      healthCheckStatus: {};
      pdfHealth: {};
    } = sss;

    return new S3Service(mnemonic, {
      encryptedSecrets,
      shareIDs,
      metaShares,
      healthCheckInitialized,
      walletId,
      healthCheckStatus,
      pdfHealth,
    });
  };

  public static recoverFromSecrets = (
    encryptedSecrets: string[],
    answer: string,
  ):
    | {
        status: number;
        data: {
          mnemonic: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const { decryptedSecrets } = SSS.decryptSecrets(encryptedSecrets, answer);
      const { mnemonic } = SSS.recoverFromSecrets(decryptedSecrets);
      return { status: config.STATUS.SUCCESS, data: { mnemonic } };
    } catch (err) {
      return { status: 501, err: err.message, message: ErrMap[501] };
    }
  };

  public static downloadShare = async (
    encryptedKey: string,
    otp: string,
  ): Promise<
    | {
        status: number;
        data:
          | {
              metaShare: MetaShare;
              encryptedDynamicNonPMDD: EncDynamicNonPMDD;
            }
          | {
              metaShare: MetaShare;
              encryptedDynamicNonPMDD?: undefined;
            };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await SSS.downloadShare(encryptedKey, otp),
      };
    } catch (err) {
      return { status: 502, err: err.message, message: ErrMap[502] };
    }
  };

  public static downloadDynamicNonPMDD = async (
    walletId: string,
  ): Promise<
    | {
        status: number;
        data: {
          encryptedDynamicNonPMDD: EncDynamicNonPMDD;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await SSS.downloadDynamicNonPMDD(walletId),
      };
    } catch (err) {
      return { status: 516, err: err.message, message: ErrMap[516] };
    }
  };

  public static generateEncryptedMetaShare = (
    metaShare: MetaShare,
    key?: string,
  ):
    | {
        status: number;
        data: {
          encryptedMetaShare: string;
          key: string;
          messageId: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: SSS.encryptMetaShare(metaShare, key),
      };
    } catch (err) {
      return { status: 522, err: err.message, message: ErrMap[522] };
    }
  };

  public static generateRequestCreds = (): {
    key: string;
  } => SSS.generateRequestCreds();

  public static uploadRequestedShare = async (
    encryptedKey: string,
    otp?: string,
    metaShare?: MetaShare,
    encryptedDynamicNonPMDD?: EncDynamicNonPMDD,
  ): Promise<
    | {
        status: number;
        data: {
          success: boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await SSS.uploadRequestedShare(
          encryptedKey,
          otp,
          metaShare,
          encryptedDynamicNonPMDD,
        ),
      };
    } catch (err) {
      return { status: 503, err: err.message, message: ErrMap[503] };
    }
  };

  public static downloadAndValidateShare = async (
    encryptedKey: string,
    otp?: string,
    existingShares: MetaShare[] = [],
    walletId?: string,
  ): Promise<
    | {
        status: number;
        data: {
          metaShare: MetaShare;
          encryptedDynamicNonPMDD: EncDynamicNonPMDD;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await SSS.downloadAndValidateShare(
          encryptedKey,
          otp,
          existingShares,
          walletId,
        ),
      };
    } catch (err) {
      return { status: 503, err: err.message, message: ErrMap[503] };
    }
  };

  public static decryptViaOTP = (
    otpEncryptedData: string,
    otp: string,
  ):
    | {
        status: number;
        data: {
          decryptedData: any;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: SSS.decryptViaOTP(otpEncryptedData, otp),
      };
    } catch (err) {
      return { status: 504, err: err.message, message: ErrMap[504] };
    }
  };

  public static recoverMetaShareFromQR = (
    qrData: string[],
  ):
    | {
        status: number;
        data: {
          metaShare: MetaShare;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: SSS.recoverMetaShareFromQR(qrData),
      };
    } catch (err) {
      return { status: 505, err: err.message, message: ErrMap[505] };
    }
  };

  public static updateHealth = async (
    metaShares: MetaShare[],
  ): Promise<
    | {
        status: number;
        data: {
          updationInfo: Array<{
            walletId: string;
            shareId: string;
            updated: boolean;
            updatedAt?: number;
            encryptedDynamicNonPMDD?: EncDynamicNonPMDD;
            err?: string;
          }>;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await SSS.updateHealth(metaShares),
      };
    } catch (err) {
      return { status: 506, err: err.message, message: ErrMap[506] };
    }
  };

  public static getShareId = (
    encryptedShare: string,
  ):
    | {
        status: number;
        data: {
          shareId: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: { shareId: SSS.getShareId(encryptedShare) },
      };
    } catch (err) {
      return { status: 507, err: err.message, message: ErrMap[507] };
    }
  };

  public static generateKey = ():
    | {
        status: number;
        data: {
          key: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: { key: SSS.generateKey(SSS.cipherSpec.keyLength) },
      };
    } catch (err) {
      return { status: 508, err: err.message, message: ErrMap[508] };
    }
  };

  public static encryptViaOTP = (
    key: string,
  ):
    | {
        status: number;
        data: {
          otpEncryptedData: string;
          otp: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: SSS.encryptViaOTP(key),
      };
    } catch (err) {
      return { status: 509, err: err.message, message: ErrMap[509] };
    }
  };

  public sss: SSS;
  constructor(
    mnemonic: string,
    stateVars?: {
      encryptedSecrets: string[];
      shareIDs: string[];
      metaShares: MetaShare[];
      healthCheckInitialized: boolean;
      walletId: string;
      healthCheckStatus: {};
      pdfHealth: {};
    },
  ) {
    this.sss = new SSS(mnemonic, stateVars);
  }

  public generateShares = (
    answer: string,
  ):
    | {
        status: number;
        data: {
          encryptedSecrets: string[];
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const { shares } = this.sss.generateShares();
      const { encryptedSecrets } = this.sss.encryptSecrets(shares, answer);
      return { status: config.STATUS.SUCCESS, data: { encryptedSecrets } };
    } catch (err) {
      return { status: 510, err: err.message, message: ErrMap[510] };
    }
  };

  public encryptStaticNonPMDD = (
    staticNonPMDD: SocialStaticNonPMDD | BuddyStaticNonPMDD,
  ):
    | {
        status: number;
        data: {
          encryptedStaticNonPMDD: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const { encryptedStaticNonPMDD } = this.sss.encryptStaticNonPMDD(
        staticNonPMDD,
      );
      return {
        status: config.STATUS.SUCCESS,
        data: { encryptedStaticNonPMDD },
      };
    } catch (err) {
      return { status: 511, err: err.message, message: ErrMap[511] };
    }
  };

  public getWalletId = ():
    | {
        status: number;
        data: {
          walletId: string;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: { walletId: this.sss.walletId },
      };
    } catch (err) {
      return { status: 512, err: err.message, message: ErrMap[512] };
    }
  };

  public initializeHealthcheck = async (): Promise<
    | {
        status: number;
        data: {
          success: boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.initializeHealthcheck(),
      };
    } catch (err) {
      return { status: 513, err: err.message, message: ErrMap[513] };
    }
  };

  public checkHealth = async (): Promise<
    | {
        status: number;
        data: {
          shareGuardianMapping: {
            [index: number]: {
              shareId: string;
              updatedAt: number;
              guardian: string;
            };
          };
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.checkHealth(),
      };
    } catch (err) {
      return { status: 514, err: err.message, message: ErrMap[514] };
    }
  };

  public resetSharesHealth = async (
    shareIndex: number,
  ): Promise<
    | {
        status: number;
        data: {
          resetted: Boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: any;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.resetSharesHealth(shareIndex),
      };
    } catch (err) {
      return { status: 514, err: err.message, message: ErrMap[514] };
    }
  };

  public updateDynamicNonPMDD = async (
    dynamicNonPMDD: any,
  ): Promise<
    | {
        status: number;
        data: {
          updated: boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.updateDynamicNonPMDD(dynamicNonPMDD),
      };
    } catch (err) {
      return { status: 515, err: err.message, message: ErrMap[515] };
    }
  };

  public decryptDynamicNonPMDD = (
    encryptedDynamicNonPMDD: EncDynamicNonPMDD,
  ):
    | {
        status: number;
        data: {
          decryptedDynamicNonPMDD: MetaShare[];
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: this.sss.decryptDynamicNonPMDD(encryptedDynamicNonPMDD),
      };
    } catch (err) {
      return { status: 518, err: err.message, message: ErrMap[518] };
    }
  };

  public restoreDynamicNonPMDD = (
    dynamicNonPMDDs: EncDynamicNonPMDD[],
  ):
    | {
        status: number;
        data: {
          latestDynamicNonPMDD: MetaShare[];
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const { decryptedDynamicNonPMDD } = this.sss.restoreDynamicNonPMDD(
        dynamicNonPMDDs,
      );
      return {
        status: config.STATUS.SUCCESS,
        data: {
          latestDynamicNonPMDD: decryptedDynamicNonPMDD,
        },
      };
    } catch (err) {
      return { status: 517, err: err.message, message: ErrMap[517] };
    }
  };

  public decryptStaticNonPMDD = (
    encryptedNonPMDD: string,
  ):
    | {
        status: number;
        data: {
          decryptedStaticNonPMDD;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: this.sss.decryptStaticNonPMDD(encryptedNonPMDD),
      };
    } catch (err) {
      return { status: 519, err: err.message, message: ErrMap[519] };
    }
  };

  public createMetaShares = (
    secureAssets: {
      secondaryMnemonic: string;
      twoFASecret: string;
      secondaryXpub: string;
      bhXpub: string;
    },
    tag: string,
    version?: string,
  ):
    | {
        status: number;
        data: {
          metaShares: MetaShare[];
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: this.sss.createMetaShares(secureAssets, tag, version),
      };
    } catch (err) {
      return { status: 520, err: err.message, message: ErrMap[520] };
    }
  };

  public reshareMetaShare = (
    index: number,
  ):
    | {
        status: number;
        data: {
          metaShare: MetaShare;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const metaShare = this.sss.reshareMetaShare(index);
      return { status: config.STATUS.SUCCESS, data: { metaShare } };
    } catch (err) {
      return { status: 520, err: err.message, message: ErrMap[520] };
    }
  };

  public restoreMetaShares = (
    metaShares: MetaShare[],
  ):
    | {
        status: number;
        data: {
          restored: Boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      const { restored } = this.sss.restoreMetaShares(metaShares);
      return { status: config.STATUS.SUCCESS, data: { restored } };
    } catch (err) {
      return { status: 520, err: err.message, message: ErrMap[520] };
    }
  };

  public createQR = (
    index: number,
  ):
    | {
        status: number;
        data: { qrData: string[] };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: this.sss.createQR(index),
      };
    } catch (err) {
      return { status: 521, err: err.message, message: ErrMap[521] };
    }
  };

  public prepareShareUploadables = (
    shareIndex: number,
    contactName: string,
    dynamicNonPMDD?: MetaShare[],
  ):
    | {
        status: number;
        data: {
          otp: string;
          encryptedKey: string;
          encryptedMetaShare: string;
          messageId: string;
          encryptedDynamicNonPMDD: EncDynamicNonPMDD;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: string;
        message: string;
        data?: undefined;
      } => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: this.sss.prepareShareUploadables(
          shareIndex,
          contactName,
          dynamicNonPMDD,
        ),
      };
    } catch (err) {
      return { status: 523, err: err.message, message: ErrMap[523] };
    }
  };

  public updateWalletImage = async (
    walletImage: WalletImage,
  ): Promise<
    | {
        status: number;
        data: {
          updated: Boolean;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: any;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.updateWalletImage(walletImage),
      };
    } catch (err) {
      return {
        status: 0o1,
        err: err.message,
        message: 'Failed to update Wallet Image',
      };
    }
  };

  public fetchWalletImage = async (): Promise<
    | {
        status: number;
        data: {
          walletImage: WalletImage;
        };
        err?: undefined;
        message?: undefined;
      }
    | {
        status: number;
        err: any;
        message: string;
        data?: undefined;
      }
  > => {
    try {
      return {
        status: config.STATUS.SUCCESS,
        data: await this.sss.fetchWalletImage(),
      };
    } catch (err) {
      return {
        status: 0o1,
        err: err.message,
        message: 'Failed to fetch Wallet Image',
      };
    }
  };
}
