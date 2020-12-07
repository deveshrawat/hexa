import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import FormStyles from '../../common/Styles/FormStyles';


export type Props = {
  placeholder: string;
  containerStyle?: Record<string, unknown>;
  onCodeEntered: (voucherCode: string) => void;
};

const VoucherCodeInputSection: React.FC<Props> = ({
  placeholder = 'Enter Voucher Code',
  containerStyle = {},
  onCodeEntered,
}: Props) => {

  const [voucherCode, setVoucherCode] = useState('');


  return (
    <Input
      containerStyle={containerStyle}
      inputContainerStyle={[FormStyles.textInputContainer]}
      inputStyle={FormStyles.inputText}
      placeholder={placeholder}
      placeholderTextColor={FormStyles.placeholderText.color}
      value={voucherCode}
      autoCorrect={false}
      onChangeText={setVoucherCode}
      onSubmitEditing={() => onCodeEntered(voucherCode)}
      autoCompleteType="off"
      keyboardType={
        Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'
      }
    />
  );
};


export default VoucherCodeInputSection;
