import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {Checkbox} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';
import {GlobalContext} from '../Store/globalContext';

const CustomCheckBox = ({onPress, text, status}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <View style={styles.container}>
      <Checkbox status={status ? 'checked' : 'unchecked'} onPress={onPress} />
      <Text
        style={[
          styles.textStyle,
          {color: dark ? colors.black03 : colors.black03},
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: WIDTH * 0.02,
  },
  textStyle: {
    fontSize: HEIGHT * 0.022,
    fontFamily: fonts.BebasNeueRegular,
  },
});
