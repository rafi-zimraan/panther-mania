import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FormInput({
  onChangeText,
  password,
  placeholder = 'Default placeholder',
  iconName = 'gmail',
}) {
  const [peak, setPeak] = useState(false);

  return (
    <View style={styles.container}>
      <Icon name={iconName} color={'white'} size={25} style={styles.iconType} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry={password && peak}
        style={{flex: 1}}
      />
      {password && (
        <TouchableNativeFeedback onPress={() => setPeak(!peak)}>
          <View>
            <Icon
              style={styles.iconType}
              name={peak ? 'eye' : 'eye-off'}
              size={25}
              color={'white'}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconType: {
    backgroundColor: '#183240',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderColor: '#679BA9',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 60 / 2,
    paddingHorizontal: 10,
    width: '90%',
    maxWidth: 320,
  },
});
