import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export default function FormInput({
  type = 'text',
  name,
  title,
  placeholder = 'Placeholder input',
  pickerItem,
  iconName = 'account',
  defaultValue,
  keyboardType,
  secureTextEntry,
  control,
  required = true,
  validate,
  errors,
  autoCapitalize,
  multiline,
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

  // Image handler
  async function handleImagePicker(onChange) {
    // Capture or select an image
    const imagePicker = async from => {
      try {
        const method =
          from == 'gallery'
            ? launchImageLibrary({mediaType: 'photo', quality: 0.2})
            : launchCamera({mediaType: 'photo', quality: 0.2});
        const {assets} = await method;
        if (assets) {
          const {fileName: name, uri, type} = assets[0];
          onChange({uri, name, type});
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Camera permission
    const PermissionCamera = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imagePicker('camera');
      }
    };

    Alert.alert(
      '',
      'Ambil gambar dari..',
      [
        {
          text: 'Kamera',
          onPress: () => PermissionCamera(),
        },
        {
          text: 'Galeri',
          onPress: () => imagePicker('gallery'),
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{required, validate}}
      defaultValue={defaultValue}
      render={({field: {value, onChange}}) => (
        <View style={{width: '100%'}}>
          {/* image field */}
          {type == 'image' ? (
            <View style={{height: 260}}>
              {title && <Text style={styles.textTitle}>{title}</Text>}
              <TouchableNativeFeedback
                useForeground
                onPress={() => handleImagePicker(onChange)}>
                <View style={styles.imgContainer}>
                  <Icon
                    name="camera-image"
                    color={'grey'}
                    size={60}
                    style={styles.iconCamera}
                  />
                  <Text style={styles.textPickImage}>Pilih Gambar</Text>
                  {value?.uri && (
                    <Image
                      source={{uri: value.uri}}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.textError}>
                {errors?.[name] ? 'Perlu diisi' : ''}
              </Text>
            </View>
          ) : (
            // input field

            <View>
              {title && <Text style={styles.textTitle}>{title}</Text>}
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
                      style={{
                        ...styles.textInput,
                        height: multiline ? 65 : 50,
                      }}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={showPassword}
                      keyboardType={keyboardType}
                      autoCapitalize={autoCapitalize}
                      placeholder={placeholder}
                      placeholderTextColor={'grey'}
                      multiline={multiline}
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
                  <View style={styles.containerPicker}>
                    <Picker
                      style={{flex: 1, marginTop: -4}}
                      onValueChange={onChange}
                      selectedValue={value}
                      mode="dropdown"
                      dropdownIconColor={'black'}>
                      {pickerItem?.map((item, i) => (
                        <Picker.Item
                          key={i}
                          value={item.value}
                          label={item.name}
                          color={'black'}
                        />
                      ))}
                    </Picker>
                  </View>
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
              <Text style={styles.textError}>
                {errors?.[name] ? 'Perlu diisi' : ''}
              </Text>
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerPicker: {
    flex: 1,
    height: 50,
    overflow: 'hidden',
    paddingTop: -10,
  },
  textTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 5,
  },
  textPickImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: 25,
  },
  iconCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: -15,
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 3,
    height: 210,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textInputError: {
    marginHorizontal: 25,
    color: 'tomato',
    fontSize: 13,
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
  },
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
    borderRadius: 50,
    overflow: 'hidden',
    paddingLeft: 10,
    height: 50,
  },
  textInput: {
    color: 'black',
    flex: 1,
    marginHorizontal: 5,
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
    borderWidth: 1,
    paddingHorizontal: 15,
    padding: 5,
    backgroundColor: 'white',
    width: '100%',
  },
});
