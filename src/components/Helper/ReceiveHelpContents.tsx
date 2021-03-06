import React, { useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, Linking } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../common/Colors';
import Fonts from '../../common/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppBottomSheetTouchableWrapper } from '../AppBottomSheetTouchableWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ReceiveHelpContents(props) {
  const scrollViewRef = useRef<ScrollView>();
  const openLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.modalContainer}>
      <AppBottomSheetTouchableWrapper
        style={{ justifyContent: 'center', alignItems: 'center' }}
        activeOpacity={10}
        onPress={() => props.titleClicked && props.titleClicked()}
      >
        <Text
          style={{
            color: Colors.white,
            fontFamily: Fonts.FiraSansMedium,
            fontSize: RFValue(20),
            marginTop: hp('1%'),
            marginBottom: hp('1%'),
          }}
        >
          Receive bitcoin
        </Text>
      </AppBottomSheetTouchableWrapper>
      <View
        style={{
          backgroundColor: Colors.homepageButtonColor,
          height: 1,
          marginLeft: wp('5%'),
          marginRight: wp('5%'),
          marginBottom: hp('1%'),
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.modalContainer}
        snapToInterval={hp('80%')}
        decelerationRate="fast"
      >
        <View
          style={styles.elementView}
        >
          <Text
            style={styles.infoText}
          >
            To receive sats or bitcoin, simply share the QR code with whomever it is that you wish to receive the money from. The QR code packs in your bitcoin address to which they send the sats to.
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/icons/bitcoin_receive_info_1.png')}
              style={{
                width: wp('80%'),
                height: wp('80%'),
                resizeMode: 'contain',
              }}
            />
          </View>
          
          <Text
            style={styles.infoText}
          >
            For your privacy, a new address is generated each time you want to receive sats or bitcoin. We do this under the hood and you do not have to worry about this!
          </Text>
          <AppBottomSheetTouchableWrapper
            style={{ alignItems: 'center' }}
            onPress={() => {
              scrollViewRef.current &&
                scrollViewRef.current.scrollTo({
                  x: 0,
                  y: hp('80%'),
                  animated: true,
                });
            }}
          >
            <FontAwesome
              name="angle-double-down"
              color={Colors.white}
              size={40}
            />
          </AppBottomSheetTouchableWrapper>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={styles.dottedView}
            />
          </View>
        </View>

        <View
          style={styles.elementView}
        >
          <Text
            style={styles.infoText}
          >
            You need to keep in mind the minor’s incentive to process your transaction while receiving sats or bitcoin.
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/icons/bitcoin_receive_info_1.png')}
              style={{
                width: wp('80%'),
                height: wp('80%'),
                resizeMode: 'contain',
              }}
            />
          </View>
          
          <Text
            style={styles.infoText}
          >
            Please ensure the sender sends the money with appropriate fees for it to reach you faster.
          </Text>
          <AppBottomSheetTouchableWrapper
            style={{ alignItems: 'center' }}
            onPress={() => {
              scrollViewRef.current &&
                scrollViewRef.current.scrollTo({
                  x: 0,
                  y: hp('160%'),
                  animated: true,
                });
            }}
          >
            <FontAwesome
              name="angle-double-down"
              color={Colors.white}
              size={40}
            />
          </AppBottomSheetTouchableWrapper>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={styles.dottedView}
            />
          </View>
        </View>

        <View
          style={{...styles.elementView,
            marginTop: wp('1%'),}}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={styles.infoText}
            >
              If the fee associated with a transaction is low, you may increase the fee paid by RBF or Replace-By-fee.
            </Text>
            <Image
              source={require('../../assets/images/icons/bitcoin_send_info_2.png')}
              style={{
                width: wp('75%'),
                height: wp('75%'),
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={styles.infoText}
          >
            This provides additional incentive for the miner to process your transaction, resulting in you receiving your sats faster.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: wp('10%'),
              marginRight: wp('10%'),
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                color: Colors.white,
                // textAlign: 'center',
                fontSize: RFValue(13),
                fontFamily: Fonts.FiraSansRegular,
              }}
            >
              To know more,
            </Text>
            <AppBottomSheetTouchableWrapper
              style={{ marginLeft: 5 }}
              onPress={() =>
                openLink(
                  'https://github.com/6102bitcoin/bitcoin-intro#step-12-buying-privately',
                )
              }
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: RFValue(13),
                  fontFamily: Fonts.FiraSansRegular,
                  textDecorationLine: 'underline',
                  textAlign: 'center',
                }}
              >
                click here
              </Text>
            </AppBottomSheetTouchableWrapper>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    width: '100%',
    elevation: 10,
    shadowColor: Colors.borderColor,
    shadowOpacity: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  infoText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: RFValue(13),
    fontFamily: Fonts.FiraSansRegular,
    marginLeft: wp('10%'),
   marginRight: wp('10%'),
  },
  elementView: {
    height: hp('80%'),
    justifyContent: 'space-between',
    paddingBottom: hp('6%'),
    marginTop: hp('4%'),
  }, 
  dottedView:{
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: Colors.white,
    width: wp('70%'),
    height: 0,
  }
});
