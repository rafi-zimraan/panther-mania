import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomCardBiodata from './CustomCardBiodata';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {fonts, images} from '../../assets';
import ButtonCustom from '../../components/ButtonCustom';
import {Header} from '../../components/Header';
import {colors, wait} from '../../utils';
import {LogoutApi} from '../../services/LogoutConsume';
import AlertMessage from '../../components/AlertMessage';
import {ProfileApiById} from '../../services/ProfileConsume/ProfileConsumeById';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import {
  navigate,
  navigateAndSimpleReset,
  navigateGoBack,
} from '../../utils/navigators';
import jsonStringify from '../../utils/jsonStringify';

const Profile = () => {
  const route = useRoute();
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false); 
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [dataProfile, setDataProfile] = useState({
    foto: '',
    namaLengkap: '',
    alamatLengkap: '',
    noTelp: '',
    noWa: '',
    noPolisi: '',
    noPunggung: '',
    email: '',
    jenisKelamin: '',
    ukuranBaju: '',
    tempatLahir: '',
    tanggalLahir: '',
    agama: '',
    statusMenikah: '',
    kelurahan: '',
    kecamatan: '',
    provinsi: '',
    kabupaten: '',
    noKtp: '',
    noSim: '',
    typeKendaraan: '',
    tahunKendaraan: '',
    noChacis: '',
    noEnginee: '',
    tanggalPajak: '',
    pekerjaan: '',
    namaPerusahaan: '',
    alamatPerusahaan: '',
    kontakDarurat: '',
  });

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

  const handleGetProfile = async () => {
    setIsLoader(true);
    try {
      const profileId = await AsyncStorage.getItem('profileId');
      const response = await ProfileApiById(profileId);
      const {data} = response;
      console.log(`DATA PROFILE ${jsonStringify(response)}`);
      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(
          `Gagal mengambil data profile anda, silahkan refresh ulang halaman`,
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
          return response;
        });
      }

      setDataProfile({
        foto: response.API[0].photos_members,
        namaLengkap: response.API[0].nama_lengkap,
        alamatLengkap: response.API[0].alamat_lengkap,
        noPolisi: response.API[0].no_polisi,
        noTelp: response.API[0].no_telp,
        noWa: response.API[0].no_whatsapp,
        noPunggung: response.API[0].no_punggung,
        email: response.API[0].email,
        jenisKelamin: response.API[0].jenis_kelamin,
        ukuranBaju: response.API[0].ukuran_baju,
        tempatLahir: response.API[0].tempat_lahir,
        tanggalLahir: response.API[0].tanggal_lahir,
        agama: response.API[0].agama,
        statusMenikah: response.API[0].status_menikah,
        kelurahan: response.API[0].kelurahan,
        kecamatan: response.API[0].kecamatan,
        provinsi: response.API[0].provinsi,
        kabupaten: response.API[0].kabupaten_kota,
        noKtp: response.API[0].no_ktp,
        noSim: response.API[0].no_sim,
        typeKendaraan: response.API[0].type_kendaraan,
        tahunKendaraan: response.API[0].tahun_kendaraan,
        noChacis: response.API[0].no_chasis,
        noEnginee: response.API[0].no_enggine,
        tanggalPajak: response.API[0].tanggal_pajak,
        pekerjaan: response.API[0].pekerjaan,
        namaPerusahaan: response.API[0].nama_perusahaan,
        alamatPerusahaan: response.API[0].alamat_perusahaan,
        kontakDarurat: response.API[0].kontak_darurat,
      });
    } catch (error) {
      // this code show pop up when data from API not success
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(
        `Terjadi kesalahan di ${error.message}, silahkan refresh ulang halaman`,
      );
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsLoader(false);
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleLogout = async () => {
    setIsLoader(true);
    try {
      const response = await LogoutApi();
      const {message} = response;

      if (message !== 'Berhasil Keluar') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(`Logout gagal`);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
          return response;
        });
      }

      // this code show pop up when data from API success
      AsyncStorage.removeItem('token');
      setIsVisibleModalMessage(true);
      setIsModalMessage(true);
      setIsMessage('Berhasil keluar');
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
        navigateAndSimpleReset('OnBoardingTwo');
      });
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(
        `Terjadi kesalahan di ${error.message}, silahkan refresh ulang halaman`,
      );
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsLoader(false);
  };

  const renderViewImageBackground = () => {
    return (
      <Image
        source={images.emptybackground}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: HEIGHT,
        }}
      />
    );
  };

  const renderViewHeader = () => {
    return <Header BackPress={() => navigateGoBack()} logoEnable={true} />;
  };

  const renderViewInformationUser = () => {
    return (
      <View style={styles.wrapperImageAndText}>
        <View style={styles.imageProfile}>
          <Image 
            source={dataProfile.foto !== "" ? { uri: dataProfile.foto } : images.imageprofile}
            style={{
              width: WIDTH * 0.7,
              height: HEIGHT * 0.28,
              borderRadius: HEIGHT * 0.01,
            }}
          />
        </View>
        <Text style={styles.textLarge}>{dataProfile.namaLengkap}</Text>
        {/* <Text style={styles.textMedium}>PM-2492</Text>
        <Text style={styles.textMedium}>KORWIL LAHAT</Text> */}
      </View>
    );
  };

  const renderViewButtonUpdateProfile = () => {
    return (
      <ButtonCustom
        title="Perbarui Profile"
        color={colors.darkGreyBlue}
        buttonStyle={{
          marginTop: HEIGHT * 0.1,
          width: WIDTH * 0.9,
          height: HEIGHT * 0.07,
          alignSelf: 'center',
          borderTopLeftRadius: WIDTH * 0.07,
          borderTopRightRadius: WIDTH * 0.07,
          borderBottomLeftRadius: WIDTH * 0.07,
          borderBottomRightRadius: WIDTH * 0.07,
        }}
        textStyle={{
          fontSize: HEIGHT * 0.03,
        }}
        onPress={() =>
          navigate('UpdateProfile', {
            foto: dataProfile.foto,
            namaLengkap: dataProfile.namaLengkap,
            alamatLengkap: dataProfile.alamatLengkap,
            noTelp: dataProfile.noTelp,
            noWa: dataProfile.noWa,
            email: dataProfile.email,
            jenisKelamin: dataProfile.jenisKelamin,
            ukuranBaju: dataProfile.ukuranBaju,
            tempatLahir: dataProfile.tempatLahir,
            tanggalLahir: dataProfile.tanggalLahir,
            agama: dataProfile.agama,
            statusMenikah: dataProfile.statusMenikah,
            kelurahan: dataProfile.kelurahan,
            kecamatan: dataProfile.kecamatan,
            provinsi: dataProfile.provinsi,
            kabupaten: dataProfile.kabupaten,
            noKtp: dataProfile.noKtp,
            noSim: dataProfile.noSim,
            typeKendaraan: dataProfile.typeKendaraan,
            tahunKendaraan: dataProfile.tahunKendaraan,
            noChacis: dataProfile.noChacis,
            noEnginee: dataProfile.noEnginee,
            tanggalPajak: dataProfile.tanggalPajak,
            pekerjaan: dataProfile.pekerjaan,
            namaPerusahaan: dataProfile.namaPerusahaan,
            alamatPerusahaan: dataProfile.namaPerusahaan,
            kontakDarurat: dataProfile.kontakDarurat,
          })
        }
      />
    );
  };

  const renderViewButtonLogout = () => {
    return (
      <ButtonCustom
        title="Keluar"
        color={colors.pastelRed}
        buttonStyle={{
          marginTop: HEIGHT * 0.02,
          width: WIDTH * 0.9,
          height: HEIGHT * 0.07,
          alignSelf: 'center',
          borderTopLeftRadius: WIDTH * 0.07,
          borderTopRightRadius: WIDTH * 0.07,
          borderBottomLeftRadius: WIDTH * 0.07,
          borderBottomRightRadius: WIDTH * 0.07,
        }}
        textStyle={{
          fontSize: HEIGHT * 0.03,
        }}
        onPress={handleLogout}
      />
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => {
      handleGetProfile();
      setRefreshing(false);
    });
  }, []);

  const renderRefreshControl = () => {
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
  };

  const renderLoader = () => {
    return <Loader isVisible={isLoader} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={renderRefreshControl()}>
        {renderViewImageBackground()}
        {renderViewHeader()}
        {renderViewInformationUser()}
        <View style={styles.wrapperBox}>
          <CustomCardBiodata text={dataProfile.namaLengkap} />

          <CustomCardBiodata text={dataProfile.noTelp} />

          <CustomCardBiodata text={dataProfile.noPolisi} />
          {renderViewButtonUpdateProfile()}
          {renderViewButtonLogout()}
        </View>
        {renderPopUpMessage()}
        {renderLoader()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperBox: {
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    height: HEIGHT * 0.55,
    paddingTop: WIDTH * 0.05,
    marginTop: HEIGHT * 0.02,
    backgroundColor: colors.white,
    borderTopLeftRadius: HEIGHT * 0.05,
    borderTopRightRadius: HEIGHT * 0.05,
  },
  wrapperImageAndText: {
    marginTop: HEIGHT * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile: {
    width: WIDTH * 0.7,
    height: HEIGHT * 0.28,
    borderRadius: HEIGHT * 0.01,
    marginTop: HEIGHT * 0.058,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGreyBlue,
  },
  textProfile: {
    fontSize: HEIGHT * 0.09,
    fontFamily: fonts.BebasNeueRegular,
    color: colors.white,
    textAlign: 'center',
  },
  textLarge: {
    fontSize: HEIGHT * 0.03,
    fontFamily: fonts.BebasNeueRegular,
    color: colors.blueGrey,
    marginBottom: HEIGHT * 0.001,
    marginTop: HEIGHT * 0.01,
  },
  textMedium: {
    fontSize: HEIGHT * 0.015,
    fontFamily: fonts.BebasNeueRegular,
    fontWeight: '800',
    color: colors.blueGrey,
  },
});

export default Profile;
