import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
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
import {BackgroundImage, Gap, Header} from '../../components';
import formExample from './formExample';
import Geolocation from 'react-native-geolocation-service';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const {status_signup, token} = useSelector(state => state.auth);

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  const [formData, setFormData] = useState({
    agama: 'Pilih Agama',
    alamat_lengkap: '',
    alamat_perusahaan: '',
    email: '',
    handphone: '',
    jenis_kelamin: 'Laki-laki',
    kabupaten_kota: '',
    kecamatan: '',
    kelurahan: '',
    kodepos: '',
    no_ktp: '',
    nama_lengkap: '',
    nama_perusahaan: '',
    no_chasis: '',
    no_engine: '',
    no_polisi: '',
    no_whatsapp: '',
    password: '',
    password_confirmation: '',
    pekerjaan: '',
    provinsi: '',
    sekolah: '',
    no_sim: '',
    status_nikah: 'Pilih Status Menikah',
    tahun_kendaraan: '',
    tanggal_lahir: 'Pilih Tanggal Lahir',
    tanggal_pajak: 'Pilih Tanggal Pajak Kendaraan',
    telp_kantor: '',
    telp_rumah: '',
    tempat_lahir: '',
    type_kendaraan: '',
    ukuran_baju: 'Pilih Ukuran Baju',
    warna_kendaraan: '',
    lat: '',
    lng: '',
  });
  const [formPhotos, setFormPhotos] = useState({
    profile: {
      uri: null,
      name: null,
      type: null,
    },
    ktp: {
      uri: null,
      name: null,
      type: null,
    },
    sim: {
      uri: null,
      name: null,
      type: null,
    },
    stnk: {
      uri: null,
      name: null,
      type: null,
    },
    bukti_tf: {
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
    {field: 'status_nikah', name: 'Status Menikah'},
    {field: 'alamat_lengkap', name: 'Alamat Lengkap'},
    {field: 'kelurahan', name: 'Kelurahan'},
    {field: 'kecamatan', name: 'Kecamatan'},
    {field: 'provinsi', name: 'Provinsi'},
    {field: 'kabupaten_kota', name: 'Kabupaten Kota'},
    {field: 'kodepos', name: 'Kode pos'},
    {field: 'nama_perusahaan', name: 'Nama Perusahaan'},
    {field: 'alamat_perusahaan', name: 'Alamat Perusahaan'},
    {field: 'handphone', name: 'Nomor Telepon'},
    {field: 'no_whatsapp', name: 'Nomor WhatsApp'},
    {field: 'telp_kantor', name: 'Nomor telp Kantor'},
    {field: 'telp_rumah', name: 'No telp Rumah'},
    {field: 'sekolah', name: 'Sekolah'},
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
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
    const Permit = PermissionsAndroid;

    try {
      const grantedFine = await Permit.request(
        Permit.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const grantedCoarse = await Permit.request(
        Permit.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (
        grantedFine === 'never_ask_again' ||
        grantedCoarse === 'never_ask_again'
      ) {
        ToastAndroid.show('Izin lokasi diperlukan', ToastAndroid.LONG);
        Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => Linking.openSettings()},
          ],
          {cancelable: false},
        );
        return;
      } else if (grantedFine === 'granted' && grantedCoarse === 'granted') {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            const {latitude: lat, longitude: lng} = coords;
            setFormData({...formData, lat, lng});
          },
          ({code, message}) => {
            ToastAndroid.show(
              `Terjadi kesalahan: ${message}`,
              ToastAndroid.SHORT,
            );
          },
          {enableHighAccuracy: true},
        );
        return;
      } else {
        return Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => getLocationPermission()},
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      ToastAndroid.show(
        `Terjadi kesalahan: ${error.message}`,
        ToastAndroid.SHORT,
      );
    }
  }

  async function submitRegister() {
    let multiPart = new FormData();
    let json = formData;

    for (let p in json) {
      multiPart.append(p, json[p]);
    }

    multiPart.append('profile', formPhotos.profile);
    multiPart.append('ktp', formPhotos.ktp);
    multiPart.append('bukti_tf', formPhotos.bukti_tf);
    multiPart.append('sim', formPhotos.sim);
    multiPart.append('stnk', formPhotos.stnk);

    dispatch(fetchSignUp({multiPart, navigation}));
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
            profile: {uri, name, type},
          });
        case 1:
          return setFormPhotos({...formPhotos, ktp: {uri, name, type}});
        case 2:
          return setFormPhotos({...formPhotos, stnk: {uri, name, type}});
        case 3:
          return setFormPhotos({...formPhotos, sim: {uri, name, type}});
        case 4:
          return setFormPhotos({
            ...formPhotos,
            bukti_tf: {uri, name, type},
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleImagePicker(i, 'camera');
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
          onPress: () => handleImagePicker(i, 'gallery'),
        },
      ],
      {cancelable: true},
    );
  }
  function photoField(index) {
    switch (index) {
      case 0:
        return 'profile';
      case 1:
        return 'ktp';
      case 2:
        return 'stnk';
      case 3:
        return 'sim';
      case 4:
        return 'bukti_tf';
      default:
        return 'profile';
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
        selectedValue={formData.status_nikah}
        onValueChange={value => setFormData({...formData, status_nikah: value})}
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

  const [dateBirth, setDateBirth] = useState({
    value: new Date(),
    visible: false,
  });
  function handleDateBirth(event, selectedDate) {
    if (event.type == 'set') {
      setDateBirth({visible: false, value: selectedDate});
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      setFormData({...formData, tanggal_lahir: `${y}-${m}-${d}`});
    } else {
      setDateBirth({...dateBirth, visible: false});
    }
  }

  const [dateTax, setDateTax] = useState({
    value: new Date(),
    visible: false,
  });
  function handleDateTax(event, selectedDate) {
    if (event.type == 'set') {
      setDateTax({visible: false, value: selectedDate});
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      setFormData({...formData, tanggal_pajak: `${y}-${m}-${d}`});
    } else {
      setDateTax({...dateTax, visible: false});
    }
  }

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Register" onPress={() => navigation.goBack()} />
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
              const date = i == 7 || i == 32;
              const renderDate = () =>
                i == 7
                  ? setDateBirth({...dateBirth, visible: true})
                  : setDateTax({...dateTax, visible: true});
              const dateValue =
                i == 7 ? formData.tanggal_lahir : formData.tanggal_pajak;

              return (
                <FormInput
                  key={i}
                  onChangeText={value =>
                    setFormData({...formData, [field]: value})
                  }
                  // showIndex
                  index={i}
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
                />
              );
            })}
            {dateBirth.visible && (
              <DatePicker
                value={dateBirth.value}
                onChange={handleDateBirth}
                maximumDate={new Date()}
              />
            )}
            {dateTax.visible && (
              <DatePicker value={dateTax.value} onChange={handleDateTax} />
            )}
            <Gap height={20} />
            <ButtonSubmit
              onPress={submitRegister}
              loading={status_signup == 'pending'}
            />
            <Gap height={20} />
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
