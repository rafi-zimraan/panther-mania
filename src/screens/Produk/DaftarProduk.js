import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Jumbotron} from '../../components/Jumbotron';
import {CustomBox} from '../../components/CustomBox';
import {fonts, images} from '../../assets';
import {Header} from '../../components/Header';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {colors, wait} from '../../utils';
import CarPantherMania from '../../components/CarPantherMania';
import {ProductApi} from '../../services/ProductConsume/ProductConsume';
import jsonStringify from '../../utils/jsonStringify';
import convertToRupiah from '../../utils/convertToRupiah';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import {navigate, navigateGoBack} from '../../utils/navigators';

const DaftarProduk = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

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
        setIsMessage(
          `Gagal mengambil data produk yang tersedia, silahkan refresh ulang halaman`,
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
        return response;
      }

      setDataProducts(response.API);
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

  useEffect(() => {
    ProductConsume();
  }, []);

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
        <Header logoEnable={true} BackPress={() => navigateGoBack()} />
        <Jumbotron
          text="PRODUK PANTHER MANIA.ID"
          styleJumbotron={styles.styleJumbotron}
          styleTextJumbotron={styles.styleTextJumbotron}
        />
      </>
    );
  };

  const renderListProduct = () => {
    return (
      <View>
        {dataProducts.length > 0 ? (
          <View style={styles.styleScrollWrapperDaftar}>
            <View style={styles.styleWrapperDaftar}>
              {dataProducts.map((item, index) => (
                <CustomBox
                  key={index}
                  uri={item.gambar_products}
                  textContent={item.nama_products}
                  textContentSecond={`Rp . ${convertToRupiah(
                    item.harga_products,
                  )},-`}
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
                      image: item.gambar_products,
                    })
                  }
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.styleWrapperEmptyImageAndText}>
            <CarPantherMania />
            <Text style={styles.styleTextEmpty}>
              TIDAK ADA PRODUK YANG TERSEDIA
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyListProduct = () => {
    return (
      <View>
        {dataProducts.length <= 0 && (
          <View style={styles.styleWrapperDaftar}>
            <View style={styles.styleWrapperEmptyImageAndText}>
              <CarPantherMania />
              <Text style={styles.styleTextEmpty}>
                NOT FOUND AGENDA KEGIATAN
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    wait(5000).then(() => {
      ProductConsume();
      setRefreshing(false);
    });
  };

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
        {renderListProduct()}
        {renderEmptyListProduct()}
      </ScrollView>
      {renderPopUpMessage()}
      {renderLoader()}
    </SafeAreaView>
  );
};

export default DaftarProduk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  styleJumbotron: {
    position: 'absolute',
    zIndex: 1,
    top: HEIGHT * 0.1,
    backgroundColor: colors.white,
    borderColor: colors.black02,
    borderWidth: 1,
    borderRadius: HEIGHT * 0.04,
    width: WIDTH * 0.94,
    alignSelf: 'center',
    height: HEIGHT * 0.13,
  },
  styleTextJumbotron: {
    textAlign: 'center',
  },
  styleScrollWrapperDaftar: {
    marginTop: HEIGHT * 0.1,
    height: HEIGHT * 0.9,
  },
  styleWrapperDaftar: {
    flexDirection: 'row',
    paddingTop: HEIGHT * 0.07,
    paddingBottom: HEIGHT * 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
    borderTopLeftRadius: HEIGHT * 0.02,
    borderTopRightRadius: HEIGHT * 0.02,
  },
  styleBoxDaftar: {
    marginVertical: HEIGHT * 0.015,
    marginHorizontal: HEIGHT * 0.015,
  },
  styleWrapperEmptyImageAndText: {
    marginVertical: HEIGHT * 0.16,
    opacity: 0.5,
  },
  styleTextEmpty: {
    marginTop: HEIGHT * 0.01,
    fontSize: HEIGHT * 0.02,
    color: colors.darkGreyBlue,
    fontWeight: '800',
    fontFamily: fonts.BebasNeueRegular,
    letterSpacing: -1,
    textAlign: 'center',
  },
});
