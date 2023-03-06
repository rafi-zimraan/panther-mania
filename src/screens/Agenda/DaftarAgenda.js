import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Jumbotron} from '../../components/Jumbotron';
import {CustomBox} from '../../components/CustomBox';
import {Header} from '../../components/Header';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {colors, wait} from '../../utils';
import CarPantherMania from '../../components/CarPantherMania';
import {fonts, images} from '../../assets';
import {AgendaApi} from '../../services/AgendaConsume/AgendaConsume';
import AlertMessage from '../../components/AlertMessage';
import Loader from '../../components/Loader';
import {navigate, navigateGoBack} from '../../utils/navigators';
const DaftarAgenda = () => {
  const [dataAgenda, setDataAgenda] = useState([]);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  // Pop Up Message
  const renderPopUpMessage = () => {
    return (
      <AlertMessage
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

  // this code for consume api from Agenda
  const AgendaConsume = async () => {
    setIsLoader(true);
    try {
      const response = await AgendaApi();
      const {data} = response;

      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(
          `Gagal mengambil data agenda yang tersedia, silahkan refresh ulang halaman`,
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
        return response;
      }

      setDataAgenda(response.API);
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
    AgendaConsume();
  }, []);

  // Backround Image
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

  // Header
  const renderViewHeader = () => {
    return (
      <>
        <Header logoEnable={true} BackPress={() => navigateGoBack()} />
        <Jumbotron
          text="DAFTAR AGENDA KEGIATAN"
          styleJumbotron={styles.styleJumbotron}
          styleTextJumbotron={styles.styleTextJumbotron}
        />
      </>
    );
  };

  // List Products
  const renderListProduct = () => {
    return (
      <>
        {dataAgenda.length > 0 ? (
          <View style={styles.styleScrollWrapperDaftar}>
            {/* // style={styles.styleScrollWrapperDaftar}
            // refreshControl={renderRefreshControl()}> */}
            <View style={styles.styleWrapperDaftar}>
              {dataAgenda.map((item, index) => (
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
          </View>
        ) : (
          <View style={styles.styleWrapperEmptyImageAndText}>
            <CarPantherMania />
            <Text style={styles.styleTextEmpty}>
              TIDAK ADA AGENDA KEGIATAN YANG TERSEDIA
            </Text>
          </View>
        )}
      </>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    wait(5000).then(() => {
      AgendaConsume();
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
      </ScrollView>
      {renderPopUpMessage()}
      {renderLoader()}
    </SafeAreaView>
  );
};

export default DaftarAgenda;

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
