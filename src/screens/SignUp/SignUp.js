import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignUp} from '../../features/Auth/services/signUpServices';
import {BackgroundImage, Gap, Header} from '../../components';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const {status_signup} = useSelector(state => state.auth);

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
    ktp: '',
    nama_lengkap: '',
    nama_perusahaan: '',
    no_chasis: '',
    no_engine: '',
    no_polisi: '',
    password: '',
    password_confirmation: '',
    pekerjaan: '',
    provinsi: '',
    sekolah: '',
    sim: '',
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
    {field: 'kodepos', name: 'Kode pos'}, // new
    {field: 'nama_perusahaan', name: 'Nama Perusahaan'},
    {field: 'alamat_perusahaan', name: 'Alamat Perusahaan'},
    {field: 'handphone', name: 'Nomor Telepon'},
    {field: 'telp_kantor', name: 'Nomor telp Kantor'},
    {field: 'telp_rumah', name: 'No telp Rumah'}, // new
    {field: 'sekolah', name: 'Sekolah'}, // new
    {field: 'pekerjaan', name: 'Pekerjaan'},
    {field: 'type_kendaraan', name: 'Tipe Kendaraan'},
    {field: 'tahun_kendaraan', name: 'Tahun Kendaraan'},
    {field: 'ktp', name: 'Nomor KTP'},
    {field: 'sim', name: 'Nomor SIM'},
    {field: 'no_polisi', name: 'Nomor Polisi'},
    {field: 'warna_kendaraan', name: 'Warna Kendaraan'},
    {field: 'no_chasis', name: 'Nomor Chasis'},
    {field: 'no_engine', name: 'Nomor Engine'},
    {field: 'tanggal_pajak', name: 'Tanggal Pajak'},
  ];

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

  const [showDateBirth, setShowDateBirth] = useState(false);
  const [birthValue, setBirthValue] = useState(new Date());
  const [dateBirth, setDateBirth] = useState({
    value: new Date(),
    visible: false,
  });
  function handleDateBirth(event, selectedDate) {
    if (event.type == 'set') {
      setDateBirth({visible: false, value: selectedDate});
      const [y, m, d] = selectedDate.toISOString().slice(0, 10).split('-');
      setFormData({...formData, tanggal_lahir: `${y}-${m}-${d}`});
    } else setDateBirth({...dateBirth, visible: false});
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
    } else setDateTax({...dateTax, visible: false});
  }

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Register" onPress={() => navigation.goBack()} />
        {ready && (
          <View style={styles.container}>
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
              const date = i == 7 || i == 31;
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
              onPress={() => dispatch(fetchSignUp({formData, navigation}))}
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
    padding: 10,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
