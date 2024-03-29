import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  placeholder = 'The placeholder..',
  onChangeText,
  value,
  password,
  picker,
  pickerChildren,
  date,
  dateValue = 'Pilih Tanggal',
  onPressDate,
  multiline,
  autoCapitalize,
  iconOverride,
  index,
  showIndex,
}) {
  const [showPassword, setShowPassword] = useState(false);

  function iconName(i) {
    return i == 0
      ? 'account'
      : i == 1
      ? 'gmail'
      : i == 2
      ? 'shield-key'
      : i == 3
      ? 'shield-key'
      : i == 4
      ? 'gender-male-female'
      : i == 5
      ? 'tshirt-crew'
      : i == 6
      ? 'calendar'
      : i == 7
      ? 'calendar'
      : i == 8
      ? 'hands-pray'
      : i == 9
      ? 'account-heart'
      : i == 10
      ? 'map-marker-radius'
      : i == 11
      ? 'map-legend'
      : i == 12
      ? 'map-legend'
      : i == 13
      ? 'map-legend'
      : i == 14
      ? 'map-legend'
      : i == 15
      ? 'email-fast'
      : i == 16
      ? 'office-building'
      : i == 17
      ? 'office-building-marker'
      : i == 18
      ? 'phone'
      : i == 19
      ? 'whatsapp'
      : i == 20
      ? 'card-account-phone'
      : i == 21
      ? 'phone-classic'
      : i == 22
      ? 'school'
      : i == 23
      ? 'badge-account'
      : i == 24
      ? 'car-info'
      : i == 25
      ? 'car-clock'
      : i == 26
      ? 'card-account-details'
      : i == 27
      ? 'card-account-details'
      : i == 28
      ? 'card-bulleted'
      : i == 29
      ? 'car-info'
      : i == 30
      ? 'car-info'
      : i == 31
      ? 'car-info'
      : i == 32
      ? 'car-clock'
      : i == 33
      ? 'phone-alert'
      : 'account';
  }

  const keyboardType =
    index == 1
      ? 'email-address'
      : index == 15 ||
        index == 18 ||
        index == 19 ||
        index == 20 ||
        index == 21 ||
        index == 25 ||
        index == 26 ||
        index == 27
      ? 'phone-pad'
      : null;

  return (
    <View style={{margin: 10}}>
      <View style={styles.container}>
        <Icon
          name={iconOverride ? iconOverride : iconName(index)}
          color={'white'}
          style={styles.icon}
          size={20}
        />
        {picker ? (
          pickerChildren
        ) : date ? (
          <Pressable style={styles.btnDate} onPress={onPressDate}>
            <Text style={{color: 'black'}}>{dateValue}</Text>
          </Pressable>
        ) : (
          <TextInput
            onChangeText={onChangeText}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            value={value}
            secureTextEntry={password && !showPassword}
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        )}
        {password && (
          <TouchableNativeFeedback
            useForeground
            onPress={() => setShowPassword(!showPassword)}>
            <View style={styles.btnIconEye}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                color={'white'}
                size={20}
              />
            </View>
          </TouchableNativeFeedback>
        )}
        {showIndex && <Text>{index}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: 'tomato',
    marginHorizontal: 10,
  },
  btnDate: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  btnIconEye: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    flex: 1,
    marginHorizontal: 5,
    // backgroundColor: 'aqua',
  },
  icon: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 35 / 2,
  },
  container: {
    borderRadius: 50,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: 60,
    width: '100%',
  },
});
