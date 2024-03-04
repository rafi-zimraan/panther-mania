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
} from 'react-native';
import {BackgroundImage, Gap, Header, ButtonAction} from '../../components';
import {colors} from '../../utils/constant';
import {IconCoffe} from '../../assets';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

export default function KeranjangDetails({navigation, route}) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const isImageSelected = () => selectedImage != null;
  const token = useSelector(state => state.auth.token);
  const [dataDetailOrder, setDataDetailOrder] = useState([]);
  const {order_id} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showToas = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const handleUpload = () => {
    if (isImageSelected()) {
      handleBuktiTranfer();
      showToas('Sukses upload  bukti tranfer');
      navigation.replace('Home');
    } else {
      Alert.alert('Peringatan!', 'Upload bukti tranfer terlebih dahulu');
    }
  };

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
      `https://panther-mania.id/api/v1/riwayat_order/${order_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('data detail', result.data);
        setDataDetailOrder(result.data);
      })
      .catch(error => {
        console.error(error);
        return error.message;
      });
  };

  // ! Image bukti transfer
  const handleBuktiTranfer = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    const formdata = new FormData();
    formdata.append('bukti transfer', selectedImage);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `https://panther-mania.id/api/v1/upload_bukti_transfer/${order_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        // ToastAndroid.show(`${result.message}`, ToastAndroid.LONG);
        // setUploadImageTransfer(result.status);
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
    handleBuktiTranfer();
  }, []);

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <Header
          title="Detail Riwayat Order"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View style={styles.viewImgKeranjang}>
            <Image source={IconCoffe} style={{height: '100%', width: 100}} />
          </View>
          <View style={styles.viewContentProduct}>
            <Text style={styles.titleFont}>
              Tumbler Special Editon 11 Tahun PMJR
            </Text>
            <Gap height={12} />
            <Text style={styles.description}>
              Jumlah pembelian: {dataDetailOrder.jumlah}
            </Text>
            <Text style={styles.description}>
              Keterangan: {dataDetailOrder.keterangan}
            </Text>
            <Gap height={4} />
            <Text style={styles.price}>
              Total permbelian: Rp.{dataDetailOrder.total}
            </Text>
          </View>
          {/* ! button check details */}
          {selectedImage ? (
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={styles.expendedImage}>
              <Image
                source={{uri: selectedImage?.uri}}
                style={{height: '100%', width: '100%'}}
                //   style={styles.expendedImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonDetails}
              onPress={() => handleImagePicker()}>
              <Text style={{fontSize: 10, color: colors.white}}>
                Upload Bukti tranfers
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Gap height={20} />
        <ButtonAction title="Kirim Data" onPress={() => handleUpload()} />
        <Gap height={30} />
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.ContainerModal}>
          <TouchableOpacity
            style={styles.modalCloseView}
            onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalCloseText}>Kembali</Text>
          </TouchableOpacity>
          <Image
            source={{uri: selectedImage?.uri}}
            style={{
              //   flex: 1,
              //   resizeMode: 'contain',
              height: 590,
              width: 300,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalCloseView: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  ContainerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  expendedImage: {
    height: '25%',
    width: '18%',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    top: 137,
    borderWidth: 1,
    borderColor: colors.black,
  },
  buttonDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 110,
    borderRadius: 25,
    backgroundColor: colors.destroy,
    position: 'absolute',
    top: 149,
    right: 25,
  },
  description: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
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
    height: 170,
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
