import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import AllTransactionsContainerScreen from "../../../pages/Transactions/AllTransactionsContainerScreen";
import SmallNavHeaderBackButton from "../../../components/navigation/SmallNavHeaderBackButton";
import NavStyles from '../../../common/Styles/NavStyles';
import SmallNavHeaderCloseButton from '../../../components/navigation/SmallNavHeaderCloseButton';
import AllTransactionsDetailsContainerScreen from '../../../pages/Transactions/AllTransactionsDetailsContainerScreen';
import defaultStackScreenNavigationOptions from '../../options/DefaultStackScreenNavigationOptions';
import FastBitcoinsVoucherScanContainerScreen from '../../../pages/FastBitcoinsVoucherScan/FastBitcoinsVoucherScanContainerScreen';


const FastBitcoinsVoucherScanStack = createStackNavigator(
  {
    VoucherScanRoot: {
      screen: FastBitcoinsVoucherScanContainerScreen,
      navigationOptions: ({ navigation }) => {
        return {
          ...defaultStackScreenNavigationOptions,
          title: "Scan a FastBitcoins Voucher",
          headerLeft: () => {
            return <SmallNavHeaderCloseButton onPress={ () => { navigation.pop() } } />;
          },
        };
      },
    },
    // TransactionDetails: {
    //   screen: AllTransactionsDetailsContainerScreen,
    //   navigationOptions: {
    //     title: "Transaction Details",
    //   },
    // },
  },
  {
    initialRouteName: 'VoucherScanRoot',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        ...defaultStackScreenNavigationOptions,
        headerLeft: () => {
          return <SmallNavHeaderBackButton onPress={() => { navigation.pop() }} />;
        },
      };
    },
  },
);

export default FastBitcoinsVoucherScanStack;
