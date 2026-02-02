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
import {useSelector} from 'react-redux';
import HTML from 'react-native-render-html';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {BackgroundImage, Header, ButtonAction, Gap} from '../../components';
import {colors} from '../../utils/constant';
import {ImgNotAvailable} from '../../assets';
import {useOrientation} from '../../hooks';

export default function KeranjangDetails({navigation, route}) {
  const token = useSelector(state => state.auth.token);
  const {width} = useOrientation();
  const {id_order} = route.params;

  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await fetch(
        `https://panther-mania.id/api/v1/riwayat_order/${id_order}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const json = await res.json();
      setData(json.data);
      if (json?.data?.bukti_transfer) {
        setUploadedImage(json.data.bukti_transfer);
      }
    } catch (e) {
      console.log('Detail order error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const sanitizeHtml = html =>
    html
      ?.replace(/<font[^>]*>/gi, '')
      .replace(/<\/font>/gi, '')
      .replace(/&nbsp;/gi, ' ')
      .trim();

  const openPicker = async type => {
    const picker =
      type === 'camera'
        ? launchCamera({mediaType: 'photo', quality: 0.3})
        : launchImageLibrary({mediaType: 'photo', quality: 0.3});

    const {assets} = await picker;
    if (assets && assets.length > 0) {
      const {uri, type, fileName} = assets[0];
      setSelectedImage({uri, type, name: fileName});
    }
  };

  const pickImage = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

    Alert.alert('Upload Bukti Transfer', '', [
      {text: 'Kamera', onPress: () => openPicker('camera')},
      {text: 'Galeri', onPress: () => openPicker('gallery')},
      {text: 'Batal', style: 'cancel'},
    ]);
  };

  const uploadBukti = async () => {
    if (!selectedImage) {
      Alert.alert('Peringatan', 'Pilih gambar terlebih dahulu');
      return;
    }

    const formData = new FormData();
    formData.append('bukti transfer', selectedImage);

    try {
      const res = await fetch(
        `https://panther-mania.id/api/v1/upload_bukti_transfer/${id_order}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      const json = await res.json();
      ToastAndroid.show(json.message, ToastAndroid.LONG);
      navigation.goBack();
    } catch (e) {
      console.log('Upload error:', e);
    }
  };

  const deleteOrder = () => {
    Alert.alert('Hapus Order', 'Yakin ingin menghapus order ini?', [
      {text: 'Batal'},
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          await fetch(`https://panther-mania.id/api/v1/hide/${id_order}`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`},
          });
          navigation.goBack();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <Header title="Detail Riwayat Order" onPress={navigation.goBack} />

      <ScrollView>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={
              data?.produk?.gambar
                ? {
                    uri: `https://panther-mania.id/images/products/${data.produk.gambar}`,
                  }
                : ImgNotAvailable
            }
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.heroImage}
          />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>{data?.produk?.nama_produk}</Text>

          <HTML
            source={{html: sanitizeHtml(data?.produk?.deskripsi)}}
            contentWidth={width - 32}
            baseStyle={styles.desc}
            ignoredDomTags={['font']}
          />

          <View style={styles.meta}>
            <Text style={styles.label}>Lokasi</Text>
            <Text style={styles.value}>{data?.keterangan || '-'}</Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.price}>
              Rp {Number(data?.produk?.harga || 0).toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {!uploadedImage && (
          <ButtonAction title="Upload Bukti Transfer" onPress={pickImage} />
        )}

        {selectedImage && (
          <ButtonAction title="Kirim Bukti Transfer" onPress={uploadBukti} />
        )}

        {uploadedImage && (
          <ButtonAction
            title="Hapus Order"
            backgroundColor="tomato"
            onPress={deleteOrder}
          />
        )}

        <Gap height={30} />
      </ScrollView>

      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}>
          <ImageBackground
            source={{
              uri: uploadedImage
                ? `https://www.panther-mania.id/images/orders/${uploadedImage}`
                : data?.produk?.gambar
                ? `https://panther-mania.id/images/products/${data.produk.gambar}`
                : '',
            }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}>
            <Text style={styles.closeText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: colors.grey,
  },
  card: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  meta: {
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  value: {
    fontSize: 14,
    color: '#111',
  },
  priceBox: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
  },
  closeBtn: {
    marginTop: 20,
  },
  closeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
