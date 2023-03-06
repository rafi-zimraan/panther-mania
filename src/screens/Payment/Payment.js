import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import AlertMessage from '../../components/AlertMessage';
import {Jumbotron} from '../../components/Jumbotron';
import {Header} from '../../components/Header';
import {fonts, images} from '../../assets';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import CustomBoxTwoItem from '../../components/CustomBoxTwoItem';
import ButtonPicker from '../../components/ButtonPicker';
import ButtonCustom from '../../components/ButtonCustom';
import CustomBoxMessage from '../../components/CustomBoxMessage';
import {colors, convertImageToUrl, wait} from '../../utils';
import DocumentPicker from 'react-native-document-picker';
import ModalCheckBox from '../../components/ModalCheckBox';
import CustomCheckBox from '../../components/CustomCheckBox';
import {StoreOrderApi} from '../../services/OrderConsume/StoreOrderConsume';
import ButtonRound from '../../components/ButtonRound';
import jsonStringify from '../../utils/jsonStringify';
import fs from 'react-native-fs';
import {ProductApiById} from '../../services/ProductConsume/ProductConsumeById';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import convertToRupiah from '../../utils/convertToRupiah';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../components/CustomModal';
import {Calendar} from 'react-native-calendars';
import {CustomTextInput} from '../../components/CustomTextInput';
import {navigateGoBack} from '../../utils/navigators';
import moment from 'moment/moment';

const Payment = () => {
  const route = useRoute();
  const tglPembayaran = moment(new Date(Date.now())).format('YYYY-MM-DD');
  const [isBuyProduct, setIsBuyProduct] = useState(false);
  const [isVisibleModalBuyNow, setIsVisibleModalBuyNow] = useState(false);
  const [isLoadingBuyProduct, setIsLoadingBuyProduct] = useState(false);
  const [isVisibleFormChanger, setIsVisibleFormChanger] = useState(false);
  const [isVisibleModalCheckBox, setIsVisibleModalCheckBox] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  // const [isResultPickBuktiTransfer, setIsResultPickBuktiTransfer] = useState(
  //   {},
  // );
  // const [openModalDate, setOpenModalDate] = useState(false);
  const [noRekPembayaran, setNoRekPembayaran] = useState('');
  const [mount, setMount] = useState(1);
  // const [tglPembayaran, setTglPembayaran] = useState('');
  const [totalOrder, setTotalOrder] = useState(0);
  // const [valueCheckBox, setValueCheckBox] = useState('');
  const [type, setType] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [dataProduct, setDataProduct] = useState({
    namaMember: '',
    noRekPembayaran: '',
    tglPembayaran: '',
    image: '',
    namaProduct: '',
    keterangan: '',
    hargaProduct: '',
    kontakAdmin: '',
  });
  console.log(`MOUNT ${mount}`);
  console.log(`TOTAL ORDER ${totalOrder}`);

  console.log(`FORM CHANGER ${isVisibleFormChanger}`);

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

  useEffect(() => {
    handleProductsById();
  }, []);

  useEffect(() => {}, [totalOrder, mount]);

  useEffect(() => {}, [isVisibleFormChanger]);

  const handleProductsById = async () => {
    setIsLoader(true);
    try {
      const id = route.params.id;
      const response = await ProductApiById(id);
      const {data} = response;
      console.log(`MESSAGE ${data}`);
      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(
          `Gagal mengambil data produk, silahkan refresh ulang halaman`,
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });

        return response;
      }
      const nMember = await AsyncStorage.getItem('namaMember');

      const initialHargaProduct = parseInt(
        response.showProducts[0].harga_products,
      );
      setTotalOrder(initialHargaProduct);
      setDataProduct({
        namaMember: nMember,
        image: response.showProducts[0].gambar_products,
        namaProduct: response.showProducts[0].nama_products,
        hargaProduct: response.showProducts[0].harga_products,
        keterangan: response.showProducts[0].keterangan,
        kontakAdmin: response.showProducts[0].kontak_admin,
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

  const handleModalCheckBox = type => {
    setIsVisibleModalCheckBox(true);
    setType(type);
  };

  const handleFormChanger = type => {
    setIsVisibleFormChanger(true);
    setType(type);
  };

  const handleBuyNow = async () => {
    setIsLoadingBuyProduct(true);
    setIsLoader(true);
    try {
      const formData = new FormData();
      // formData.append('size', valueCheckBox);
      // formData.append('jumlah', mount);
      // formData.append('upload_bukti', url);
      formData.append('nama_pesanan', dataProduct.namaProduct);
      formData.append('nama_member', dataProduct.namaMember);
      formData.append('no_rek_pembayaran', noRekPembayaran);
      formData.append('tanggal_masuk', tglPembayaran);
      formData.append('jumlah', mount);
      formData.append('total_orders', totalOrder);

      const response = await StoreOrderApi(formData);
      console.log(`API STORE ORDER ${jsonStringify(response)}`);

      const {data} = response;

      if (data !== 'success') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(`Terjadi kesalahan yang tak terduga, silahkan coba lagi`);
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
        });
        return response;
      }

      setIsVisibleModalBuyNow(true);
    } catch (error) {
      // this code show pop up when data from API not success
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
    }
    setIsLoader(false);
  };

  const handleSubmitCekDetail = () => {
    setIsBuyProduct(true);
    setIsVisibleModalBuyNow(false);
  };

  // const handleBuktiTransfer = async () => {
  //   try {
  //     const options = {
  //       allowMultiSelection: false,
  //       type: 'image/*',
  //       mode: 'open',
  //       presentationStyle: 'fullScreen',
  //       transitionStyle: 'coverVertical',
  //     };

  //     const result = await DocumentPicker.pickSingle(options);
  //     const accessUriFromDifferentPlatform =
  //       Platform.OS === 'ios' ? decodeURIComponent(result.uri) : result.uri;
  //     const convertFilePathToUrl = await fs.readFile(
  //       accessUriFromDifferentPlatform,
  //       'base64',
  //     );

  //     // console.log('RESULT BUKTI TRANSFER : ' + JSON.stringify(result));
  //     // console.log(
  //     //   `CONVERT FILEPATH TO URL ${jsonStringify(convertFilePathToUrl)}`,
  //     // );

  //     const dataResult = {
  //       uri: result.uri,
  //       base64String: convertFilePathToUrl,
  //     };

  //     setIsResultPickBuktiTransfer(dataResult);
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log('Pemilihan gambar dibatalkan');
  //       return false;
  //     }
  //   }
  // };

  // const renderCheckBoxChooseSize = () => {
  //   return (
  //     <View style={styles.styleWrapperModalCheckBox}>
  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('M')}
  //         status={valueCheckBox === 'M'}
  //         text="M"
  //       />

  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('S')}
  //         status={valueCheckBox === 'S'}
  //         text="S"
  //       />

  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('L')}
  //         status={valueCheckBox === 'L'}
  //         text="L"
  //       />

  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('XL')}
  //         status={valueCheckBox === 'XL'}
  //         text="XL"
  //       />

  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('XXL')}
  //         status={valueCheckBox === 'XXL'}
  //         text="XXL"
  //       />

  //       <CustomCheckBox
  //         onPress={() => setValueCheckBox('XXXL')}
  //         status={valueCheckBox === 'XXXL'}
  //         text="XXXL"
  //       />
  //     </View>
  //   );
  // };

  const renderMountProducts = () => {
    const handleMinus = () => {
      setMount(mount === 1 ? 1 : mount - 1);

      setTotalOrder(
        mount === 1
          ? parseInt(dataProduct.hargaProduct)
          : totalOrder - parseInt(dataProduct.hargaProduct),
      );
    };

    const handlePlus = () => {
      setMount(mount + 1);
      setTotalOrder(totalOrder + parseInt(dataProduct.hargaProduct));
    };

    return (
      <View style={styles.styleWrapperModalCheckBox}>
        <ButtonRound
          iconName="minus"
          type="icon"
          color={colors.reddish}
          onPress={() => handleMinus()}
        />
        <Text
          style={{
            fontSize: HEIGHT * 0.03,
            fontFamily: fonts.BebasNeueRegular,
            color: colors.black03,
            marginHorizontal: WIDTH * 0.04,
            width: WIDTH * 0.07,
            textAlign: 'center',
          }}>
          {mount}
        </Text>
        <ButtonRound
          iconName="plus"
          type="icon"
          onPress={() => handlePlus()}
          color={colors.green}
        />
      </View>
    );
  };

  const renderModalCheckBox = () => {
    return (
      <ModalCheckBox dismissable={true} isVisible={isVisibleModalCheckBox}>
        <View style={styles.styleContainerModalCheckBox}>
          {/* {type === 'size' && renderCheckBoxChooseSize()} */}
          {type === 'mount' && renderMountProducts()}
          <Pressable
            onPress={() => setIsVisibleModalCheckBox(false)}
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
      </ModalCheckBox>
    );
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
  //             [tglPembayaran]: {
  //               selected: true,
  //               disableTouchEvent: true,
  //               selectedColor: colors.green,
  //               selectedTextColor: colors.white,
  //             },
  //           }}
  //           onDayPress={day => {
  //             setTglPembayaran(day.dateString);
  //           }}
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

  const renderViewPhotoAndDescriptionProduct = () => {
    return (
      <View>
        <Jumbotron text="PAYMENT" />
        <View style={styles.styleWrapperImageAndContent}>
          <Image
            source={
              dataProduct.image === ''
                ? images.imageprofile
                : {uri: dataProduct.image}
            }
            style={{
              width: WIDTH * 0.48,
              height: HEIGHT * 0.3,
              marginRight: WIDTH * 0.02,
              // borderRadius: WIDTH * 0.03,
              borderTopLeftRadius: WIDTH * 0.08,
              borderTopRightRadius: WIDTH * 0.08,
              borderBottomLeftRadius: WIDTH * 0.08,
              borderBottomRightRadius: WIDTH * 0.08,
            }}
          />
          <Text style={styles.styleContentPayment}>
            {dataProduct.keterangan === ''
              ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
              : dataProduct.keterangan}
          </Text>
        </View>

        <Text
          style={{
            marginTop: HEIGHT * 0.02,
            marginBottom: HEIGHT * 0.15,
            color: colors.darkGreyBlue,
            fontSize: HEIGHT * 0.03,
            textAlign: 'center',
            fontFamily: fonts.BebasNeueRegular,
          }}>
          {dataProduct.namaProduct}
        </Text>
      </View>
    );
  };

  const renderViewOrder = () => {
    return (
      <View style={styles.styleWrapperOrderBarang}>
        <Jumbotron
          text={isBuyProduct ? 'DETAIL ORDER' : 'ORDER BARANG'}
          styleJumbotron={[
            styles.styleJumbotron,
            {width: WIDTH, height: HEIGHT * 0.08},
          ]}
        />

        <CustomBoxTwoItem
          textItemLeft="Nama Pesanan"
          buttonDisable={true}
          textItemRight={dataProduct.namaProduct}
        />

        <CustomBoxTwoItem
          textItemLeft="Nama Member"
          buttonDisable={true}
          textItemRight={dataProduct.namaMember}
        />

        {isVisibleFormChanger && type === 'No Rekening' ? (
          <CustomTextInput
            nameIconLeft="no rekening"
            colorIconLeft={colors.white}
            sizeIconLeft={HEIGHT * 0.03}
            placeholder="No Rekening"
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
            onChangeText={text => setNoRekPembayaran(text)}
          />
        ) : (
          <CustomBoxTwoItem
            textItemLeft="Nama Rek Pembayaran"
            bgColorTwoItem={noRekPembayaran !== '' ? true : false}
            colorTwoItem={noRekPembayaran !== '' ? true : false}
            buttonDisable={isLoadingBuyProduct}
            textItemRight={
              noRekPembayaran !== '' ? noRekPembayaran : 'Wajib diisi!'
            }
            onPick={() => {
              handleFormChanger('No Rekening');
            }}
          />
        )}

        <CustomBoxTwoItem
          textItemLeft="Tanggal Pembayaran"
          buttonDisable={true}
          textItemRight={tglPembayaran}
        />

        <CustomBoxTwoItem
          textItemLeft="Jumlah"
          buttonDisable={isLoadingBuyProduct}
          textItemRight={mount}
          onPick={() => handleModalCheckBox('mount')}
        />

        <CustomBoxTwoItem
          textItemLeft="Total Order"
          buttonDisable={true}
          textItemRight={`Rp. ${convertToRupiah(totalOrder.toString())}`}
          // textItemRight={`Rp. ${
          //   totalOrder !== 0
          //     ? convertToRupiah(totalOrder.toString())
          //     : convertToRupiah(
          //         dataProduct.hargaProduct !== ''
          //           ? dataProduct.hargaProduct
          //           : '0',
          //       )
          // },-`}
        />

        {/* <CustomBoxTwoItem
          textItemLeft={
            isBuyProduct ? 'BUKTI TRANSFER' : 'UPLOAD BUKTI TRANSFER'
          }
          textItemRight="PILIH FILE"
          onPick={handleBuktiTransfer}
          enableItemTwo={
            isResultPickBuktiTransfer?.uri !== undefined ? false : true
          }
        /> */}

        {/* {renderViewImageBuktiTransfer()} */}
        {renderViewAfterBuyProduct()}
        {renderViewBeforeBuyProduct()}
      </View>
    );
  };

  // const renderViewImageBuktiTransfer = () => {
  //   return (
  //     <View>
  //       {isResultPickBuktiTransfer.uri !== undefined && (
  //         <ButtonPicker
  //           disabled={isLoadingBuyProduct}
  //           empty={false}
  //           onPick={() =>
  //             isLoadingBuyProduct
  //               ? console.log('Sedang Proses')
  //               : handleBuktiTransfer()
  //           }
  //           sourceImage={{uri: isResultPickBuktiTransfer?.uri}}
  //         />
  //       )}

  //       {isResultPickBuktiTransfer.uri === undefined && (
  //         <ButtonPicker text="PHOTOS NOT FOUND!" disabled={true} />
  //       )}
  //     </View>
  //   );
  // };

  const renderViewAfterBuyProduct = () => {
    return (
      <View>
        {isBuyProduct && (
          <CustomBoxMessage
            styleCustomBoxMessage={{
              backgroundColor: 'transparent',
              marginTop: HEIGHT * 0.03,
              marginBottom: HEIGHT * 0.03,
            }}
            styleTextMessage={{
              textAlign: 'center',
              color: colors.reddish,
              fontSize: HEIGHT * 0.027,
            }}
            text="JANGAN LUPA UNTUK DI SCREENSHOOT DAN KIRIM KE ADMIN"
            type="failed"
          />
        )}
      </View>
    );
  };

  const renderViewBeforeBuyProduct = () => {
    return (
      <View>
        {!isBuyProduct && (
                <ButtonCustom
                title="BELI SEKARANG"
                color={colors.darkGreyBlue}
                buttonStyle={styles.styleButtonLogin}
                textStyle={styles.styleTextButtonLogin}
                onPress={() => handleBuyNow()}
              />
        )}
    </View>
    );
  };

  const renderAlerMessage = () => {
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
        type="success"
        titleContent="PEMBAYARAN BERHASIL"
        visible={isVisibleModalBuyNow}
        dismissable={false}
        enableClose={false}
        onSubmit={() => handleSubmitCekDetail()}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    wait(5000).then(() => {
      handleProductsById();
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
        {renderViewPhotoAndDescriptionProduct()}
        {renderViewOrder()}
      </ScrollView>
      {renderAlerMessage()}
      {renderModalCheckBox()}
      {renderPopUpMessage()}
      {renderLoader()}
      {/* {renderModalDate()} */}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleContainerModalCheckBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: HEIGHT * 0.2,
    width: WIDTH * 0.9,
    alignSelf: 'center',
    borderRadius: HEIGHT * 0.01,
  },
  styleWrapperModalCheckBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT * 0.01,
  },
  styleWrapperImageAndContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.03,
    marginTop: HEIGHT * 0.03,
    alignItems: 'center',
  },
  styleContentPayment: {
    width: WIDTH * 0.43,
    height: HEIGHT * 0.27,
    fontSize: HEIGHT * 0.02,
    color: colors.black,
    fontFamily: fonts.BebasNeueRegular,
  },
  styleImageProfilePayment: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.2,
  },
  styleJumbotron: {
    position: 'absolute',
    zIndex: 1,
    top: HEIGHT * -0.06,
    backgroundColor: colors.white,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: HEIGHT * 0.04,
    width: WIDTH * 0.94,
    alignSelf: 'center',
    height: HEIGHT * 0.07,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    elevation: 10,
  },
  styleTextJumbotron: {
    textAlign: 'center',
  },
  styleWrapperOrderBarang: {
    paddingTop: HEIGHT * 0.04,
    backgroundColor: colors.white,
  },
  styleButtonLogin: {
    height: HEIGHT * 0.07,
    marginTop: HEIGHT * 0.02,
    marginBottom: HEIGHT * 0.02,
    marginHorizontal: WIDTH * 0.05,
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
