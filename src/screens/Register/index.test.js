import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useMemo, useEffect, useContext} from 'react';
import {CustomTextInput} from '../../components/CustomTextInput';
import {fonts, images} from '../../assets';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {Header} from '../../components/Header';
import {ButtonCustom} from '../../components';
import CarPantherMania from '../../components/CarPantherMania';
import {colors, jsonParse, wait} from '../../utils';
import {SignUpApi} from '../../services/SignUpConsume';
import jsonStringify from '../../utils/jsonStringify';
import {Formik} from 'formik';
import {registerValidation} from './registerValidation';
import CustomModal from '../../components/CustomModal';
import CustomCheckBox from '../../components/CustomCheckBox';
import Geolocation from 'react-native-geolocation-service';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import {GlobalContext} from '../../Store/globalContext';
import TextArea from '../../components/TextArea';
import {
  navigate,
  navigateAndSimpleReset,
  navigateGoBack,
} from '../../utils/navigators';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TwoButtonChoose from '../../components/TwoButtonChoose';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rfidPostConsume} from '../../services/RfidConsume';

const Awawawawa = () => {
  const date = new Date(Date.now());
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  const [rfid, setRfid] = useState('');
  const [openModalDate, setOpenModalDate] = useState(false);
  const [isVisibleModalCheckBox, setIsVisibleModalCheckBox] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [valueCheckBox, setValueCheckBox] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isVisiblePasswordKonfirmasi, setIsVisiblePasswordKonfirmasi] =
    useState(true);
  const [region, setRegion] = useState({
    latitude: -6.175063553572429,
    longitude: 106.82712092414114,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [chooseType, setChooseType] = useState('');
  const [isVisibleModalChooseBox, setIsVisibleModalChooseBox] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isResultPickFotoProfile, setIsResultPickFotoProfile] = useState({
    uri: '',
    name: '',
    type: '',
  });
  const [isResultPickFotoKtp, setIsResultPickFotoKtp] = useState({
    uri: '',
    name: '',
    type: '',
  });
  const [isResultPickFotoBuktiTransfer, setIsResultPickFotoBuktiTransfer] =
    useState({
      uri: '',
      name: '',
      type: '',
    });
  const [isResultPickFotoSim, setIsResultPickFotoSim] = useState({
    uri: '',
    name: '',
    type: '',
  });
  const [isResultPickFotoStnk, setIsResultPickFotoStnk] = useState({
    uri: '',
    name: '',
    type: '',
  });

  const handlePickFotoProfile = async type => {
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
        presentationStyle: 'fullScreen',
      };

      let result;

      if (type === 'Kamera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) {
        console.log('Pengambilan gambar foto profile di batalkan');
      } else if (result.errorCode) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(result.errorMessage);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      } else {
        console.log(`RESULT PICK FOTO PROFILE ${jsonStringify(result)}`);
        setIsResultPickFotoProfile({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type,
        });
      }
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsVisibleModalChooseBox(false);
  };

  const handlePickFotoKtp = async type => {
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
        presentationStyle: 'fullScreen',
      };

      let result;

      if (type === 'Kamera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) {
        console.log('Pengambilan gambar foto profile di batalkan');
      } else if (result.errorCode) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(result.errorMessage);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      } else {
        console.log(`RESULT PICK FOTO PROFILE ${jsonStringify(result)}`);
        setIsResultPickFotoKtp({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type,
        });
      }
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsVisibleModalChooseBox(false);
  };

  const handlePickFotoBuktiTransfer = async type => {
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
        presentationStyle: 'fullScreen',
      };

      let result;

      if (type === 'Kamera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) {
        console.log('Pengambilan gambar foto profile di batalkan');
      } else if (result.errorCode) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(result.errorMessage);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      } else {
        console.log(`RESULT PICK FOTO PROFILE ${jsonStringify(result)}`);
        setIsResultPickFotoBuktiTransfer({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type,
        });
      }
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsVisibleModalChooseBox(false);
  };

  const handlePickFotoSim = async type => {
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
        presentationStyle: 'fullScreen',
      };

      let result;

      if (type === 'Kamera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) {
        console.log('Pengambilan gambar foto profile di batalkan');
      } else if (result.errorCode) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(result.errorMessage);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      } else {
        console.log(`RESULT PICK FOTO PROFILE ${jsonStringify(result)}`);
        setIsResultPickFotoSim({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type,
        });
      }
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsVisibleModalChooseBox(false);
  };

  const handlePickFotoStnk = async type => {
    try {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
        presentationStyle: 'fullScreen',
      };

      let result;

      if (type === 'Kamera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) {
        console.log('Pengambilan gambar foto profile di batalkan');
      } else if (result.errorCode) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(result.errorMessage);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      } else {
        console.log(`RESULT PICK FOTO PROFILE ${jsonStringify(result)}`);
        setIsResultPickFotoStnk({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type,
        });
      }

      // setIsResultPickFotoProfile(dataResult);
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsVisibleModalChooseBox(false);
  };

  // Pop Up Message
  const renderPopUpMessage = () => {
    return (
      <AlertMessage
        styleTitleContent={{
          textShadowColor: colors.black,
          textShadowOffset: {
            width: 2,
            height: 5,
          },
          textShadowRadius: 18,
        }}
        type={isModalMessage ? 'success' : 'failed'}
        titleContent={isMessage}
        visible={isVisibleModalMessage}
        dismissable={false}
        enableClose={false}
        enableSubmit={false}
      />
    );
  };

  let initialData = {
    dateActive: '',
    namaLengkap: '',
    email: '',
    password: '',
    passwordKonfirmasi: '',
    jenisKelamin: '',
    ukuranBaju: '',
    tempatLahir: '',
    tanggalLahir: '',
    agama: '',
    statusMenikah: '',
    jenisKelamin: '',
    alamatLengkap: '',
    kecamatan: '',
    kelurahan: '',
    kabupatenKota: '',
    provinsi: '',
    noTelp: '',
    noSim: '',
    noKtp: '',
    noWa: '',
    kontakDarurat: '',
    pekerjaan: '',
    namaPerusahaan: '',
    alamatPerusahaan: '',
    typeKendaraan: '',
    tahunKendaraan: '',
    noPolisi: '',
    warnaKendaraan: '',
    noChasis: '',
    noEngine: '',
    tanggalPajak: '',
  };

  useEffect(() => {}, [
    valueCheckBox,
    typeModal,
    isVisibleModalCheckBox,
    chooseType,
  ]);

  const handleGetPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };
        setRegion(initialPosition);
      },
      error => {
        console.log('ERROR GEOLOCATION : ' + error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    const getId = async () => {
      const id = await AsyncStorage.getItem('rfid');
      console.log(`ID RFID ${id}`);

      if (id !== null || id !== undefined) {
        setRfid(id);
      } else {
        setRfid('');
      }
    };

    getId();
  }, []);

  console.log(initialData.tanggalLahir);

  useEffect(() => {
    handleGetPosition();
  }, []);

  const handleOpenModal = type => {
    setTypeModal(type);
    setIsVisibleModalCheckBox(true);
  };

  const renderCheckBoxChooseJenisKelamin = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: HEIGHT * 0.01,
        }}>
        <CustomCheckBox
          onPress={() => setValueCheckBox('Laki - Laki')}
          status={valueCheckBox === 'Laki - Laki'}
          text="Laki - Laki"
        />
        <CustomCheckBox
          onPress={() => setValueCheckBox('Perempuan')}
          status={valueCheckBox === 'Perempuan'}
          text="Perempuan"
        />
      </View>
    );
  };

  const renderCheckBoxChooseUkuranBaju = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: HEIGHT * 0.01,
        }}>
        <CustomCheckBox
          onPress={() => setValueCheckBox('S')}
          status={valueCheckBox === 'S'}
          text="S"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('M')}
          status={valueCheckBox === 'M'}
          text="M"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('L')}
          status={valueCheckBox === 'L'}
          text="L"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('XL')}
          status={valueCheckBox === 'XL'}
          text="XL"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('XXL')}
          status={valueCheckBox === 'XXL'}
          text="XXL"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('XXXL')}
          status={valueCheckBox === 'XXXL'}
          text="XXXL"
        />
      </View>
    );
  };

  const renderCheckBoxChooseAgama = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: HEIGHT * 0.01,
        }}>
        <CustomCheckBox
          onPress={() => setValueCheckBox('ISLAM')}
          status={valueCheckBox === 'ISLAM'}
          text="ISLAM"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('KRISTEN')}
          status={valueCheckBox === 'KRISTEN'}
          text="KRISTEN"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('KATOLIK')}
          status={valueCheckBox === 'KATOLIK'}
          text="KATOLIK"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('HINDU')}
          status={valueCheckBox === 'HINDU'}
          text="HINDU"
        />

        <CustomCheckBox
          onPress={() => setValueCheckBox('BUDHA')}
          status={valueCheckBox === 'BUDHA'}
          text="BUDHA"
        />
      </View>
    );
  };

  const renderCheckBoxChooseStatus = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: HEIGHT * 0.01,
        }}>
        <CustomCheckBox
          onPress={() => setValueCheckBox('Lajang')}
          status={valueCheckBox === 'Lajang'}
          text="Lajang"
        />
        <CustomCheckBox
          onPress={() => setValueCheckBox('Duda')}
          status={valueCheckBox === 'Duda'}
          text="Duda"
        />
        <CustomCheckBox
          onPress={() => setValueCheckBox('Janda')}
          status={valueCheckBox === 'Janda'}
          text="Janda"
        />
        <CustomCheckBox
          onPress={() => setValueCheckBox('Menikah')}
          status={valueCheckBox === 'Menikah'}
          text="Menikah"
        />
      </View>
    );
  };

  const renderModalChooseButton = () => {
    const kamera = 'Kamera';
    const galeri = 'Galeri';
    return (
      //   <CustomModal
      //   visible={isVisibleModalChooseBox}
      //   styleModal={{backgroundColor: colors.black03}}>

      // </CustomModal>
      <TwoButtonChoose
        visible={isVisibleModalChooseBox}
        onDismiss={() => handleCloseChooseButton()}
        textOne="Via kamera"
        pressButtonOne={() =>
          chooseType === 'profile'
            ? handlePickFotoProfile(kamera)
            : chooseType === 'ktp'
            ? handlePickFotoKtp(kamera)
            : chooseType === 'buktitf'
            ? handlePickFotoBuktiTransfer(kamera)
            : chooseType === 'sim'
            ? handlePickFotoSim(kamera)
            : chooseType === 'stnk' && handlePickFotoStnk(kamera)
        }
        textTwo="Via galeri"
        pressButtonTwo={() =>
          chooseType === 'profile'
            ? handlePickFotoProfile(galeri)
            : chooseType === 'ktp'
            ? handlePickFotoKtp(galeri)
            : chooseType === 'buktitf'
            ? handlePickFotoBuktiTransfer(galeri)
            : chooseType === 'sim'
            ? handlePickFotoSim(galeri)
            : chooseType === 'stnk' && handlePickFotoStnk(galeri)
        }
      />
    );
  };

  const handleOpenChooseButton = type => {
    setChooseType(type);
    setIsVisibleModalChooseBox(true);
  };

  const handleCloseChooseButton = () => {
    setChooseType('');
    setIsVisibleModalChooseBox(false);
  };

  const renderModalCheckBox = setFieldValue => {
    return (
      <CustomModal
        visible={isVisibleModalCheckBox}
        styleModal={{backgroundColor: colors.black03}}>
        <View
          style={{
            position: 'absolute',
            top: HEIGHT * 0.37,
            left: WIDTH * 0.05,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.white,
            height: HEIGHT * 0.2,
            width: WIDTH * 0.9,
            alignSelf: 'center',
            borderRadius: HEIGHT * 0.01,
          }}>
          {typeModal === 'ACTION_JENIS_KELAMIN' &&
            renderCheckBoxChooseJenisKelamin()}
          {typeModal === 'ACTION_UKURAN_BAJU' &&
            renderCheckBoxChooseUkuranBaju()}
          {typeModal === 'ACTION_AGAMA' && renderCheckBoxChooseAgama()}
          {typeModal === 'ACTION_STATUS_MENIKAH' &&
            renderCheckBoxChooseStatus()}
          <Pressable
            onPress={() => {
              typeModal === 'ACTION_JENIS_KELAMIN' &&
                setFieldValue('jenisKelamin', valueCheckBox);
              typeModal === 'ACTION_UKURAN_BAJU' &&
                setFieldValue('ukuranBaju', valueCheckBox);
              typeModal === 'ACTION_AGAMA' &&
                setFieldValue('agama', valueCheckBox);
              typeModal === 'ACTION_STATUS_MENIKAH' &&
                setFieldValue('statusMenikah', valueCheckBox);
              setIsVisibleModalCheckBox(false);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: HEIGHT * 0.01,
              width: WIDTH * 0.5,
              height: HEIGHT * 0.06,
              marginTop: HEIGHT * 0.05,
            }}>
            <Text
              style={{
                fontSize: HEIGHT * 0.02,
                fontFamily: fonts.BebasNeueRegular,
                color: colors.white,
              }}>
              Simpan
            </Text>
          </Pressable>
        </View>
      </CustomModal>
    );
  };

  const SignUpConsume = async (values, resetForm) => {
    // setIsLoader(true);
    try {
      const formData = new FormData();

      const noTelp = values.noTelp.replace(values.noTelp[0], '62');
      const noWa = values.noWa.replace(values.noWa[0], '62');
      // console.log(`NO TELP ${noTelp}`);
      // console.log(`NO WA ${noWa}`);

      formData.append('nama_lengkap', values.namaLengkap);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('password_confirmation', values.passwordKonfirmasi);
      formData.append('jenis_kelamin', values.jenisKelamin);
      formData.append('ukuran_baju', values.ukuranBaju);
      formData.append('tempat_lahir', values.tempatLahir);
      formData.append('tanggal_lahir', values.tanggalLahir);
      formData.append('agama', values.agama);
      formData.append('status_menikah', values.statusMenikah);
      formData.append('alamat_lengkap', values.alamatLengkap);
      formData.append('kelurahan', values.kelurahan);
      formData.append('kecamatan', values.kecamatan);
      formData.append('provinsi', values.provinsi);
      formData.append('kabupaten_kota', values.kabupatenKota);
      formData.append('no_telp', noTelp);
      formData.append('no_whatsapp', noWa);
      formData.append('kontak_darurat', values.kontakDarurat);
      formData.append('pekerjaan', values.pekerjaan);
      formData.append('nama_perusahaan', values.namaPerusahaan);
      formData.append('alamat_perusahaan', values.alamatPerusahaan);
      formData.append('no_sim', values.noSim);
      formData.append('no_ktp', values.noKtp);
      formData.append('type_kendaraan', values.typeKendaraan);
      formData.append('tahun_kendaraan', values.tahunKendaraan);
      formData.append('no_polisi', values.noPolisi);
      formData.append('warna_kendaraan', values.warnaKendaraan);
      formData.append('no_chasis', values.noChasis);
      formData.append('no_engine', values.noEngine);
      formData.append('tanggal_pajak', values.tanggalPajak);
      formData.append('lat', region.latitude);
      formData.append('lng', region.longitude);
      formData.append('photos_members', isResultPickFotoProfile);
      formData.append('photos_ktp', isResultPickFotoKtp);
      formData.append('photos_bukti_tranfer', isResultPickFotoBuktiTransfer);
      formData.append('photos_sim', isResultPickFotoSim);
      formData.append('photos_stnk', isResultPickFotoStnk);

      console.log('THE formdata', formData);

      // const response = await SignUpApi(formData);
      // console.log(`API REGISTER ${jsonStringify(response)}`);
      // const {data} = response;
      // if (data !== 'User Berhasil Registrasi') {
      //   // this code show pop up when data from API not success
      //   setIsLoader(false);
      //   setIsVisibleModalMessage(true);
      //   setIsModalMessage(false);
      //   setIsMessage(`Registrasi gagal, silahkan coba lagi`);
      //   wait(5000).then(() => {
      //     setIsVisibleModalMessage(false);
      //   });
      //   return response;
      // }

      // // reset all value form when API success
      // resetForm();
      // setIsResultPickFotoBuktiTransfer({
      //   name: '',
      //   type: '',
      //   uri: '',
      // });

      // setIsResultPickFotoKtp({
      //   name: '',
      //   type: '',
      //   uri: '',
      // });

      // setIsResultPickFotoProfile({
      //   name: '',
      //   type: '',
      //   uri: '',
      // });

      // setIsResultPickFotoSim({
      //   name: '',
      //   type: '',
      //   uri: '',
      // });

      // setIsResultPickFotoStnk({
      //   name: '',
      //   type: '',
      //   uri: '',
      // });

      // TEMPRORY CODE
      // const config = {
      //   rfid: rfid,
      //   email: values.email,
      //   password: values.password,
      // };
      // const responseRFID = await rfidPostConsume(config);
      // const {status} = responseRFID;
      // console.log('====================================');
      // console.log(jsonStringify(responseRFID));
      // console.log('====================================');

      // if (status === 'success') {
      //   // AsyncStorage.setItem('email', values.email)
      //   // AsyncStorage.setItem('password', values.password)

      //   // this code show pop up when data from API success
      //   setIsVisibleModalMessage(true);
      //   setIsModalMessage(true);
      //   setIsMessage(
      //     'Registrasi berhasil, anda akan dialihkan ke halaman login',
      //   );

      //   wait(5000).then(() => {
      //     setIsVisibleModalMessage(false);
      //     navigate('Login');
      //   });
      // } else {
      //   // this code show pop up when data from API not success
      //   setIsLoader(false);
      //   setIsVisibleModalMessage(true);
      //   setIsModalMessage(false);
      //   setIsMessage(`Registrasi gagal, silahkan coba lagi`);
      //   wait(5000).then(() => {
      //     setIsVisibleModalMessage(false);
      //   });
      // }
      // ---------
    } catch (error) {
      console.log('THE error', error.message);
      // this code show pop up when process consume API failed
      // setIsVisibleModalMessage(true);
      // setIsModalMessage(false);
      // setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      // wait(5000).then(() => {
      //   setIsVisibleModalMessage(false);
      // });
    }
    // setIsLoader(false);
  };

  const renderViewHeader = () => {
    return <Header BackPress={() => navigateGoBack()} />;
  };

  const memoVisiblePassword = useMemo(() => {
    if (isVisiblePassword) {
      return true;
    } else {
      return false;
    }
  }, [isVisiblePassword]);

  const memoVisiblePasswordKonfirmasi = useMemo(() => {
    if (isVisiblePasswordKonfirmasi) {
      return true;
    } else {
      return false;
    }
  }, [isVisiblePasswordKonfirmasi]);

  const renderViewTextInput = () => {
    // const rfid = AsyncStorage.getItem('rfid')
    return (
      <Formik
        validationSchema={registerValidation}
        initialValues={initialData}
        onSubmit={(values, {resetForm}) => {
          SignUpConsume(values, resetForm);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
          values,
          errors,
        }) => (
          <View>
            <Pressable
              onPress={() => handleOpenChooseButton('profile')}
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  isResultPickFotoProfile.uri !== ''
                    ? {uri: isResultPickFotoProfile.uri}
                    : images.imagecontentdefault
                }
              />

              {isResultPickFotoProfile.uri === '' ? (
                <Text
                  style={{
                    color: colors.darkGreyBlue,
                    elevation: 3,
                    position: 'absolute',
                    top: HEIGHT * 0.12,
                    left: WIDTH * 0.1,
                    textAlign: 'center',
                    fontSize: HEIGHT * 0.04,
                    fontFamily: fonts.BebasNeueRegular,
                  }}>
                  Upload Foto Profile
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => handleOpenChooseButton('buktitf')}
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  isResultPickFotoBuktiTransfer.uri !== ''
                    ? {uri: isResultPickFotoBuktiTransfer.uri}
                    : images.imagecontentdefault
                }
              />

              {isResultPickFotoBuktiTransfer.uri === '' ? (
                <Text
                  style={{
                    color: colors.darkGreyBlue,
                    elevation: 3,
                    position: 'absolute',
                    top: HEIGHT * 0.11,
                    left: WIDTH * 0.05,
                    width: WIDTH * 0.7,
                    textAlign: 'center',
                    fontSize: HEIGHT * 0.04,
                    fontFamily: fonts.BebasNeueRegular,
                  }}>
                  Upload Foto Bukti Transfer
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => handleOpenChooseButton('ktp')}
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  isResultPickFotoKtp.uri !== ''
                    ? {uri: isResultPickFotoKtp.uri}
                    : images.imagecontentdefault
                }
              />

              {isResultPickFotoKtp.uri === '' ? (
                <Text
                  style={{
                    color: colors.darkGreyBlue,
                    elevation: 3,
                    position: 'absolute',
                    top: HEIGHT * 0.12,
                    left: WIDTH * 0.16,
                    textAlign: 'center',
                    fontSize: HEIGHT * 0.04,
                    fontFamily: fonts.BebasNeueRegular,
                  }}>
                  Upload Foto KTP
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => handleOpenChooseButton('sim')}
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  isResultPickFotoSim.uri !== ''
                    ? {uri: isResultPickFotoSim.uri}
                    : images.imagecontentdefault
                }
              />

              {isResultPickFotoSim.uri === '' ? (
                <Text
                  style={{
                    color: colors.darkGreyBlue,
                    elevation: 3,
                    position: 'absolute',
                    top: HEIGHT * 0.12,
                    left: WIDTH * 0.16,
                    textAlign: 'center',
                    fontSize: HEIGHT * 0.04,
                    fontFamily: fonts.BebasNeueRegular,
                  }}>
                  Upload Foto Sim
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => handleOpenChooseButton('stnk')}
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  isResultPickFotoStnk.uri !== ''
                    ? {uri: isResultPickFotoStnk.uri}
                    : images.imagecontentdefault
                }
              />

              {isResultPickFotoStnk.uri === '' ? (
                <Text
                  style={{
                    color: colors.darkGreyBlue,
                    elevation: 3,
                    position: 'absolute',
                    top: HEIGHT * 0.12,
                    left: WIDTH * 0.14,
                    textAlign: 'center',
                    fontSize: HEIGHT * 0.04,
                    fontFamily: fonts.BebasNeueRegular,
                  }}>
                  Upload Foto Stnk
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() =>
                navigate('QrScanner', {
                  fromScreen: 'Register',
                })
              }
              style={{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014,
              }}>
              <Image
                style={{
                  width: WIDTH * 0.8,
                  height: HEIGHT * 0.3,
                  borderRadius: HEIGHT * 0.03,
                }}
                source={
                  rfid !== '' ? images.imageblank : images.imagecontentdefault
                }
              />

              <Text
                style={{
                  color: colors.darkGreyBlue,
                  elevation: 3,
                  position: 'absolute',
                  top: HEIGHT * 0.12,
                  left: WIDTH * 0.21,
                  textAlign: 'center',
                  fontSize: HEIGHT * 0.04,
                  fontFamily: fonts.BebasNeueRegular,
                }}>
                {rfid !== '' ? rfid : 'Scan ID Anda'}
              </Text>
            </Pressable>

            {/* <Pressable
              onPress={() => navigateAndSimpleReset('QrScanner', {
                fromScreen: 'Register'
              })}
              style={[{
                borderRadius: HEIGHT * 0.03,
                alignSelf: 'center',
                marginVertical: HEIGHT * 0.014
              }, rfid !== '' ? { backgroundColor: colors.white } : null]}>
                {rfid === '' && (
                               <Image
                               style={{
                                 width: WIDTH * 0.8,
                                 height: HEIGHT * 0.3,
                                 borderRadius: HEIGHT * 0.03,
                               }}
                               source={images.imagecontentdefault}
                             />
                )}

                      <Text
                      style={{
                        color: colors.darkGreyBlue,
                        elevation: 3,
                        position: 'absolute',
                        top: HEIGHT * 0.12,
                        left: WIDTH * 0.14,
                        textAlign: 'center',
                        fontSize: HEIGHT * 0.04,
                        fontFamily: fonts.BebasNeueRegular,
                      }}>
                        {rfid !== '' ? rfid : "Scan ID Anda"}
                    </Text>
            </Pressable> */}

            <CustomTextInput
              nameIconLeft="nama lengkap"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nama Lengkap"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('namaLengkap')}
              value={values.namaLengkap}
              onChangeText={handleChange('namaLengkap')}
              // enableError={errors.namaLengkap ? true : false}
              // textError={errors.namaLengkap}
            />

            <CustomTextInput
              nameIconLeft="email"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Email"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              // enableError={errors.email ? true : false}
              // textError={errors.email}
            />

            <CustomTextInput
              nameIconLeft="password"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Password"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => setIsVisiblePassword(!isVisiblePassword)}
              iconNameRight={isVisiblePassword ? 'eye-off' : 'eye'}
              iconColorRight={colors.white}
              secureTextEntry={memoVisiblePassword}
              onBlur={handleBlur('passwored')}
              value={values.password}
              onChangeText={handleChange('password')}
              // enableError={errors.password ? true : false}
              // textError={errors.password}
            />

            <CustomTextInput
              nameIconLeft="password"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Konfirmasi Password"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              secureTextEntry={memoVisiblePasswordKonfirmasi}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() =>
                setIsVisiblePasswordKonfirmasi(!isVisiblePasswordKonfirmasi)
              }
              iconNameRight={isVisiblePasswordKonfirmasi ? 'eye-off' : 'eye'}
              iconColorRight={colors.white}
              value={values.passwordKonfirmasi}
              onChangeText={handleChange('passwordKonfirmasi')}
              // enableError={errors.passwordKonfirmasi ? true : false}
              // textError={errors.passwordKonfirmasi}
            />

            <CustomTextInput
              nameIconLeft="jenis kelamin"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Jenis Kelamin"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              value={values.jenisKelamin}
              editable={false}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => handleOpenModal('ACTION_JENIS_KELAMIN')}
              iconNameRight={
                values.jenisKelamin === '' ? 'arrow-down-drop-circle' : 'cached'
              }
              iconColorRight={colors.white}
            />

            <CustomTextInput
              nameIconLeft="baju"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Ukuran Baju"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('ukuranBaju')}
              value={values.ukuranBaju}
              // enableError={errors.ukuranBaju ? true : false}
              // textError={errors.ukuranBaju}
              editable={false}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => handleOpenModal('ACTION_UKURAN_BAJU')}
              iconNameRight={
                values.ukuranBaju === '' ? 'arrow-down-drop-circle' : 'cached'
              }
              iconColorRight={colors.white}
            />

            <CustomTextInput
              nameIconLeft="tempat lahir"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Tempat Lahir"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('tempatLahir')}
              value={values.tempatLahir}
              onChangeText={handleChange('tempatLahir')}
              // enableError={errors.tempatLahir ? true : false}
              // textError={errors.tempatLahir}
            />

            <CustomTextInput
              nameIconLeft="tanggal lahir"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Tanggal Lahir"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('tanggalLahir')}
              editable={false}
              value={values.tanggalLahir}
              // enableError={errors.tanggalLahir ? true : false}
              // textError={errors.tanggalLahir}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => {
                setFieldValue('dateActive', 'tanggalLahir');
                setOpenModalDate(true);
              }}
              iconNameRight={
                values.tanggalLahir === '' ? 'arrow-down-drop-circle' : 'cached'
              }
              iconColorRight={colors.white}
            />

            <CustomTextInput
              nameIconLeft="agama"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Agama"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('agama')}
              value={values.agama}
              // enableError={errors.agama ? true : false}
              // textError={errors.agama}
              editable={false}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => handleOpenModal('ACTION_AGAMA')}
              iconNameRight={
                values.agama === '' ? 'arrow-down-drop-circle' : 'cached'
              }
              iconColorRight={colors.white}
            />

            <CustomTextInput
              nameIconLeft="status menikah"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Status Menikah"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('statusMenikah')}
              value={values.statusMenikah}
              // enableError={errors.statusMenikah ? true : false}
              // textError={errors.statusMenikah}
              editable={false}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => handleOpenModal('ACTION_STATUS_MENIKAH')}
              iconNameRight={
                values.statusMenikah === ''
                  ? 'arrow-down-drop-circle'
                  : 'cached'
              }
              iconColorRight={colors.white}
            />

            <TextArea
              onChangeText={handleChange('alamatLengkap')}
              placeholder="Alamat Lengkap"
              placeholderTextColor={colors.aluminium}
              // enableError={errors.alamatLengkap ? true : false}
              // textError={errors.alamatLengkap}
              onBlur={handleBlur('alamatLengkap')}
              value={values.alamatLengkap}
            />

            <CustomTextInput
              nameIconLeft="kelurahan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Kelurahan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('kelurahan')}
              value={values.kelurahan}
              onChangeText={handleChange('kelurahan')}
              // enableError={errors.kelurahan ? true : false}
              // textError={errors.kelurahan}
            />

            <CustomTextInput
              nameIconLeft="kecamatan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Kecamatan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('kecamatan')}
              value={values.kecamatan}
              onChangeText={handleChange('kecamatan')}
              // enableError={errors.kecamatan ? true : false}
              // textError={errors.kecamatan}
            />

            <CustomTextInput
              nameIconLeft="provinsi"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Provinsi"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('provinsi')}
              value={values.provinsi}
              onChangeText={handleChange('provinsi')}
              // enableError={errors.provinsi ? true : false}
              // textError={errors.provinsi}
            />

            <CustomTextInput
              nameIconLeft="kabupaten"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Kabupaten"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('kabupatenKota')}
              value={values.kabupatenKota}
              onChangeText={handleChange('kabupatenKota')}
              // enableError={errors.kabupatenKota ? true : false}
              // textError={errors.kabupatenKota}
            />

            <CustomTextInput
              nameIconLeft="nama perusahaan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nama Perusahaan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('namaPerusahaan')}
              value={values.namaPerusahaan}
              onChangeText={handleChange('namaPerusahaan')}
              // enableError={errors.namaPerusahaan ? true : false}
              // textError={errors.namaPerusahaan}
            />

            <CustomTextInput
              nameIconLeft="alamat perusahaan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Alamat Perusahaan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('alamatPerusahaan')}
              value={values.alamatPerusahaan}
              onChangeText={handleChange('alamatPerusahaan')}
              // enableError={errors.alamatPerusahaan ? true : false}
              // textError={errors.alamatPerusahaan}
            />

            <CustomTextInput
              nameIconLeft="kontak darurat"
              keyboardType="numeric"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Kontak Darurat"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('kontakDarurat')}
              value={values.kontakDarurat}
              onChangeText={handleChange('kontakDarurat')}
              // enableError={errors.kontakDarurat ? true : false}
              // textError={errors.kontakDarurat}
            />

            <CustomTextInput
              nameIconLeft="nomor telepon"
              keyboardType="numeric"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nomor Telepon"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('noTelp')}
              value={values.noTelp}
              onChangeText={handleChange('noTelp')}
              // enableError={errors.noTelp ? true : false}
              // textError={errors.noTelp}
            />

            <CustomTextInput
              nameIconLeft="nomor wa"
              keyboardType="numeric"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nomor Whatsapp"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('noWa')}
              value={values.noWa}
              onChangeText={handleChange('noWa')}
              // enableError={errors.noWa ? true : false}
              // textError={errors.noWa}
            />

            <CustomTextInput
              nameIconLeft="pekerjaan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Pekerjaan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('pekerjaan')}
              value={values.pekerjaan}
              onChangeText={handleChange('pekerjaan')}
              // enableError={errors.pekerjaan ? true : false}
              // textError={errors.pekerjaan}
            />

            <CustomTextInput
              nameIconLeft="tipe kendaraan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Tipe Kendaraan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('typeKendaraan')}
              value={values.typeKendaraan}
              onChangeText={handleChange('typeKendaraan')}
              // enableError={errors.typeKendaraan ? true : false}
              // textError={errors.typeKendaraan}
            />

            <CustomTextInput
              nameIconLeft="tahun kendaraan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Tahun Kendaraan"
              keyboardType="numeric"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('tahunKendaraan')}
              value={values.tahunKendaraan}
              // enableError={errors.tahunKendaraan ? true : false}
              // textError={errors.tahunKendaraan}
              onChangeText={handleChange('tahunKendaraan')}
            />

            <CustomTextInput
              nameIconLeft="nomor ktp"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="No KTP"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              keyboardType="numeric"
              onBlur={handleBlur('noKtp')}
              value={values.noKtp}
              onChangeText={handleChange('noKtp')}
              // enableError={errors.noKtp ? true : false}
              // textError={errors.noKtp}
            />

            <CustomTextInput
              nameIconLeft="nomor sim"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="No SIM"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              keyboardType="numeric"
              onBlur={handleBlur('noSim')}
              value={values.noSim}
              onChangeText={handleChange('noSim')}
              // enableError={errors.noSim ? true : false}
              // textError={errors.noSim}
            />

            <CustomTextInput
              nameIconLeft="nomor polisi"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nomor Polisi"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('noPolisi')}
              value={values.noPolisi}
              onChangeText={handleChange('noPolisi')}
              // enableError={errors.noPolisi ? true : false}
              // textError={errors.noPolisi}
            />

            <CustomTextInput
              nameIconLeft="warna kendaraan"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Warna Kendaraan"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('warnaKendaraan')}
              value={values.warnaKendaraan}
              onChangeText={handleChange('warnaKendaraan')}
              // enableError={errors.warnaKendaraan ? true : false}
              // textError={errors.warnaKendaraan}
            />

            <CustomTextInput
              nameIconLeft="nomor chasis"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nomor Chasis"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('noChasis')}
              value={values.noChasis}
              onChangeText={handleChange('noChasis')}
              // enableError={errors.noChasis ? true : false}
              // textError={errors.noChasis}
            />

            <CustomTextInput
              nameIconLeft="nomor enginee"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Nomor Mesin"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('noEngine')}
              value={values.noEngine}
              onChangeText={handleChange('noEngine')}
              // enableError={errors.noEngine ? true : false}
              // textError={errors.noEngine}
            />

            <CustomTextInput
              nameIconLeft="tanggal pajak"
              colorIconLeft={colors.white}
              sizeIconLeft={HEIGHT * 0.03}
              placeholder="Tanggal Pajak"
              placeholderTextColor={colors.aluminium}
              styleWrapperIconLeftTextIconRight={styles.styleTextInput}
              onBlur={handleBlur('tanggalPajak')}
              value={values.tanggalPajak}
              // enableError={errors.tanggalPajak ? true : false}
              // textError={errors.tanggalPajak}
              editable={false}
              buttonRightEnable={true}
              colorButtonRightPress={colors.darkGreyBlue}
              buttonRightPress={() => {
                setFieldValue('dateActive', 'tanggalPajak');
                setOpenModalDate(true);
              }}
              iconNameRight={
                values.tanggalPajak === '' ? 'arrow-down-drop-circle' : 'cached'
              }
              iconColorRight={colors.white}
            />

            <ButtonCustom
              // color={isValid ? colors.elephant : colors.gray}
              title="Register"
              buttonStyle={styles.styleButtonLogin}
              textStyle={styles.styleTextButtonLogin}
              // disabled={!isValid}
              onPress={handleSubmit}
            />

            <DatePicker
              modal
              open={openModalDate}
              date={date}
              mode="date"
              title={
                values.dateActive === 'tanggalLahir'
                  ? 'Tanggal Lahir'
                  : values.dateActive === 'tanggalPajak' && 'Tanggal Pajak'
              }
              onConfirm={date => {
                setOpenModalDate(false);
                const formatDate = moment(date).format('YYYY-MM-DD');
                if (values.dateActive === 'tanggalLahir') {
                  setFieldValue('tanggalLahir', formatDate);
                } else if (values.dateActive === 'tanggalPajak') {
                  setFieldValue('tanggalPajak', formatDate);
                }
              }}
              onCancel={() => {
                setOpenModalDate(false);
              }}
              confirmText="Simpan"
              cancelText="Batal"
            />
            {/* <CustomModal
              visible={openModalDate}
              transparent={true}
              styleModal={{
                flex: 1,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: colors.black03,
                  flex: 1,
                }}>
                <Calendar
                  enableSwipeMonths
                  current={date}
                  markedDates={{
                    [values.dateActive === 'tanggalLahir'
                      ? values.tanggalLahir
                      : values.dateActive === 'tanggalPajak'
                      ? values.tanggalPajak
                      : values.dateActive === 'tahunKendaraan'
                      ? values.tahunKendaraan
                      : values.dateActive]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: colors.green,
                      selectedTextColor: colors.white,
                    },
                  }}
                  onDayPress={day => {
                    let dates;
                    if (values.dateActive === 'tanggalLahir') {
                      dates = 'tanggalLahir';
                    } else if (values.dateActive === 'tanggalPajak') {
                      dates = 'tanggalPajak';
                    } else if (values.dateActive === 'tahunKendaraan') {
                      dates = 'tahunKendaraan';
                    }
                    console.log(dates);
                    setFieldValue(dates, day.dateString);
                  }}
                  theme={{
                    'stylesheet.calendar.header': {
                      dayTextAtIndex0: {
                        color: 'red',
                      },
                      dayTextAtIndex6: {
                        color: 'blue',
                      },
                    },
                  }}
                />
                <ButtonCustom
                  color={colors.elephant}
                  buttonStyle={{
                    marginTop: HEIGHT * 0.03,
                    width: WIDTH * 0.6,
                    height: HEIGHT * 0.06,
                    alignSelf: 'center',
                    borderTopLeftRadius: WIDTH * 0.02,
                    borderTopRightRadius: WIDTH * 0.02,
                    borderBottomLeftRadius: WIDTH * 0.02,
                    borderBottomRightRadius: WIDTH * 0.02,
                  }}
                  onPress={() => setOpenModalDate(false)}
                  title="Simpan"
                />
              </View>
            </CustomModal> */}
            {renderModalCheckBox(setFieldValue)}
          </View>
        )}
      </Formik>
    );
  };

  const renderLoader = () => {
    return <Loader isVisible={isLoader} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.emptybackground} style={styles.container}>
        {renderViewHeader()}
        <ScrollView>
          <CarPantherMania
            styleWrapperLogoPantherAndCar={{
              marginBottom: HEIGHT * 0.05,
              marginTop: 0,
            }}
          />
          <View style={styles.wrapperFormRegister}>
            {renderViewTextInput()}
          </View>
        </ScrollView>
        {renderPopUpMessage()}
        {renderLoader()}
        {renderModalChooseButton()}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoimagepanther: {
    alignSelf: 'center',
    marginTop: HEIGHT * 0.1,
  },
  wrapperFormRegister: {
    marginVertical: HEIGHT * 0.001,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTextInput: {
    borderColor: colors.hippieBlue,
    borderWidth: 1,
  },
  styleButtonLogin: {
    marginVertical: HEIGHT * 0.03,
    width: WIDTH * 0.7,
    height: HEIGHT * 0.07,
    alignSelf: 'center',
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
  },
  styleTextButtonLogin: {
    fontSize: HEIGHT * 0.03,
    fontFamily: fonts.BebasNeueRegular,
  },
});
