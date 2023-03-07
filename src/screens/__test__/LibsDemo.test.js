import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

export default function LibsDemo() {
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
    photos_bukti_transfer: {
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

  async function handleImagePicker(index) {
    try {
      const {assets} = await launchImageLibrary({mediaType: 'photo'});
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
          return setFormPhotos({
            ...formPhotos,
            photos_bukti_transfer: {uri, name, type},
          });
        case 3:
          return setFormPhotos({...formPhotos, photos_sim: {uri, name, type}});
        case 4:
          return setFormPhotos({...formPhotos, photos_stnk: {uri, name, type}});
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
        return 'photos_bukti_transfer';
      case 3:
        return 'photos_sim';
      case 4:
        return 'photos_stnk';
      default:
        return 'photos_members';
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
      <Text style={{color: 'black'}}>Register</Text>
      <ScrollView>
        {[...new Array(5).keys()].map((v, i) => (
          <View key={i}>
            <Button
              title={`pick ${photoField(i)}`}
              onPress={() => handleImagePicker(i)}
            />
            {formPhotos[photoField(i)] && (
              <Image
                source={{uri: formPhotos[photoField(i)].uri}}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
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
      </ScrollView>
      <Button
        title="log photo fields"
        onPress={() => console.log(formPhotos)}
      />
      <Button title="log form fields" onPress={() => console.log(formData)} />
      <Button title="submit gais" onPress={submitRegister} />
    </View>
  );
}
