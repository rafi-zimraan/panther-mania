import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {GlobalContext} from '../../Store/globalContext';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {images} from '../../assets';
import CustomNameCard from './component/CustomNameCard';
import {colors, wait} from '../../utils';
import {useRoute} from '@react-navigation/native';
import {ButtonCustom} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jsonStringify from '../../utils/jsonStringify';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {ProfileApi} from '../../services/ProfileConsume/ProfileConsume';
import AlertMessage from '../../components/AlertMessage';
import {Header} from '../../components/Header';
import {navigateGoBack} from '../../utils/navigators';

const Maps = () => {
  const route = useRoute();
  const [isLoadingMaps, setIsloadingMaps] = useState(true);
  const [isShowNameCard, setIsShowNameCard] = useState(false);
  const [region, setRegion] = useState({
    latitude: -6.175063553572429,
    longitude: 106.82712092414114,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [dataAllUser, setDataAllUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    image: '',
    namaLengkap: '',
    alamatLengkap: '',
    noTelp: '',
    noPolisi: '',
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

  const handleGetAllUser = async () => {
    try {
      const response = await ProfileApi();
      console.log(`API MAPS ${jsonStringify(response)}`);
      if (response.data !== 'success') {
        // this code show pop up when data from API not success
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(
          'Gagal menampilkan lokasi semua anggota, silahkan kembali kehalaman awal dan coba lagi',
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
      }

      setDataAllUser(response.API);
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
    } catch (error) {
      // this code show pop up when data from API not success
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  // const handleGetPosition = () => {
  // Geolocation.getCurrentPosition(
  //   position => {
  //     let initialPosition = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       latitudeDelta: 0.09,
  //       longitudeDelta: 0.035,
  //     };
  //     setRegion(initialPosition);
  //     setIsloadingMaps(false);
  //   },
  //   error => {
  //     console.log('ERROR GEOLOCATION : ' + error.message);
  //   },
  //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  // );
  // };

  // useEffect(() => {
  //   handleGetPosition();
  // }, []);

  const renderViewHeader = () => {
    return (
      <Header
        styleLogoPantherMania={styles.styleHeader}
        BackPress={() => navigateGoBack()}
        buttonBackEnable={true}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.container}
        loadingEnabled={true}
        loadingIndicatorColor={colors.white}
        loadingBackgroundColor={colors.black02}
        minZoomLevel={0}
        maxZoomLevel={10}
        region={region}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}>
        {dataAllUser.map((item, index) => (
          <Marker
            key={index}
            onPress={() => {
              setDataUser({
                image: item.photos_members,
                namaLengkap: item.nama_lengkap,
                alamatLengkap: item.alamat_lengkap,
                noTelp: item.no_telp,
                noPolisi: item.no_polisi,
              });
              setIsShowNameCard(true);
            }}
            coordinate={{
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lng),
            }}
          />
        ))}
      </MapView>
      {renderViewHeader()}
      {isShowNameCard && (
        <CustomNameCard
          LinkPhoto={
            dataUser.image === ''
              ? images.imgprofilemaps
              : {uri: dataUser.image}
          }
          nama={
            dataUser.namaLengkap === '' ? 'Nama Lengkap' : dataUser.namaLengkap
          }
          email={
            dataUser.namaLengkap === ''
              ? 'Nama Lengkap'
              : `${dataUser.namaLengkap}`
          }
          alamat={
            dataUser.alamatLengkap === ''
              ? 'Alamat Lengkap'
              : `${dataUser.alamatLengkap}`
          }
          phoneNumber={
            dataUser.noTelp === '' ? '+62xxxxxx' : `${dataUser.noTelp}`
          }
          platNumber={
            dataUser.noPolisi === '' ? '12345' : `${dataUser.noPolisi}`
          }
          noWa={`whatsapp://send?text=hello&phone=${dataUser.noTelp}`}
        />
      )}

      {renderPopUpMessage()}
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  styleHeader: {
    // position: 'absolute',
    // top: HEIGHT * 1,
    // left: WIDTH * 0.1,
  },
});
