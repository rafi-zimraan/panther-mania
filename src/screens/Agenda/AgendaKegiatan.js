import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts, icons, images} from '../../assets';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {Jumbotron} from '../../components/Jumbotron';
import CustomBoxMessage from '../../components/CustomBoxMessage';
import {Header} from '../../components/Header';
import ButtonCustom from '../../components/ButtonCustom';
import AlertMessage from '../../components/AlertMessage';
import {colors, wait} from '../../utils';
import {AgendaConsumeApiById} from '../../services/AgendaConsume/AgendaConsumeIByd';
import {useRoute} from '@react-navigation/native';
import {CustomTextInput} from '../../components/CustomTextInput';
import {Formik} from 'formik';
import {daftarKegiatanValidation} from './daftarKegiatanValidation';
import jsonStringify from '../../utils/jsonStringify';
import {DaftarKegiatanConsume} from '../../services/AgendaConsume/DaftarKegiatanConsume';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';
import {Calendar} from 'react-native-calendars';
import CustomBoxTwoItem from '../../components/CustomBoxTwoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileApiById} from '../../services/ProfileConsume/ProfileConsumeById';
import {navigate, navigateGoBack} from '../../utils/navigators';

const date = '2022-12-07';

const AgendaKegiatan = () => {
  const route = useRoute();
  const [status, setStatus] = useState('Belum Daftar');
  const [refreshing, setRefreshing] = useState(false);
  const [isAlertMessage, setIsAlertMessage] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(false);
  const [type, setType] = useState('');
  const [openModalDate, setOpenModalDate] = useState(false);
  const [isVisibleFormChanger, setIsVisibleFormChanger] = useState(false);
  // const [tglAgenda, setTglAgenda] = useState('');
  // const [namaMember, setNamaMember] = useState('');
  // const [noPunggung, setNopunggung] = useState('');
  const [dewasa, setDewasa] = useState('');
  const [anakAnak, setAnakAnak] = useState('');
  const [dataAgenda, setDataAgenda] = useState({
    image: '',
    nama_agenda: '',
    nama_member: '',
    tgl_agenda: '',
    no_punggung: '',
    dewasa: '',
    anakAnak: '',
    nama_chapter: '',
    nama_korwil: '',
    keterangan: '',
  });

  // Pop Up Message
  const renderPopUpMessage = () => {
    return (
      <AlertMessage
        enableTypeContentIcon={false}
        type={isModalMessage ? 'success' : 'failed'}
        titleContent={isMessage}
        visible={isVisibleModalMessage}
        dismissable={false}
        enableClose={false}
        enableSubmit={false}
      />
    );
  };

  useEffect(() => {
    handleAgendaById();
    // handleGetProfile();
  }, []);

  // const handleGetProfile = async () => {
  //   setIsLoader(true);
  //   try {
  //     const profileId = await AsyncStorage.getItem('profileId');
  //     const response = await ProfileApiById(profileId);
  //     const {data} = response;
  //     if (data !== 'success') {
  //       // this code show pop up when data from API not success
  //       setIsLoader(false);
  //       setIsVisibleModalMessage(true);
  //       setIsModalMessage(false);
  //       setIsMessage(
  //         `Gagal mengambil data profile anda, silahkan refresh ulang halaman`,
  //       );
  //       wait(5000).then(() => {
  //         setIsVisibleModalMessage(false);
  //         return response;
  //       });
  //     }

  //     setNamaMember(response.API[0].nama_lengkap);
  //   } catch (error) {
  //     // this code show pop up when data from API not success
  //     setIsVisibleModalMessage(true);
  //     setIsModalMessage(false);
  //     setIsMessage(
  //       `Terjadi kesalahan di ${error.message}, silahkan refresh ulang halaman`,
  //     );
  //     wait(5000).then(() => {
  //       setIsVisibleModalMessage(false);
  //     });
  //   }
  //   setIsLoader(false);
  // };

  const handleFormChanger = type => {
    setIsVisibleFormChanger(true);
    setType(type);
  };

  const handleAgendaById = async () => {
    setIsLoader(true);
    try {
      const id = route.params.id;
      const profileId = await AsyncStorage.getItem('profileId');
      const responseAgendaById = await AgendaConsumeApiById(id);
      const responseProfileById = await ProfileApiById(profileId);

      if (
        responseAgendaById.data !== 'success' &&
        responseProfileById.data !== 'success'
      ) {
        // this code show pop up when data from API not success
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

      setDataAgenda({
        nama_member: responseProfileById.API[0].nama_lengkap,
        no_punggung: responseProfileById.API[0].no_punggung,
        image: responseAgendaById.API[0].images,
        tgl_agenda: responseAgendaById.API[0].tanggal_kegiatan,
        nama_agenda: responseAgendaById.API[0].nama_agendak,
        nama_chapter: responseAgendaById.API[0].nama_chapter,
        nama_korwil: responseAgendaById.API[0].nama_korwil,
        keterangan: responseAgendaById.API[0].keterangan,
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

  const handleRegistration = async () => {
    switch (true) {
      case status === 'Belum Daftar':
        // this code show alert when user before registration , but want registration
        setStatus('Daftar');
        break;

      case status === 'Daftar':
        // this code when user want registration
        setIsLoader(true);
        try {
          const formData = new FormData();
          formData.append('nama_member', dataAgenda.nama_member);
          formData.append('nopung', dataAgenda.no_punggung);
          formData.append('dewasa', dewasa);
          formData.append('anak anak', anakAnak);
          formData.append('nama_kegiatan', dataAgenda.nama_agenda);
          formData.append('tanggal_kegiatan', dataAgenda.tgl_agenda);

          const response = await DaftarKegiatanConsume(formData);
          console.log(`API DAFTAR KEGIATAN ${jsonStringify(response)}`);
          const {data} = response;
          if (data !== 'success') {
            // this code show pop up when data from API not success
            setIsLoader(false);
            setIsAlertMessage(true);
            setIsModalMessage(false);
            setIsMessage(
              `Pendaftaran untuk kegiatan ini gagal, silahkan coba lagi`,
            );
            wait(5000).then(() => {
              setIsAlertMessage(false);
            });
            return response;
          }

          // this code show pop up when data from API not success
          setIsAlertMessage(true);
          setIsModalMessage(true);
          setIsMessage(`Pendaftaran kegiatan berhasil`);
          wait(5000).then(() => {
            setIsAlertMessage(false);
          });
        } catch (error) {
          // this code show pop up when process consume API failed
          setIsAlertMessage(true);
          setIsModalMessage(false);
          setIsMessage(
            `Terjadi kesalahan di ${error.message}, silahkan refresh ulang halaman`,
          );
          wait(5000).then(() => {
            setIsAlertMessage(false);
          });
        }
        setIsLoader(false);
        setIsLoadingAgenda(true);
        setStatus('Sudah Daftar');
        break;

      case status === 'Sudah Daftar':
        navigate('Home');
    }
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
      <View>
        <Header BackPress={() => navigateGoBack()} />
      </View>
    );
  };

  const renderViewImageAgendaKegiatan = () => {
    return (
      <View>
        <Jumbotron text="AGENDA KEGIATAN" />
        <Image
          style={styles.styleImageAgendaKegaiatan}
          source={
            dataAgenda === ''
              ? images.imagecontentdefault
              : {uri: dataAgenda.image}
          }
        />
        <Jumbotron
          styleJumbotron={styles.styleJumbotron}
          styleTextJumbotron={styles.styleTextJumbotron}
          text={dataAgenda.nama_agenda}
        />
      </View>
    );
  };

  const renderViewJadwal = () => {
    return (
      <View style={styles.styleWrapperCustomBoxMessage}>
        <CustomBoxMessage
          styleCustomBoxMessage={{
            marginRight: HEIGHT * 0.01,
          }}
          iconLeftEnable={true}
          platformIcon="Image"
          sourceLeftImage={icons.ic_calendar}
          text={dataAgenda.tgl_agenda}
        />

        <CustomBoxMessage
          styleCustomBoxMessage={{
            backgroundColor: colors.lightForestGreen,
            marginLeft: HEIGHT * 0.01,
          }}
          styleTextMessage={{
            marginLeft: WIDTH * 0.04,
          }}
          iconLeftEnable={true}
          platformIcon="Image"
          sourceLeftImage={icons.ic_flag}
          text={`${dataAgenda.nama_korwil}`}
          // text={`${`korwil pmsr (solo raya)`.substring(0, 25)} ${`korwil pmsr (solo raya)`.length > 25 ? '...' : ''}`}
        />
      </View>
    );
  };

  // const renderModalDate = () => {
  //   return (
  //     <CustomModal
  //       visible={openModalDate}
  //       transparent={true}
  //       styleModal={{
  //         flex: 1,
  //       }}>
  //       <View
  //         style={{
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           position: 'absolute',
  //           top: 0,
  //           bottom: 0,
  //           left: 0,
  //           right: 0,
  //           backgroundColor: colors.black03,
  //           flex: 1,
  //         }}>
  //         <Calendar
  //           enableSwipeMonths
  //           current={date}
  //           markedDates={{
  //             [tglAgenda]: {
  //               selected: true,
  //               disableTouchEvent: true,
  //               selectedColor: colors.green,
  //               selectedTextColor: colors.white,
  //             },
  //           }}
  //           onDayPress={day => setTglAgenda(day.dateString)}
  //           theme={{
  //             'stylesheet.calendar.header': {
  //               dayTextAtIndex0: {
  //                 color: 'red',
  //               },
  //               dayTextAtIndex6: {
  //                 color: 'blue',
  //               },
  //             },
  //           }}
  //         />
  //         <ButtonCustom
  //           color={colors.elephant}
  //           buttonStyle={{
  //             marginTop: HEIGHT * 0.03,
  //             width: WIDTH * 0.6,
  //             height: HEIGHT * 0.06,
  //             alignSelf: 'center',
  //             borderTopLeftRadius: WIDTH * 0.02,
  //             borderTopRightRadius: WIDTH * 0.02,
  //             borderBottomLeftRadius: WIDTH * 0.02,
  //             borderBottomRightRadius: WIDTH * 0.02,
  //           }}
  //           onPress={() => setOpenModalDate(false)}
  //           title="Simpan"
  //         />
  //       </View>
  //     </CustomModal>
  //   );
  // };

  const renderComponentDaftar = () => {
    return (
      <View>
        <Jumbotron
          text="DAFTAR AGENDA"
          styleJumbotron={[
            styles.styleJumbotron,
            {width: WIDTH, height: HEIGHT * 0.08},
          ]}
          styleTextJumbotron={[
            styles.styleTextJumbotron,
            {fontSize: HEIGHT * 0.03},
          ]}
        />
        <CustomBoxTwoItem
          textItemLeft="Nama Agenda"
          buttonDisable={true}
          textItemRight={
            dataAgenda.nama_agenda !== '' ? dataAgenda.nama_agenda : 'Kosong'
          }
        />

        <CustomBoxTwoItem
          textItemLeft="Tanggal Agenda"
          buttonDisable={true}
          textItemRight={
            dataAgenda.tgl_agenda !== '' ? dataAgenda.tgl_agenda : 'Belum diisi'
          }
        />

        <CustomBoxTwoItem
          textItemLeft="Nama Member"
          buttonDisable={true}
          textItemRight={
            dataAgenda.nama_member !== '' ? dataAgenda.nama_member : 'Kosong'
          }
        />

        <CustomBoxTwoItem
          textItemLeft="No Punggung"
          buttonDisable={true}
          textItemRight={
            dataAgenda.no_punggung !== '' ? dataAgenda.no_punggung : 'Kosong'
          }
        />

        {/* {isVisibleFormChanger && type === 'No Punggung' ? (
          <CustomTextInput
            nameIconLeft="no punggung"
            colorIconLeft={colors.white}
            sizeIconLeft={HEIGHT * 0.03}
            placeholder="No Punggung"
            buttonRightEnable={true}
            colorButtonRightPress={colors.darkGreyBlue}
            buttonRightPress={() => {
              handleFormChanger('');
              setIsVisibleFormChanger(false);
            }}
            iconNameRight="check"
            iconColorRight={colors.white}
            placeholderTextColor={colors.aluminium}
            styleWrapperIconLeftTextIconRight={{
              marginBottom: HEIGHT * 0.01,
              marginHorizontal: WIDTH * 0.05,
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 2,
              elevation: 10,
            }}
            onChangeText={text => setNopunggung(text)}
          />
        ) : (
          <CustomBoxTwoItem
            textItemLeft="No Punggung"
            buttonDisable={isLoadingAgenda}
            textItemRight={noPunggung !== '' ? noPunggung : 'Belum diisi'}
            onPick={() => {
              handleFormChanger('No Punggung');
            }}
          />
        )} */}

        {isVisibleFormChanger && type === 'Dewasa' ? (
          <CustomTextInput
            nameIconLeft="dewasa"
            colorIconLeft={colors.white}
            sizeIconLeft={HEIGHT * 0.03}
            placeholder="Dewasa"
            buttonRightEnable={true}
            colorButtonRightPress={colors.darkGreyBlue}
            buttonRightPress={() => {
              handleFormChanger('');
              setIsVisibleFormChanger(false);
            }}
            keyboardType="numeric"
            iconNameRight="check"
            iconColorRight={colors.white}
            placeholderTextColor={colors.aluminium}
            styleWrapperIconLeftTextIconRight={{
              marginBottom: HEIGHT * 0.01,
              marginHorizontal: WIDTH * 0.05,
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 2,
              elevation: 10,
            }}
            onChangeText={text => setDewasa(text)}
          />
        ) : (
          <CustomBoxTwoItem
            textItemLeft="Dewasa"
            bgColorTwoItem={dewasa !== '' ? true : false}
            colorTwoItem={dewasa !== '' ? true : false}
            buttonDisable={isLoadingAgenda}
            textItemRight={dewasa !== '' ? dewasa : 'Wajib diisi!'}
            onPick={() => {
              handleFormChanger('Dewasa');
            }}
          />
        )}

        {isVisibleFormChanger && type === 'Anak Anak' ? (
          <CustomTextInput
            nameIconLeft="anak anak"
            colorIconLeft={colors.white}
            sizeIconLeft={HEIGHT * 0.03}
            placeholder="Anak Anak"
            buttonRightEnable={true}
            colorButtonRightPress={colors.darkGreyBlue}
            buttonRightPress={() => {
              handleFormChanger('');
              setIsVisibleFormChanger(false);
            }}
            keyboardType="numeric"
            iconNameRight="check"
            iconColorRight={colors.white}
            placeholderTextColor={colors.aluminium}
            styleWrapperIconLeftTextIconRight={{
              marginBottom: HEIGHT * 0.01,
              marginHorizontal: WIDTH * 0.05,
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 2,
              elevation: 10,
            }}
            onChangeText={text => setAnakAnak(text)}
          />
        ) : (
          <CustomBoxTwoItem
            textItemLeft="Anak Anak"
            bgColorTwoItem={anakAnak !== '' ? true : false}
            colorTwoItem={anakAnak !== '' ? true : false}
            buttonDisable={isLoadingAgenda}
            textItemRight={anakAnak !== '' ? anakAnak : 'Wajib diisi!'}
            onPick={() => {
              handleFormChanger('Anak Anak');
            }}
          />
        )}
        {/* <Formik
          validationSchema={daftarKegiatanValidation}
          initialValues={initialData}
          onSubmit={values => {
            if (status === 'Daftar') {
              handleRegistration(values);
            } else {
              handleRegistration();
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            values,
            errors,
          }) => (
            <View>
              <CustomTextInput
                nameIconLeft="nama member"
                colorIconLeft={colors.white}
                sizeIconLeft={HEIGHT * 0.03}
                placeholder="Nama Member"
                placeholderTextColor={colors.aluminium}
                styleWrapperIconLeftTextIconRight={styles.styleTextInput}
                onBlur={handleBlur('namaMember')}
                value={values.namaMember}
                onChangeText={handleChange('namaMember')}
                enableError={errors.namaMember ? true : false}
                textError={errors.namaMember}
              />

              <CustomTextInput
                nameIconLeft="no punggung"
                keyboardType="numeric"
                colorIconLeft={colors.white}
                sizeIconLeft={HEIGHT * 0.03}
                placeholder="No Punggung"
                placeholderTextColor={colors.aluminium}
                styleWrapperIconLeftTextIconRight={styles.styleTextInput}
                onBlur={handleBlur('noPung')}
                value={values.noPung}
                onChangeText={handleChange('noPung')}
                enableError={errors.noPung ? true : false}
                textError={errors.noPung}
              />

              <CustomTextInput
                nameIconLeft="dewasa"
                keyboardType="numeric"
                colorIconLeft={colors.white}
                sizeIconLeft={HEIGHT * 0.03}
                placeholder="Dewasa"
                placeholderTextColor={colors.aluminium}
                styleWrapperIconLeftTextIconRight={styles.styleTextInput}
                onBlur={handleBlur('dewasa')}
                value={values.dewasa}
                onChangeText={handleChange('dewasa')}
                enableError={errors.dewasa ? true : false}
                textError={errors.dewasa}
              />

              <CustomTextInput
                nameIconLeft="anak anak"
                keyboardType="numeric"
                colorIconLeft={colors.white}
                sizeIconLeft={HEIGHT * 0.03}
                placeholder="Anak - Anak"
                placeholderTextColor={colors.aluminium}
                styleWrapperIconLeftTextIconRight={styles.styleTextInput}
                onBlur={handleBlur('anakAnak')}
                value={values.anakAnak}
                onChangeText={handleChange('anakAnak')}
                enableError={errors.anakAnak ? true : false}
                textError={errors.anakAnak}
              />

              <ButtonCustom
                title={
                  status === 'Daftar'
                    ? 'Daftar Seakrang'
                    : status === 'Belum Daftar'
                    ? 'Daftar'
                    : ''
                }
                color={isValid ? colors.darkGreyBlue : colors.gray}
                buttonStyle={{
                  height: HEIGHT * 0.07,
                  marginTop: HEIGHT * 0.2,
                  marginBottom: HEIGHT * 0.02,
                  marginHorizontal: WIDTH * 0.05,
                  borderTopLeftRadius: WIDTH * 0.07,
                  borderTopRightRadius: WIDTH * 0.07,
                  borderBottomLeftRadius: WIDTH * 0.07,
                  borderBottomRightRadius: WIDTH * 0.07,
                }}
                disabled={!isValid}
                textStyle={{
                  fontSize: HEIGHT * 0.03,
                }}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik> */}
      </View>
    );
  };

  const renderComponentBelumDaftar = () => {
    return (
      <>
        <CustomBoxMessage
          styleCustomBoxMessage={{
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginTop: HEIGHT * 0.025,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          styleTextMessage={{
            color: colors.boulder,
            textAlign: 'center',
            marginLeft: WIDTH * 0.03,
            marginRight: WIDTH * 0.03,
          }}
          text={dataAgenda.keterangan}
        />
      </>
    );
  };

  const renderButtonDaftar = () => {
    return (
      <ButtonCustom
        title={
          status === 'Belum Daftar'
            ? 'Daftar'
            : status === 'Daftar'
            ? 'Daftar'
            : status === 'Sudah Daftar'
            ? 'Kembali ke agenda'
            : ''
        }
        color={
          status === 'Belum Daftar' || status === 'Sudah Daftar'
            ? colors.darkGreyBlue
            : colors.dustySteel
        }
        buttonStyle={{
          height: HEIGHT * 0.07,
          marginTop: HEIGHT * 0.2,
          marginBottom: HEIGHT * 0.02,
          marginHorizontal: WIDTH * 0.05,
          borderTopLeftRadius: WIDTH * 0.07,
          borderTopRightRadius: WIDTH * 0.07,
          borderBottomLeftRadius: WIDTH * 0.07,
          borderBottomRightRadius: WIDTH * 0.07,
        }}
        textStyle={{
          fontSize: HEIGHT * 0.03,
        }}
        onPress={() => handleRegistration()}
      />
    );
  };

  const renderAlertMessage = () => {
    return (
      <AlertMessage
        styleButton={{
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowRadius: 1,
          elevation: 5,
        }}
        visible={isAlertMessage}
        type={isModalMessage ? 'success' : 'failed'}
        titleContent={isMessage}
        dismissable={false}
        enableClose={false}
        enableSubmit={false}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    wait(5000).then(() => {
      handleAgendaById();
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
        {renderViewImageAgendaKegiatan()}
        {renderViewJadwal()}

        <View style={[styles.styleWrapperAgendaKegiatan]}>
          {status === 'Belum Daftar' && renderComponentBelumDaftar()}
          {status === 'Daftar' && renderComponentDaftar()}
          {status === 'Sudah Daftar' && renderComponentDaftar()}
          {renderButtonDaftar()}
        </View>
      </ScrollView>
      {renderAlertMessage()}
      {renderPopUpMessage()}
      {renderLoader()}
    </SafeAreaView>
  );
};

export default AgendaKegiatan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleWrapperAgendaKegiatan: {
    paddingTop: HEIGHT * -0.02,
    backgroundColor: colors.white,
    borderTopLeftRadius: HEIGHT * 0.05,
    borderTopRightRadius: HEIGHT * 0.05,
  },
  styleImageAgendaKegaiatan: {
    marginTop: HEIGHT * 0.01,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.2,
    alignSelf: 'center',
    borderTopRightRadius: HEIGHT * 0.01,
    borderTopLeftRadius: HEIGHT * 0.01,
  },
  styleJumbotron: {
    width: WIDTH * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HEIGHT * 0.03,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 10,
    elevation: 10,
  },
  styleTextJumbotron: {
    fontSize: HEIGHT * 0.015,
    textAlign: 'center',
    fontFamily: fonts.BebasNeueRegular,
  },
  styleWrapperCustomBoxMessage: {
    marginTop: HEIGHT * 0.02,
    marginBottom: HEIGHT * 0.01,
    maxWidth: WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
});
