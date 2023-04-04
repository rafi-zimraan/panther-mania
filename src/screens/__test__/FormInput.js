import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';

export default function FormInput({
  onChangeText,
  value,
  placeholder,
  type = 'text',
  pickerItem,
  selectedPickerValue,
  onPickerChange,
  placeholderPicker = 'Picker Placeholder',
}) {
  const [defaultDate, setDefaultDate] = useState(new Date());

  return (
    <View>
      {type == 'text' && (
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
        />
      )}
      {type == 'picker' && (
        <Picker
          selectedValue={selectedPickerValue}
          onValueChange={onPickerChange}>
          <Picker.Item label={placeholderPicker} value={placeholderPicker} />
          {pickerItem?.map((item, i) => (
            <Picker.Item label={item.label} value={item.label} key={i} />
          ))}
        </Picker>
      )}
      {type == 'date' && <DatePicker />}
    </View>
  );
}

const styles = StyleSheet.create({});
