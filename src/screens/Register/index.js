import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {images} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Register({navigation}) {
  const [formData, setFormData] = useState({
    agama: 'a',
    alamat_lengkap: 'b',
    alamat_perusahaan: 'c',
    email: 'contoh@gmail.com',
    jenis_kelamin: 'e',
    kabupaten_kota: 'f',
    kecamatan: 'g',
    kelurahan: 'h',
    kontak_darurat: 'i',
    lat: 'j',
    lng: 'k',
    nama_lengkap: 'l',
    nama_perusahaan: 'm',
    no_chasis: 'n',
    no_engine: 'o',
    no_ktp: 'p',
    no_polisi: 'q',
    no_sim: 'r',
    no_telp: 's',
    no_whatsapp: 't',
    password: 'u',
    password_confirmation: 'v',
    pekerjaan: 'w',
    provinsi: 'x',
    status_menikah: 'y',
    tahun_kendaraan: 'z',
    tanggal_lahir: '2023-03-01',
    tanggal_pajak: '2023-03-01',
    tempat_lahir: '2023-03-01',
    type_kendaraan: 'a',
    ukuran_baju: 'b',
    warna_kendaraan: 'c',
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
    'agama',
    'alamat_lengkap',
    'alamat_perusahaan',
    'email',
    'jenis_kelamin',
    'kabupaten_kota',
    'kecamatan',
    'kelurahan',
    'kontak_darurat',
    'lat',
    'lng',
    'nama_lengkap',
    'nama_perusahaan',
    'no_chasis',
    'no_engine',
    'no_ktp',
    'no_polisi',
    'no_sim',
    'no_telp',
    'no_whatsapp',
    'password',
    'password_confirmation',
    'pekerjaan',
    'provinsi',
    'status_menikah',
    'tahun_kendaraan',
    'tanggal_lahir',
    'tanggal_pajak',
    'tempat_lahir',
    'type_kendaraan',
    'ukuran_baju',
    'warna_kendaraan',
  ];

  async function submitRegister() {
    let multipart = new FormData();
    let json = formData;

    for (let p in json) multipart.append(p, json[p]);

    multipart.append('photos_members', formPhotos.photos_members);
    multipart.append('photos_ktp', formPhotos.photos_ktp);
    multipart.append('photos_bukti_tranfer', formPhotos.photos_bukti_transfer);
    multipart.append('photos_sim', formPhotos.photos_sim);
    multipart.append('photos_stnk', formPhotos.photos_stnk);

    try {
      const {data} = await axios.post(
        'https://panthermania.lapaksiswa.com/api/auth/signup',
        multipart,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );
      if (data?.data == 'User Berhasil Registrasi') {
        console.log('sukses daftar masbro');
      }
    } catch (error) {
      console.log('error masbro', error.response);
    }
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

  const exampleResponse = {
    API: {
      agama: 'a',
      alamat_lengkap: 'b',
      created_at: '2023-03-07T06:26:48.000000Z',
      email: 'contoh@gmail.com',
      id: 95,
      jenis_kelamin: 'e',
      kabupaten_kota: 'f',
      kecamatan: 'g',
      kelurahan: 'h',
      lat: 'j',
      lng: 'k',
      nama_lengkap: 'l',
      no_chasis: 'n',
      no_engine: 'o',
      no_ktp: 'p',
      no_polisi: 'q',
      no_sim: 'r',
      no_telp: 's',
      no_whatsapp: 't',
      photos_bukti_tranfer:
        'rn_image_picker_lib_temp_781b4158-dbe0-4eaa-9eb6-2438d5d03e90.jpg',
      photos_ktp:
        'rn_image_picker_lib_temp_e0ec7f84-7a2e-4d5f-ba6f-ee02c192596f.jpg',
      photos_members:
        'rn_image_picker_lib_temp_62781ac3-4fbc-4ed3-ac97-069e337cfc1c.jpg',
      photos_sim:
        'rn_image_picker_lib_temp_0390ff06-31ba-4a0c-9cb8-b39ec05d159a.jpg',
      photos_stnk:
        'rn_image_picker_lib_temp_0f8030bd-3870-48b1-82a8-1d2793b6259c.jpg',
      provinsi: 'x',
      status_menikah: 'y',
      tahun_kendaraan: 'z',
      tanggal_lahir: '2023-03-01',
      tanggal_pajak: '2023-03-01',
      tempat_lahir: '2023-03-01',
      type_kendaraan: 'a',
      ukuran_baju: 'b',
      updated_at: '2023-03-07T06:26:48.000000Z',
      warna_kendaraan: 'c',
    },
    access_token: 'yadayadayada',
    data: 'User Berhasil Registrasi',
    token_type: 'Bearer',
  };
  const exampleError = {
    data: {email: ['The email must be a valid email address.']},
    message: 'ada kesalahan!',
  };

  return (
    <View style={{flex: 1}}>
      <Image source={images.emptybackground} style={styles.imgBackground} />
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
        <View style={{padding: 20}}>
          {[...new Array(5).keys()].map((v, i) => (
            <TouchableNativeFeedback
              key={i}
              useForeground
              onPress={() => {
                Alert.alert(
                  '',
                  'Ambil gambar dari..',
                  [
                    {
                      text: 'Kamera',
                      onPress: () => handleImagePicker(i, 'camera'),
                    },
                    {
                      text: 'Galeri',
                      onPress: () => handleImagePicker(i, 'gallery'),
                    },
                  ],
                  {cancelable: true},
                );
              }}>
              <View style={styles.imgContainer}>
                <Text
                  style={
                    styles.textPhotoFieldTitle
                  }>{`Pilih Foto ${photoFieldTitle(i)}`}</Text>
                {formPhotos[photoField(i)] && (
                  <Image
                    source={{uri: formPhotos[photoField(i)].uri}}
                    style={{width: '100%', height: 210}}
                  />
                )}
              </View>
            </TouchableNativeFeedback>
          ))}
          {formArray.map((field, i) => (
            <TextInput
              key={i}
              onChangeText={value => setFormData({...formData, [field]: value})}
              style={{color: 'black'}}
              placeholder={field}
              placeholderTextColor={'grey'}
              underlineColorAndroid={'black'}
              value={formData[field]}
            />
          ))}
          <Button
            title="log photo fields"
            onPress={() => console.log(formPhotos)}
          />
          <Button
            title="log form fields"
            onPress={() => console.log(formData)}
          />
          <Button title="submit gais" onPress={submitRegister} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
