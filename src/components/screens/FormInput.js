import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  type = 'text',
  placeholder = 'Placeholder input',
  pickerItem,
  iconName = 'account',
  defaultValue,
  keyboardType,
  secureTextEntry,
  name,
  control,
  required = true,
  validate,
  errors,
  errorMessage = 'Field tidak boleh kosong',
}) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  // Date handler
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  function handleChangeDate(event, selectedDate, onChange) {
    if (event.type == 'set') {
      setShowDate(false);
      setDateValue(selectedDate);
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      onChange(`${y}-${m}-${d}`);
    } else {
      setShowDate(false);
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{required, validate}}
      defaultValue={defaultValue}
      render={({field: {value, onChange}}) => (
        <View style={{height: 85}}>
          <View style={styles.container}>
            <Icon
              name={iconName}
              color={'white'}
              style={styles.icon}
              size={20}
            />
            {type == 'text' && (
              <>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChange}
                  value={value}
                  placeholder={placeholder}
                  secureTextEntry={showPassword}
                  keyboardType={keyboardType}
                  placeholderTextColor={'grey'}
                />
                {secureTextEntry && (
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
              </>
            )}
            {type == 'picker' && (
              <Picker
                style={{flex: 1}}
                onValueChange={onChange}
                selectedValue={value}
                mode="dropdown">
                {pickerItem?.map((item, i) => (
                  <Picker.Item key={i} value={item.value} label={item.name} />
                ))}
              </Picker>
            )}
            {type == 'date' && (
              <TouchableNativeFeedback
                onPress={() => setShowDate(true)}
                useForeground>
                <View style={styles.btnDate}>
                  <Text style={styles.textDate}>
                    {value ? value : placeholder}
                  </Text>
                  {showDate && (
                    <DatePicker
                      value={dateValue}
                      onChange={(event, date) =>
                        handleChangeDate(event, date, onChange)
                      }
                      mode="date"
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
          {errors?.[name] && <Text style={styles.textError}>Perlu diisi</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  textError: {
    textAlign: 'right',
    marginHorizontal: 25,
    color: 'tomato',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textDate: {
    color: 'black',
    textAlignVertical: 'center',
    height: '100%',
  },
  btnDate: {
    flex: 1,
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    paddingLeft: 10,
  },
  textInput: {
    color: 'black',
    flex: 1,
    marginHorizontal: 5,
    // backgroundColor: 'aqua',
  },
  btnIconEye: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
