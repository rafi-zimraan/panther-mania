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
  iconIndex = 0,
  picker,
  pickerChildren,
  date,
  dateValue = 'Pilih Tanggal',
  onPressDate,
  multiline,
  autoCapitalize,
  keyboardType,
  iconOverride,
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
      ? 'office-building'
      : i == 16
      ? 'office-building-marker'
      : i == 17
      ? 'phone-alert'
      : i == 18
      ? 'phone'
      : i == 19
      ? 'whatsapp'
      : i == 20
      ? 'briefcase-account'
      : i == 21
      ? 'car-info'
      : i == 22
      ? 'car-info'
      : i == 23
      ? 'card-account-details'
      : i == 24
      ? 'card-account-details'
      : i == 25
      ? 'card-account-details'
      : i == 26
      ? 'car-wash'
      : i == 27
      ? 'car-info'
      : i == 28
      ? 'car-info'
      : i == 29
      ? 'car-clock'
      : 'account';
  }

  return (
    <View style={styles.container}>
      <Icon
        name={iconOverride ? iconOverride : iconName(iconIndex)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  btnDate: {
    height: 45,
    // backgroundColor: 'aqua',
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
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
