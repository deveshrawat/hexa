import React from "react";
import { StyleSheet, ImageBackground, View, ScrollView, Platform } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Item,
    Input,
    Button,
    Left,
    Right,
    Body,
    Text,
    Tab, Tabs, TabHeading,
    Segment
} from "native-base";
import { Icon } from "@up-shared/components";
import IconFontAwe from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


//TODO: Custome Pages
import CustomeStatusBar from "HexaWallet/src/app/custcompontes/CustomeStatusBar/CustomeStatusBar";
import FullLinearGradientButton from "HexaWallet/src/app/custcompontes/LinearGradient/Buttons/FullLinearGradientButton";
import WalletSetUpScrolling from "HexaWallet/src/app/custcompontes/OnBoarding/WalletSetUpScrolling/WalletSetUpScrolling";


import WalletNameScreen from "./WalletNameScreen/WalletNameScreen";
import FirstSecretQuestionScreen from "./FirstSecretQuestionScreen/FirstSecretQuestionScreen";
import SecondSecretQuestion from "./SecondSecretQuestion/SecondSecretQuestion";

//TODO: Custome Object
import { colors, images, localDB } from "HexaWallet/src/app/constants/Constants";



export default class WalletSetupScreens extends React.Component<any, any> {
    render() {
        return (
            <Container>
                <ImageBackground source={ images.WalletSetupScreen.WalletScreen.backgoundImage } style={ styles.container }>
                    <CustomeStatusBar backgroundColor={ colors.white } flagShowStatusBar={ false } barStyle="dark-content" />
                    <View style={ { marginLeft: 10, marginTop: 15 } }>
                        <Button
                            transparent
                            onPress={ () => this.props.navigation.pop() }
                        >
                            <Icon name="icon_back" size={ Platform.OS == "ios" ? 25 : 20 } color="#000000" />
                            <Text style={ { color: "#000000", alignSelf: "center", fontSize: Platform.OS == "ios" ? 25 : 20, marginLeft: 0, fontFamily: "FiraSans-Medium" } }>Set up your wallet</Text>
                        </Button>
                    </View>
                    <WalletSetUpScrolling click_GetStarted={ () => this.click_Done() }>
                        {/* First screen */ }
                        <WalletNameScreen />
                        {/* Second screen */ }
                        <FirstSecretQuestionScreen />
                        {/* Third screen */ }
                        <FirstSecretQuestionScreen />
                    </WalletSetUpScrolling>
                </ImageBackground>
            </Container >
        );
    }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
    },
    viewPagination: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 30,
        marginRight: 30
    },
    viewInputFiled: {
        flex: 3,
        alignItems: "center",
        margin: 10
    },
    itemInputWalletName: {
        borderWidth: 0,
        borderRadius: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        backgroundColor: '#FFFFFF'

    },
    viewProcedBtn: {
        flex: 2,
        justifyContent: "flex-end"
    }
} );
