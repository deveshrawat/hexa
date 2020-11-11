import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import RadioButton from '../../RadioButton';
import TransactionListItemContent from '../../account-details/TransactionListItemContent';
import TransactionDescribing from '../../../common/data/models/Transactions/Interfaces';

export type Props = {
  selectableTransactions: TransactionDescribing[];
  selectedTransactionIDs: Set<string>;
  onTransactionSelected: (string) => void;
};

const listItemKeyExtractor = (item: TransactionDescribing) => item.txID;

const TransactionsList: React.FC<Props> = ({
  selectableTransactions,
  selectedTransactionIDs,
  onTransactionSelected,
}: Props) => {

  const isChecked = useCallback((transaction: TransactionDescribing) => {
    return selectedTransactionIDs.has(transaction.txID);
  }, [selectedTransactionIDs]);

  const renderItem = ({ item: transaction }: { item: TransactionDescribing }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => { onTransactionSelected(transaction) }}
      >
        <RadioButton
          isChecked={isChecked(transaction)}
          ignoresTouch
        />

        <TransactionListItemContent transaction={transaction} />
      </ListItem>
    );
  };

  return (
    <FlatList
      style={styles.rootContainer}
      contentContainerStyle={{ paddingHorizontal: 14 }}
      extraData={selectedTransactionIDs}
      data={selectableTransactions}
      keyExtractor={listItemKeyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  rootContainer: {
  }
});

export default TransactionsList;