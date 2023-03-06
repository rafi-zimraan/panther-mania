import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import {colors, wait} from '../../utils';
import {fonts, images} from '../../assets';
import {Header} from '../../components/Header';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {CustomTextInput} from '../../components/CustomTextInput';
import {CustomBox} from '../../components/CustomBox';
import {Jumbotron} from '../../components/Jumbotron';
import CustomMenu from '../../components/CustomMenu';
import AlertMessage from '../../components/AlertMessage';
import CarPantherMania from '../../components/CarPantherMania';
import jsonStringify from '../../utils/jsonStringify';
import {AgendaApi} from '../../services/AgendaConsume/AgendaConsume';
import {ProductApi} from '../../services/ProductConsume/ProductConsume';
import convertToRupiah from '../../utils/convertToRupiah';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileApiById} from '../../services/ProfileConsume/ProfileConsumeById';
import checkCurrentTime from '../../utils/checkCurrentTime';
import {navigate, navigateAndSimpleReset} from '../../utils/navigators';

const Home = () => {
  const [search, setSearch] = useState('');
  const [dataAgenda, setDataAgenda] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisiblePermission, setIsVisiblePermission] = useState(false);
  const [dataResultSearch, setDataResultSearch] = useState([]);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [namaLengkap, setNamaLengkap] = useState('');

  console.log(`LOADER ${isLoader}`);
  console.log(`DATA AGENDA ${jsonStringify(dataAgenda)}`);
  console.log(`DATA PRODUCTS ${jsonStringify(dataProducts)}`);

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
        enableClose={true}
        enableSubmit={false}
        onClose={() => setIsVisibleModalMessage(false)}
      />
    );
  };

  useEffect(() => {
    checkerHandler();
  }, []);

  const checkerHandler = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token === null || token === undefined) {
      navigateAndSimpleReset('OnBoardingTwo');
    } else {
      ProductConsume();
      AgendaConsume();
      ProfileConsume();
    }
  };

  useEffect(() => {
    // This function for passing result to array from text if user stop typing
    // of what he was looking for
    const delayDebounceFn = setTimeout(() => {
      console.log(search);

      const filterItem = dataAgenda.filter(item => {
        return item.nama_agendak === search;
      });
      console.log('RESULT DATA SEARCH : ' + JSON.stringify(filterItem));

      setDataResultSearch(filterItem);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const memoIsVisiblePermission = useMemo(() => {
    if (isVisiblePermission) {
      console.log(`ISVISIBLEPERMISSION ${true}`);
      return true;
    }

    console.log(`ISVISIBLEPERMISSION ${false}`);
    return false;
  }, [isVisiblePermission]);

  const ProfileConsume = async () => {
    try {
      const id = await AsyncStorage.getItem('profileId');
      const response = await ProfileApiById(id);
      const {data} = response;

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

      await AsyncStorage.setItem('namaMember', response.API[0].nama_lengkap);
      setNamaLengkap(response.API[0].nama_lengkap);
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
  };

  // this code for consume api from Agenda
  const AgendaConsume = async () => {
    try {
      const response = await AgendaApi();

      const {data} = response;

      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(`Terjadi kesalahan, silahkan refresh ulang halaman`);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
        return response;
      }

      if (response.API.length > 3) {
        let dataTemproray = [];

        for (let index = 0; index < 3; index++) {
          dataTemproray.push(response.API[index]);
        }

        console.log(`DATA TEMPRORAY AGENDA ${jsonStringify(dataTemproray)}`);
        setDataAgenda(dataTemproray);
      } else {
        console.log(`DATA AGENDA ${jsonStringify(response.API)}`);
        setDataAgenda(response.API);
      }
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

  // this code for consume api from Products
  const ProductConsume = async () => {
    setIsLoader(true);
    try {
      const response = await ProductApi();
      console.log(`API PRODUCT ${jsonStringify(response)}`);

      const {data} = response;

      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(`Terjadi kesalahan, silahkan coba lagi`);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
        return response;
      }

      if (response.API.length > 3) {
        let dataTemproray = [];

        for (let index = 0; index < 3; index++) {
          dataTemproray.push(response.API[index]);
        }

        console.log(`DATA TEMPRORARY PRODUK ${jsonStringify(dataTemproray)}`);
        setDataProducts(dataTemproray);
      } else {
        console.log(`DATA PRODUK ${jsonStringify(response.API)}`);
        setDataProducts(response.API);
      }
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message} silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(5000).then(() => {
      AgendaConsume();
      ProductConsume();
      setRefreshing(false);
    });
  };

  const renderRefreshControl = () => {
    return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
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
    return (
      <>
        <Header
          buttonBackEnable={false}
          logoEnable={true}
          styleLogoPantherMania={styles.styleLogoPantherMania}
        />
        <Text style={styles.greeting}>
          SELAMAT{' '}
          {`${checkCurrentTime()} ${
            namaLengkap === '' ? 'USERNAME' : namaLengkap
          }`}
        </Text>
      </>
    );
  };

  const renderViewBoxSearch = () => {
    return (
      <CustomTextInput
        nameIconRight="cari"
        colorIconRight={colors.meteorite}
        sizeIconRight={HEIGHT * 0.035}
        nameIconLeft="cari"
        colorIconLeft={colors.meteorite}
        sizeIconLeft={HEIGHT * 0.035}
        placeholder="SEARCH FOR ..."
        placeholderTextColor={colors.osloGrey}
        styleWrapperIconLeftTextIconRight={
          styles.styleWrapperIconLeftTextIconRight
        }
        onChangeText={text => setSearch(text)}
      />
    );
  };

  const renderViewDataResultSearch = () => {
    return (
      <View>
        {dataResultSearch.length > 0 && (
          <View
            style={[
              styles.styleWrapperSearch,
              {paddingTop: HEIGHT * 0.03, paddingBottom: HEIGHT * 1.1},
            ]}>
            {dataResultSearch.map((item, index) => (
              <CustomBox
                key={index}
                uri={item.images}
                textContent={item.keterangan}
                onPress={() =>
                  navigate('AgendaKegiatan', {
                    id: item.id,
                  })
                }
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderViewEmptyDataResultSearch = () => {
    return (
      <>
        {dataResultSearch.length <= 0 && (
          <View style={styles.styleWrapperSearch}>
            <View style={styles.styleWrapperResultSearchEmpty}>
              <CarPantherMania />
              <Text style={styles.styleResultTextEmpty}>
                Yang kamu cari tidak tersedia!
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };

  const renderViewWhenSearch = () => {
    return (
      <>
        {search !== '' && (
          <>
            {renderViewDataResultSearch()}
            {renderViewEmptyDataResultSearch()}
          </>
        )}
      </>
    );
  };

  const renderViewWhenNotSearch = () => {
    return (
      <>
        {search === '' && (
          <View style={styles.wrapperSeparatorJumbotronFlatlist}>
            <View style={styles.separatorJumbotronFlatlist}>
              {/* <Jumbotron
                text="MENU"
                styleJumbotron={styles.styleJumbotron}
                styleTextJumbotron={styles.styleTextJumbotron}
              /> */}

              {renderViewCategoryMenu()}
            </View>

            <View style={styles.separatorJumbotronFlatlist}>
              <Jumbotron
                text="PRODUK PANTHER MANIA"
                enableSelengkapnya={true}
                styleJumbotron={styles.styleJumbotron}
                styleTextJumbotron={styles.styleTextJumbotron}
                onPressSelengkapnya={() => navigate('DaftarProduk')}
              />

              <FlatList
                data={dataProducts}
                horizontal
                renderItem={renderProductPantherMania}
              />
            </View>

            <View style={styles.separatorJumbotronFlatlist}>
              <Jumbotron
                text="AGENDA KEGIATAN"
                enableSelengkapnya={true}
                styleJumbotron={styles.styleJumbotron}
                styleTextJumbotron={styles.styleTextJumbotron}
                onPressSelengkapnya={() => navigate('DaftarAgenda')}
              />

              <FlatList
                data={dataAgenda}
                horizontal
                renderItem={renderAgendaKegiatan}
              />
            </View>
          </View>
        )}
      </>
    );
  };

  const renderViewCategoryMenu = () => {
    const _checkPermissionLocation = async () => {
      try {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('RESULT PERMISSION LOCATION : ' + result);
        console.log('TYPE PERMISSION LOCATION : ' + typeof result);

        // Check result check permission
        // if true will be move to screen Maps
        // but if false will be request permission again
        if (result) {
          navigate('QrScanner', {
            fromScreen: 'Home',
          });
        } else {
          const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          if (status === 'never_ask_again') {
            setIsVisiblePermission(true);
          } else if (status === 'denied') {
            _checkPermissionLocation();
          } else if (status === 'granted') {
            navigate('Maps', {
              fromScreen: 'Home',
            });
          }
        }
      } catch (error) {
        console.log('ERROR PERMISSION LOCATION : ' + error.message);
      }
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomMenu
          textTitle="CHAT ADMIN"
          sourceImage={images.imagewa}
          styleContainer={[
            {
              justifyContent: 'center',
              marginLeft: WIDTH * 0.015,
              marginRight: WIDTH * 0.015,
            },
          ]}
          onPress={() =>
            Linking.openURL(
              'whatsapp://send?text=SALAM PANTHER MANIA WUZ WUZ WUHAA&phone=6285157439660',
            )
          }
        />
        <CustomMenu
          textTitle="AGENDA KEGIATAN"
          sourceImage={images.imagecalendar}
          styleContainer={[
            {
              justifyContent: 'center',
              marginHorizontal: WIDTH * 0.02,
            },
          ]}
          onPress={() => navigate('DaftarAgenda')}
        />
        <CustomMenu
          textTitle="PRODUCT"
          sourceImage={images.imagebrandidentity}
          styleContainer={[
            {
              justifyContent: 'center',
              marginHorizontal: WIDTH * 0.02,
            },
          ]}
          onPress={() => navigate('DaftarProduk')}
        />
        <CustomMenu
          textTitle="SOS"
          sourceImage={images.imagepin}
          styleContainer={[
            {
              justifyContent: 'center',
              marginHorizontal: WIDTH * 0.02,
            },
          ]}
          onPress={_checkPermissionLocation}
        />

        <CustomMenu
          textTitle="USER PROFILE"
          sourceImage={images.imageman}
          styleContainer={[
            {
              justifyContent: 'center',
              marginHorizontal: WIDTH * 0.02,
              marginRight: WIDTH * 0.015,
              marginLeft: WIDTH * 0.015,
            },
          ]}
          onPress={() => navigate('Profile')}
        />
      </View>
    );
  };

  const renderProductPantherMania = ({item, index}) => {
    let styleCustomBox;

    switch (true) {
      case index === dataProducts.length - 1:
        styleCustomBox = {marginRight: WIDTH * 0.05, marginLeft: WIDTH * 0.025};
        break;

      case index === 0:
        styleCustomBox = {marginLeft: WIDTH * 0.05, marginRight: WIDTH * 0.025};
        break;

      default:
        styleCustomBox = {marginHorizontal: WIDTH * 0.025};
        break;
    }

    return (
      <CustomBox
        key={index}
        uri={item.gambar_products}
        textContent={item.nama_products}
        textContentSecond={`Rp . ${convertToRupiah(item.harga_products)},-`}
        styleTextContent={{
          fontSize: HEIGHT * 0.02,
        }}
        styleTextContentSecond={{
          fontSize: HEIGHT * 0.015,
          color: colors.green,
          marginVertical: HEIGHT * -0.004,
        }}
        styleBoxContent={{alignItems: 'flex-start'}}
        onPress={() =>
          navigate('Payment', {
            id: item.id,
          })
        }
      />
    );
  };

  const renderAgendaKegiatan = ({item, index}) => {
    let styleCustomBox;

    switch (true) {
      case index === dataAgenda.length - 1:
        styleCustomBox = {marginRight: WIDTH * 0.05, marginLeft: WIDTH * 0.025};
        break;

      case index === 0:
        styleCustomBox = {marginLeft: WIDTH * 0.05, marginRight: WIDTH * 0.025};
        break;

      default:
        styleCustomBox = {marginHorizontal: WIDTH * 0.025};
        break;
    }

    return (
      <CustomBox
        key={index}
        uri={item.images}
        textContent={item.keterangan}
        onPress={() =>
          navigate('AgendaKegiatan', {
            id: item.id,
          })
        }
      />
    );
  };

  const renderAlertMessagePermission = () => {
    return (
      <AlertMessage
        visible={memoIsVisiblePermission}
        enableClose={true}
        type="setting"
        titleContent="Peringatan! untuk membuka menu SOS diwajibkan mengaktifkan lokasi"
        textButton="Buka Pengaturan"
        onClose={() => {
          setIsVisiblePermission(false);
        }}
        onSubmit={() => {
          Linking.openSettings();
          setIsVisiblePermission(false);
        }}
        styleTitleContent={{
          color: colors.gray,
          shadowColor: colors.white,
        }}
        styleButton={{
          width: WIDTH * 0.6,
        }}
        styleWrapper={{
          backgroundColor: colors.white,
        }}
      />
    );
  };

  const renderLoader = () => {
    return <Loader isVisible={isLoader} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={renderRefreshControl()}>
        {renderViewImageBackground()}
        <View style={styles.styleWrapperHeaderCustomTextInput}>
          {renderViewHeader()}
          {renderViewBoxSearch()}
        </View>
        {renderViewWhenSearch()}
        {renderViewWhenNotSearch()}

        {renderAlertMessagePermission()}
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
  styleModal: {
    width: '100%',
    maxHeight: HEIGHT * 0.7,
  },
  styleWrapperSearch: {
    flexDirection: 'row',
    paddingTop: HEIGHT * 0.05,
    paddingBottom: HEIGHT * 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: HEIGHT,
    backgroundColor: colors.white,
    borderTopLeftRadius: HEIGHT * 0.07,
    borderTopRightRadius: HEIGHT * 0.07,
  },
  styleBoxResultSearch: {
    marginVertical: HEIGHT * 0.015,
    marginHorizontal: HEIGHT * 0.015,
  },
  styleWrapperResultSearchEmpty: {
    position: 'absolute',
    opacity: 0.5,
  },
  styleResultTextEmpty: {
    marginTop: HEIGHT * 0.01,
    fontSize: HEIGHT * 0.02,
    color: colors.darkGreyBlue,
    fontWeight: '800',
    fontFamily: fonts.BebasNeueRegular,
    letterSpacing: -1,
    textAlign: 'center',
  },
  styleNotFoundWhenSearchProduct: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: HEIGHT * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: HEIGHT * 0.05,
  },
  styleJumbotron: {
    justifyContent: 'space-between',
    paddingLeft: WIDTH * 0.06,
    paddingRight: WIDTH * 0.03,
  },
  styleTextJumbotron: {
    fontSize: HEIGHT * 0.03,
    color: colors.darkGreyBlue,
    fontFamily: fonts.BebasNeueRegular,
  },
  styleWrapperHeaderCustomTextInput: {
    height: HEIGHT * 0.2,
    width: '100%',
  },
  wrapperSeparatorJumbotronFlatlist: {
    backgroundColor: colors.white,
    borderTopLeftRadius: WIDTH * 0.15,
    borderTopRightRadius: WIDTH * 0.15,
    height: HEIGHT * 0.8,
    paddingTop: HEIGHT * 0.01,
    paddingBottom: HEIGHT * 0.09,
  },
  greeting: {
    color: colors.elephant,
    fontSize: HEIGHT * 0.018,
    fontFamily: fonts.BebasNeueRegular,
    fontWeight: '800',
    marginLeft: WIDTH * 0.1,
  },
  separatorJumbotronFlatlist: {
    marginTop: HEIGHT * 0.001,
    marginBottom: HEIGHT * 0.04,
  },
  styleLogoPantherMania: {
    width: WIDTH * 0.35,
    height: HEIGHT * 0.055,
  },
  styleWrapperIconLeftTextIconRight: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.055,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: HEIGHT * 0.005,
  },
});
export default Home;
