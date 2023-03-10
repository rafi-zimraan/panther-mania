import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImgBgPlain} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignUp} from '../../features/Auth/services/signUpServices';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const {status_signup, token} = useSelector(state => state.auth);

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    password_confirmation: '',
    jenis_kelamin: 'Laki-laki',
    ukuran_baju: 'Pilih Ukuran Baju',
    tempat_lahir: '',
    tanggal_lahir: 'Pilih Tanggal Lahir',
    agama: 'Pilih Agama',
    status_menikah: 'Pilih Status Menikah',
    alamat_lengkap: '',
    kelurahan: '',
    kecamatan: '',
    provinsi: '',
    kabupaten_kota: '',
    nama_perusahaan: '',
    alamat_perusahaan: '',
    kontak_darurat: '',
    no_telp: '',
    no_whatsapp: '',
    pekerjaan: '',
    type_kendaraan: '',
    tahun_kendaraan: '',
    no_ktp: '',
    no_sim: '',
    no_polisi: '',
    warna_kendaraan: '',
    no_chasis: '',
    no_engine: '',
    tanggal_pajak: 'Pilih Tanggal Pajak Kendaraan',
    lat: '123123',
    lng: '123123123',
  });
  const [formPhotos, setFormPhotos] = useState({
    photos_members: {
      uri: null,
      name: null,
      type: null,
    },
    photos_ktp: {
      uri: null,
      name: null,
      type: null,
    },
    photos_sim: {
      uri: null,
      name: null,
      type: null,
    },
    photos_stnk: {
      uri: null,
      name: null,
      type: null,
    },
    photos_bukti_transfer: {
      uri: null,
      name: null,
      type: null,
    },
  });

  const formArray = [
    {field: 'nama_lengkap', name: 'Nama Lengkap'},
    {field: 'email', name: 'Email'},
    {field: 'password', name: 'Kata Sandi'},
    {field: 'password_confirmation', name: 'Konfirmasi Kata Sandi'},
    {field: 'jenis_kelamin', name: 'Gender'},
    {field: 'ukuran_baju', name: 'Ukuran Baju'},
    {field: 'tempat_lahir', name: 'Tempat Lahir'},
    {field: 'tanggal_lahir', name: 'Tanggal Lahir'},
    {field: 'agama', name: 'Agama'},
    {field: 'status_menikah', name: 'Status Menikah'},
    {field: 'alamat_lengkap', name: 'Alamat Lengkap'},
    {field: 'kelurahan', name: 'Kelurahan'},
    {field: 'kecamatan', name: 'Kecamatan'},
    {field: 'provinsi', name: 'Provinsi'},
    {field: 'kabupaten_kota', name: 'Kabupaten Kota'},
    {field: 'nama_perusahaan', name: 'Nama Perusahaan'},
    {field: 'alamat_perusahaan', name: 'Alamat Perusahaan'},
    {field: 'kontak_darurat', name: 'Kontak Darurat'},
    {field: 'no_telp', name: 'Nomor Telepon'},
    {field: 'no_whatsapp', name: 'Nomor WhatsApp'},
    {field: 'pekerjaan', name: 'Pekerjaan'},
    {field: 'type_kendaraan', name: 'Tipe Kendaraan'},
    {field: 'tahun_kendaraan', name: 'Tahun Kendaraan'},
    {field: 'no_ktp', name: 'Nomor KTP'},
    {field: 'no_sim', name: 'Nomor SIM'},
    {field: 'no_polisi', name: 'Nomor Polisi'},
    {field: 'warna_kendaraan', name: 'Warna Kendaraan'},
    {field: 'no_chasis', name: 'Nomor Chasis'},
    {field: 'no_engine', name: 'Nomor Engine'},
    {field: 'tanggal_pajak', name: 'Tanggal Pajak'},
  ];

  useEffect(() => {
    const successSignUp = async () => {
      await EncryptedStorage.setItem(
        'user_credential',
        JSON.stringify({email: formData.email, password: formData.password}),
      );
      navigation.replace('Home');
    };
    if (token) successSignUp();
  }, [token]);
  async function submitRegister() {
    let multiPart = new FormData();
    let json = formData;

    for (let p in json) multiPart.append(p, json[p]);

    multiPart.append('photos_members', formPhotos.photos_members);
    multiPart.append('photos_ktp', formPhotos.photos_ktp);
    multiPart.append('photos_bukti_tranfer', formPhotos.photos_bukti_transfer);
    multiPart.append('photos_sim', formPhotos.photos_sim);
    multiPart.append('photos_stnk', formPhotos.photos_stnk);

    dispatch(fetchSignUp(multiPart));
  }

  async function handleImagePicker(index, from) {
    try {
      const method =
        from == 'gallery'
          ? launchImageLibrary({mediaType: 'photo', quality: 0.2})
          : launchCamera({mediaType: 'photo', quality: 0.2});
      const {assets} = await method;
      const {uri, fileName: name, type} = assets[0];
      switch (index) {
        case 0:
          return setFormPhotos({
            ...formPhotos,
            photos_members: {uri, name, type},
          });
        case 1:
          return setFormPhotos({...formPhotos, photos_ktp: {uri, name, type}});
        case 2:
          return setFormPhotos({...formPhotos, photos_stnk: {uri, name, type}});
        case 3:
          return setFormPhotos({...formPhotos, photos_sim: {uri, name, type}});
        case 4:
          return setFormPhotos({
            ...formPhotos,
            photos_bukti_transfer: {uri, name, type},
          });
        default:
          return console.log(`field dengan index ${index} tidak ditemukan`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleImageMethod(i) {
    const PermissionCamera = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        handleImagePicker(i, 'camera');
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
          onPress: () => handleImagePicker(i, 'gallery'),
        },
      ],
      {cancelable: true},
    );
  }
  function photoField(index) {
    switch (index) {
      case 0:
        return 'photos_members';
      case 1:
        return 'photos_ktp';
      case 2:
        return 'photos_stnk';
      case 3:
        return 'photos_sim';
      case 4:
        return 'photos_bukti_transfer';
      default:
        return 'photos_members';
    }
  }
  function photoFieldTitle(index) {
    switch (index) {
      case 0:
        return 'Profil';
      case 1:
        return 'KTP';
      case 2:
        return 'STNK';
      case 3:
        return 'SIM';
      case 4:
        return 'Bukti Transfer';
      default:
        return 'Tidak diketahui';
    }
  }

  function PickerGender() {
    return (
      <Picker
        style={{flex: 1, color: 'black'}}
        dropdownIconColor={'grey'}
        selectedValue={formData.jenis_kelamin}
        onValueChange={value =>
          setFormData({...formData, jenis_kelamin: value})
        }
        mode={'dropdown'}>
        <Picker.Item label="Laki-laki" value={'Laki-laki'} />
        <Picker.Item label="Perempuan" value={'Perempuan'} />
      </Picker>
    );
  }
  function PickerClothSize() {
    return (
      <Picker
        style={{flex: 1, color: 'black'}}
        dropdownIconColor={'grey'}
        selectedValue={formData.ukuran_baju}
        onValueChange={value => setFormData({...formData, ukuran_baju: value})}
        mode={'dropdown'}>
        <Picker.Item
          label="Pilih Ukuran Baju"
          value={'Pilih Ukuran Baju'}
          style={{color: 'grey'}}
        />
        {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(v => (
          <Picker.Item key={v} label={v} value={v} />
        ))}
      </Picker>
    );
  }
  function PickerReligion() {
    return (
      <Picker
        style={{flex: 1, color: 'black'}}
        dropdownIconColor={'grey'}
        selectedValue={formData.agama}
        onValueChange={value => setFormData({...formData, agama: value})}
        mode={'dropdown'}>
        <Picker.Item
          label="Pilih Agama"
          value={'Pilih Agama'}
          style={{color: 'grey'}}
        />
        {['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha'].map(v => (
          <Picker.Item key={v} label={v} value={v} />
        ))}
      </Picker>
    );
  }
  function PickerMarriedStatus() {
    return (
      <Picker
        style={{flex: 1, color: 'black'}}
        dropdownIconColor={'grey'}
        selectedValue={formData.status_menikah}
        onValueChange={value =>
          setFormData({...formData, status_menikah: value})
        }
        mode={'dropdown'}>
        <Picker.Item
          label="Pilih Status Menikah"
          value={'Pilih Status Menikah'}
          style={{color: 'grey'}}
        />
        {['Lajang', 'Duda', 'Janda', 'Menikah'].map(v => (
          <Picker.Item key={v} label={v} value={v} />
        ))}
      </Picker>
    );
  }

  const [showDateBirth, setShowDateBirth] = useState(false);
  const [birthValue, setBirthValue] = useState(new Date());
  function handleDateBirth(event, selectedDate) {
    if (event.type == 'set') {
      setShowDateBirth(false);
      setBirthValue(selectedDate);
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      setFormData({...formData, tanggal_lahir: `${y}-${m}-${d}`});
    } else setShowDateBirth(false);
  }

  const [showDateTax, setShowDateTax] = useState(false);
  const [taxValue, setTaxValue] = useState(new Date());
  function handleDateTax(event, selectedDate) {
    if (event.type == 'set') {
      setShowDateTax(false);
      setTaxValue(selectedDate);
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      setFormData({...formData, tanggal_pajak: `${y}-${m}-${d}`});
    } else setShowDateTax(false);
  }

  return (
    <View style={{flex: 1}}>
      <Image source={ImgBgPlain} style={styles.imgBackground} />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.goBack()}>
          <View style={styles.headerContainer}>
            <View style={styles.btnBack}>
              <Icon
                name="chevron-left"
                color={'white'}
                size={32}
                style={styles.iconBack}
              />
            </View>
            <View style={{width: 20}} />
            <Text style={styles.headerTitle}>Register</Text>
          </View>
        </TouchableNativeFeedback>
        {ready && (
          <View style={styles.container}>
            {/* Image field */}
            {[...new Array(5).keys()].map((v, i) => (
              <TouchableNativeFeedback
                key={i}
                useForeground
                onPress={() => handleImageMethod(i)}>
                <View style={styles.imgContainer}>
                  <Text
                    style={
                      styles.textPhotoFieldTitle
                    }>{`Pilih Foto ${photoFieldTitle(i)}`}</Text>
                  {formPhotos[photoField(i)].uri ? (
                    <Image
                      source={{uri: formPhotos[photoField(i)].uri}}
                      style={{width: '100%', height: 210}}
                    />
                  ) : null}
                </View>
              </TouchableNativeFeedback>
            ))}

            {/* Input, Date & Picker field  distinguished by array index */}
            {formArray.map(({field, name}, i) => {
              // array index for picker field: 4 5 7 8 9
              const picker = i == 4 || i == 5 || i == 8 || i == 9;
              const renderPicker =
                i == 4
                  ? PickerGender()
                  : i == 5
                  ? PickerClothSize()
                  : i == 8
                  ? PickerReligion()
                  : PickerMarriedStatus();

              // array index for date field: 7 29
              const date = i == 7 || i == 29;
              const renderDate = () =>
                i == 7 ? setShowDateBirth(true) : setShowDateTax(true);
              const dateValue =
                i == 7 ? formData.tanggal_lahir : formData.tanggal_pajak;

              // array index for keyboard type
              const keyboardType =
                i == 1
                  ? 'email-address'
                  : i == 17 ||
                    i == 18 ||
                    i == 19 ||
                    i == 22 ||
                    i == 23 ||
                    i == 24 ||
                    i == 25 ||
                    i == 27 ||
                    i == 28
                  ? 'phone-pad'
                  : null;
              return (
                <FormInput
                  key={i}
                  onChangeText={value =>
                    setFormData({...formData, [field]: value})
                  }
                  iconIndex={i}
                  value={formData[field]}
                  placeholder={name}
                  password={i == 2 || i == 3}
                  picker={picker}
                  pickerChildren={renderPicker}
                  date={date}
                  onPressDate={renderDate}
                  dateValue={dateValue}
                  multiline={i == 10}
                  autoCapitalize={i == 0 ? 'words' : i == 1 ? 'none' : null}
                  keyboardType={keyboardType}
                />
              );
            })}
            {showDateBirth && (
              <DatePicker
                value={birthValue}
                onChange={handleDateBirth}
                maximumDate={new Date()}
              />
            )}
            {showDateTax && (
              <DatePicker value={taxValue} onChange={handleDateTax} />
            )}
            <ButtonSubmit
              onPress={submitRegister}
              loading={status_signup == 'pending'}
              // disabled={disableSignUp}
            />
          </View>
        )}
      </ScrollView>
      {!ready && <Text style={styles.textLoading}>Memuat formulir..</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
    flex: 1,
    fontStyle: 'italic',
  },
  textPhotoFieldTitle: {
    position: 'absolute',
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 3,
    height: 210,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 17,
  },
  iconBack: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnBack: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    elevation: 3,
  },
  headerContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
