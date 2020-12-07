import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AccountShell from '../../../common/data/models/AccountShell';
import Colors from '../../../common/Colors';
import BottomSheetStyles from '../../../common/Styles/BottomSheetStyles';
import HeadingStyles from '../../../common/Styles/HeadingStyles';
import DepositAccountShellListItem from '../../../pages/FastBitcoinsVoucherScan/DepositSubAccountListItem';
import { ListItem } from 'react-native-elements';

export type Props = {
  eligibleAccountShells: AccountShell[];
  onSelect: ((accountShell: AccountShell) => void);
};

const DepositAccountSelectionSheet: React.FC<Props> = ({
  eligibleAccountShells,
  onSelect,
}: Props) => {
  return (
    <FlatList
      style={styles.rootContainer}
      data={eligibleAccountShells}
      keyExtractor={(accountShell: AccountShell) => accountShell.id}
      ListHeaderComponent={() => {
        return (
          <View style={styles.headerSection}>
            <Text style={BottomSheetStyles.confirmationMessageHeading}>
              Select a Deposit Account
            </Text>
          </View>
        );
      }}
      renderItem={({ item: accountShell }: { item: AccountShell }) => {
        return (
          <ListItem onPress={() => onSelect(accountShell) }>
            <DepositAccountShellListItem
              accountShell={accountShell}
              showsDisclosureIndicator={false}
            />
          </ListItem>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  headerSection: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
});

export default DepositAccountSelectionSheet;
