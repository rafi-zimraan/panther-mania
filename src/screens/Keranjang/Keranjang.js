import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {BackgroundImage, ButtonAction, Gap, Header} from '../../components';
import {IconCoffe} from '../../assets';
import {colors} from '../../utils/constant';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export default function Keranjang({navigation}) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Image handler
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

  const isImageSelected = () => selectedImage != null;

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
      showToas('Sukses upload  bukti tranfer');
      navigation.replace('RiwayatPembelian');
    } else {
      Alert.alert('Peringatan!', 'Upload bukti tranfer terlebih dahulu');
    }
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <Header title="Pesanan Saya" onPress={() => navigation.goBack()} />
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('KeranjangDetails')}>
          <View style={styles.viewImgKeranjang}>
            <Image source={IconCoffe} style={{height: '100%', width: 100}} />
          </View>
          <View style={styles.viewContentProduct}>
            <Text style={styles.titleFont}>
              Tumbler Special Editon 11 Tahun PMJR
            </Text>
            <Gap height={12} />
            <Text style={styles.description}>
              keterangan: Ingin mempunyai kualitas bagus
            </Text>
            <Gap height={4} />
            <Text style={styles.price}>Rp. 160000</Text>
            {/* ! button check details */}
            {selectedImage ? (
              <Image
                source={{uri: selectedImage?.uri}}
                style={styles.expendedImage}
              />
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
        </TouchableOpacity>
        <Gap height={380} />
        <ButtonAction
          title="Upload bukti tranfer"
          onPress={() => handleUpload()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  expendedImage: {
    height: '45%',
    width: '30%',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 10,
    top: 93,
    borderWidth: 1,
    borderColor: colors.black,
  },
  buttonDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 109,
    borderRadius: 25,
    backgroundColor: colors.destroy,
    position: 'absolute',
    top: 130,
    right: 15,
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
    elevation: 2,
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
