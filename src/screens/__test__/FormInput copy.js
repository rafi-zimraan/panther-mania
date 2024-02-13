import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
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
  dateValue = new Date(),
}) {
  const [dateTime, setDateTime] = useState(dateValue);
  const [showDate, setshowDate] = useState(false);

  const onDateTimeChange = (event, selectedDate) => {
    setshowDate(true);
    if (event.type == 'set') {
      setDateTime(currentDate);
      setshowDate(false);
    } else {
      setshowDate(false);
    }
  };

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
      {type == 'date' && (
        <TouchableNativeFeedback onPress={() => setshowDate(true)}>
          <View>
            <Text>{dateTime.toLocaleString()}</Text>
            {showDate && (
              <DatePicker
                onChange={onDateTimeChange}
                mode="date"
                value={dateTime}
              />
            )}
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
