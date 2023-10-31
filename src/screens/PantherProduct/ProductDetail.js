import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  ActivityIndicator,
  Platform,
  UIManager,
  LayoutAnimation,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {Children, useState} from 'react';
import {BackgroundImage, ButtonAction, Gap, Header} from '../../components';
import {ImgShirt} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HTML from 'react-native-render-html';
import {useOrientation} from '../../hooks';
import {Linking} from 'react-native';
import {colors} from '../../utils/constant';
import {useDispatch} from 'react-redux';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function ProductDetail({route, navigation}) {
  const {width} = useOrientation();
  const {
    id,
    uuid,
    id_kategori,
    nama_produk,
    produk_seo,
    deskripsi,
    harga,
    gambar,
    public: _public,
    whatsapp,
    created_at,
    updated_at,
  } = route.params.product;

  const [isKeterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState(0); // State untuk menyimpan nilai jumlah barang

  const handleCheckOut = () => {
    const id_product = route.params.product.id;
    const jumlahToSend = jumlah; // Menggunakan nilai jumlah dari state
    const keteranganToSend = isKeterangan; // Menggunakan nilai keterangan dari state

    var formdata = new FormData();
    formdata.append('keterangan', keteranganToSend); // Menggunakan nilai keterangan dari state
    formdata.append('jumlah', jumlahToSend.toString()); // Menggunakan nilai jumlah dari state

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `https://panther-mania.id/api/v1/checkout/${id_product}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        ToastAndroid.show('Suksess', ToastAndroid.SHORT);
        console.log(result);
        handleWhatsApp();
      })
      .catch(error => {
        console.log('error mass bro..', error);
      });
  };

  const [showDesc, setShowDesc] = useState(false);

  async function handleWhatsApp() {
    // const number = whatsapp.slice(1, whatsapp?.lenght);
    const message = `Permisi, Saya ingin membeli produk panther-mania. Berikut produk yang saya beli ${nama_produk} dengan harga senilai ${harga}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/62821-7895-9678?text=${encodedMessage}`;
    await Linking.openURL(url);
  }
  console.log('tes', deskripsi);
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Produk" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.viewImgProduct}>
            <Image
              source={{
                uri: `${'https://panther-mania.id'}/images/products/${gambar}`,
              }}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Text style={styles.textProductTitle}>{nama_produk}</Text>
          <TouchableNativeFeedback
            useForeground
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setShowDesc(!showDesc);
            }}>
            <View style={{...styles.containerDesc}}>
              {/* <Text style={styles.paragraphStyle}>{deskripsi}</Text> */}

              <HTML
                source={{html: deskripsi}}
                contentWidth={width}
                baseStyle={{color: 'black'}}
                customHTMLElementModels={'font'}
                // renderers={{
                //   p: (htmlAttribs, children, passProps) => (
                //     <Text key={passProps} style={styles.paragraphStyle}>
                //       {children}
                //     </Text>
                //   ),
                // }}
              />

              {/* <Text style={{color: 'black'}}>
                {deskripsi.slice(0, 40)}
                {!showDesc ? '...' : ''}
              </Text>
              {showDesc && (
                <Text style={{color: 'black'}}>
                  {deskripsi.slice(40, deskripsi.length)}
                </Text>
              )}
              <View style={styles.viewMore}>
                <Text style={{color: 'black'}}>
                  {showDesc ? 'Sembunyikan' : 'Lihat'} Deskripsi{' '}
                </Text>
                <Icon
                  name={showDesc ? 'chevron-up' : 'chevron-down'}
                  color="black"
                  size={20}
                />
              </View> */}
            </View>
          </TouchableNativeFeedback>
          <View style={{padding: 20}}>
            <Text style={styles.textOrderTitle}>Order Barang</Text>
            <Gap height={20} />
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Nama produk</Text>
              <Text style={{color: 'black', maxWidth: 150}} numberOfLines={1}>
                {nama_produk}
              </Text>
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Nama member</Text>
              <Text style={{color: 'black'}}>Member Masbro</Text>
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>No Rek Pembayaran</Text>
              <Text style={{color: 'black'}}>09123091238</Text>
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Tanggal pembayaran</Text>
              <Text style={{color: 'black'}}>{new Date().toDateString()}</Text>
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Jumlah</Text>
              <TextInput
                placeholder="Masukkan jumlah"
                style={styles.textInput}
                value={jumlah === 0 ? '' : jumlah.toString()} // Mengizinkan input kosong jika jumlah adalah 0
                onChangeText={text => {
                  if (/^\d*$/.test(text)) {
                    // Menggunakan regex untuk memastikan hanya angka yang valid diizinkan
                    if (text === '') {
                      setJumlah(0); // Setel ke 0 jika input kosong
                    } else {
                      setJumlah(Math.max(1, parseInt(text))); // Gunakan Math.max untuk memastikan angka minimum adalah 1
                    }
                  }
                }}
              />
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Total order</Text>
              <Text style={{color: 'black'}}>Rp {harga},-</Text>
            </View>
            <View style={styles.viewReciptKet}>
              <Text style={{color: 'black'}}>keterangan</Text>
              <TextInput
                placeholder="tuliskan keterangan"
                multiline={true}
                style={styles.textInput}
                onChangeText={text => {
                  setKeterangan(text);
                }}
                value={isKeterangan}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <ButtonAction title="Beli Sekarang" onPress={handleCheckOut} />
      <Gap height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  containerDesc: {
    overflow: 'hidden',
    margin: 10,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 20,
    padding: 20,
  },
  paragraphStyle: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
    color: 'black',
  },
  textBtnPurchase: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 17,
  },
  btnPurchase: {
    backgroundColor: '#183240',
    margin: 20,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    elevation: 3,
    marginTop: 0,
  },
  viewRecipt: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  viewReciptKet: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    marginLeft: 90,
    flex: 1,
    color: 'black',
  },
  textOrderTitle: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    borderWidth: 1,
    elevation: 3,
  },
  textProductTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  viewImgProduct: {
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 520,
  },
});
