import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import {BackgroundImage, Gap, Header, ButtonAction} from '../../components';
import {colors} from '../../utils/constant';
import {IconCoffe, ImgAppLogo} from '../../assets';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import HTML from 'react-native-render-html';
import {useOrientation} from '../../hooks';

export default function KeranjangDetails({navigation, route}) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const isImageSelected = () => selectedImage != null;
  const token = useSelector(state => state.auth.token);
  const [dataDetailOrder, setDataDetailOrder] = useState(null);
  const {id_order} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {width} = useOrientation();
  const [imageUploaded, setImageUploaded] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  // ! Image handler
  async function handleImagePicker() {
    // Capture or select an image
    const imagePicker = async from => {
      try {
        const menthod =
          from == 'gallery'
            ? launchImageLibrary({mediaType: 'photo', quality: 0.2})
            : launchCamera({mediaType: 'photo', quality: 0.2});
        const {assets} = await menthod;
        if (assets) {
          const {fileName: name, uri, type} = assets[0];
          setSelectedImage({uri, name, type});
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Camera Permission
    const PermissionCamera = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imagePicker('camera');
      }
    };

    Alert.alert(
      '',
      'Ambil dari gambar...',
      [
        {
          text: 'Kamera',
          onPress: () => PermissionCamera(),
        },
        {
          text: 'Galeri',
          onPress: () => imagePicker('gallery'),
        },
      ],
      {cancelable: true},
    );
  }

  // ! Detail Order
  const handleDetailOrder = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://panther-mania.id/api/v1/riwayat_order/${id_order}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setDataDetailOrder(result.data);
        if (result?.data?.bukti_transfer) {
          setImageUploaded(result.data.bukti_transfer);
        }
      })
      .catch(error => {
        console.error(error);
        return error.message;
      });
  };

  // ! Image bukti transfer
  const handleBuktiTranfer = () => {
    const formdata = new FormData();
    let uploadImage = {
      uri: selectedImage?.uri,
      type: selectedImage?.type,
      name: selectedImage?.name,
    };
    formdata.append('bukti transfer', uploadImage);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    };
    // console.log(requestOptions);

    fetch(
      `https://panther-mania.id/api/v1/upload_bukti_transfer/${id_order}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        if (!isImageSelected()) {
          // No image selected, show alert
          Alert.alert('Peringatan !', 'Upload bukti transfer terlebih dahulu');
        } else if (result.status === 'success') {
          // Image upload success
          ToastAndroid.show(result.message, ToastAndroid.LONG);
          navigation.goBack();
        } else {
          // Image upload failed
          ToastAndroid.showWithGravity(
            result.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.error(error);
        return error.message;
      });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    handleDetailOrder();
  }, []);

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      {ready ? (
        <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
          <Header
            title="Detail Riwayat Order"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.container}>
            <View style={styles.viewImgKeranjang}>
              <Image
                source={{
                  uri: `${'https://panther-mania.id'}/images/products/${
                    dataDetailOrder?.produk?.gambar || ''
                  }`,
                }}
                style={{height: 221, width: 100}}
                defaultSource={IconCoffe}
              />
            </View>
            <View style={styles.viewContentProduct}>
              <Text style={styles.titleFont}>
                {dataDetailOrder?.produk?.nama_produk ||
                  'Product Name Not Available'}
              </Text>
              <Gap height={12} />
              <HTML
                key={dataDetailOrder?.produk?.deskripsi}
                source={{html: dataDetailOrder?.produk?.deskripsi || ''}}
                contentWidth={width}
                baseStyle={{color: 'black'}}
                tagsStyles={{
                  p: {margin: 0, padding: 0, color: 'black', fontSize: 14},
                }}
                customHTMLElementModels={{}}
              />
              <Gap height={5} />
              <Text style={styles.keterangan}>
                keterangan:{' '}
                {dataDetailOrder?.keterangan || 'Description Not Available'}
              </Text>
              <Gap height={5} />
              <Text style={styles.price}>
                harga: Rp.
                {dataDetailOrder?.produk?.harga || 'Price Not Available'}
              </Text>
            </View>
            {imageUploaded || selectedImage ? (
              <TouchableOpacity
                onPress={() => toggleModal()}
                style={styles.expendedImage}>
                <Image
                  source={{
                    uri: imageUploaded
                      ? `https://www.panther-mania.id/images/orders/${imageUploaded}`
                      : selectedImage?.uri,
                  }}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonUploadTF}
                onPress={() => handleImagePicker()}>
                <Text style={{fontSize: 10, color: colors.white}}>
                  Upload Bukti tranfers
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Gap height={20} />
          <ButtonAction
            title="Kirim Data"
            onPress={() => handleBuktiTranfer()}
          />
          <Gap height={30} />
        </ScrollView>
      ) : (
        <Text style={styles.textLoading}>Memuat formulir</Text>
      )}

      {/* Modal Image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.ContainerModal}>
          {(imageUploaded || selectedImage) && (
            <ImageBackground
              source={{
                uri: imageUploaded
                  ? `https://www.panther-mania.id/images/orders/${imageUploaded}`
                  : selectedImage?.uri,
              }}
              resizeMode={isImageZoomed ? 'contain' : 'cover'}
              style={{
                // flex: 1,
                height: isImageZoomed ? undefined : 550,
                width: isImageZoomed ? undefined : 300,
              }}>
              <TouchableOpacity
                style={styles.modalCloseView}
                onPress={() => {
                  setIsModalVisible(false);
                }}>
                <Text style={styles.modalCloseText}>{'Tutup'}</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
      </Modal>
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
  modalCloseView: {
    position: 'absolute',
    top: 20,
    padding: 10,
    borderRadius: 5,
  },
  ContainerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 19,
    bottom: 20,
    height: 26,
    borderRadius: 10,
    width: 50,
    fontWeight: '800',
    color: 'black',
  },
  expendedImage: {
    height: '25%',
    width: '18%',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    top: 177,
    borderWidth: 1,
    borderColor: colors.black,
  },
  buttonUploadTF: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 110,
    borderRadius: 25,
    backgroundColor: colors.destroy,
    position: 'absolute',
    top: 207,
    right: 22,
  },
  keterangan: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: '600',
  },
  titleFont: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.black,
  },
  viewContentProduct: {
    backgroundColor: colors.white,
    width: 230,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 10,
    padding: 10,
    borderWidth: 0.3,
    borderColor: colors.black,
  },
  viewImgKeranjang: {
    backgroundColor: colors.white,
    height: 222,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    borderWidth: 0.4,
    borderColor: colors.black,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    padding: 15,
    flexDirection: 'row',
  },
});
