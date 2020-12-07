import React from 'react';
import { StyleSheet, Image } from 'react-native';
import AccountShell from '../../common/data/models/AccountShell';
import Colors from '../../common/Colors';
import ListStyles from '../../common/Styles/ListStyles';
import ImageStyles from '../../common/Styles/ImageStyles';
import usePrimarySubAccountForShell from '../../utils/hooks/account-utils/UsePrimarySubAccountForShell';
import { ListItem } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import LabeledBalanceDisplay from '../../components/LabeledBalanceDisplay';
import useTotalBalanceForAccountShell from '../../utils/hooks/state-selectors/accounts/UseTotalBalanceForAccountShell';


export type Props = {
  accountShell: AccountShell;
  showsDisclosureIndicator: boolean;
};

const DepositAccountShellListItem: React.FC<Props> = ({
  accountShell,
  showsDisclosureIndicator,
}: Props) => {
  const primarySubAccount = usePrimarySubAccountForShell(accountShell);
  const totalBalance = useTotalBalanceForAccountShell(accountShell);

  return (
    <>
      <Image
        source={primarySubAccount.avatarImageSource}
        style={styles.avatarImage}
        resizeMode="contain"
      />

      <ListItem.Content style={styles.titleSection}>
        <ListItem.Subtitle
          style={ListStyles.listItemSubtitle}
          numberOfLines={1}
        >
          Receiving to:
        </ListItem.Subtitle>

        <ListItem.Title
          style={ListStyles.listItemTitle}
          numberOfLines={1}
        >
          {primarySubAccount.customDisplayName || primarySubAccount.defaultTitle}
        </ListItem.Title>

        <LabeledBalanceDisplay
          balance={totalBalance}
          bitcoinUnit={accountShell.unit}
          textColor={Colors.primaryText}
        />

      </ListItem.Content>

      {showsDisclosureIndicator && (
          <Entypo
            name={'dots-three-horizontal'}
            color={Colors.buttonText}
            size={RFValue(22)}
          />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    ...ImageStyles.thumbnailImageMedium,
    marginRight: 14,
    borderRadius: 9999,
  },

  titleSection: {
    flex: 1,
  },
});

export default DepositAccountShellListItem;
