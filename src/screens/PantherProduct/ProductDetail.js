import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Platform,
  UIManager,
  LayoutAnimation,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BackgroundImage, ButtonAction, Gap, Header} from '../../components';
import HTML from 'react-native-render-html';
import {useOrientation} from '../../hooks';
import {KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function ProductDetail({route, navigation}) {
  const token = useSelector(state => state.auth.token);
  const {nama_lengkap} = useSelector(state => state.auth.user_data) || {};
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

  const [showDesc, setShowDesc] = useState(false);
  const [isKeterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState(0);

  const handleCheckOut = () => {
    if (!isKeterangan.trim() || jumlah === 0) {
      Alert.alert(
        'Perhatian',
        'Silahkan masukan keterangan dan jumlah produck yang akan dibeli',
        [{text: 'Ok'}],
        [{cancelable: true}],
      );
      return;
    }

    const id_product = route.params.product.id;
    const jumlahToSend = jumlah;
    const keteranganToSend = isKeterangan;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append('keterangan', keteranganToSend);
    formdata.append('jumlah', jumlahToSend.toString());

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: myHeaders,
    };

    fetch(
      `https://panther-mania.id/api/v1/checkout/${id_product}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        // console.log(result.status);
        Alert.alert(
          'Berhasil Membeli Product ',
          '',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        console.log('error mass bro..', error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
                <HTML
                  source={{html: deskripsi}}
                  contentWidth={width}
                  baseStyle={{color: 'black'}}
                  customHTMLElementModels={{}}
                  ignoredDomTags={['font']}
                  tagsStyles={{
                    p: {fontSize: 14, textAlign: 'center'},
                    li: {fontSize: 16},
                  }}
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
                <Text style={{color: 'black'}}>{nama_lengkap}</Text>
              </View>
              <View style={styles.viewRecipt}>
                <Text style={{color: 'black'}}>No Rek Pembayaran</Text>
                <Text style={{color: 'black'}}>09123091238</Text>
              </View>
              <View style={styles.viewRecipt}>
                <Text style={{color: 'black'}}>Tanggal pembayaran</Text>
                <Text style={{color: 'black'}}>
                  {new Date().toDateString()}
                </Text>
              </View>
              <View style={styles.viewRecipt}>
                <Text style={{color: 'black'}}>Jumlah</Text>
                <TextInput
                  placeholder="Jumlah nomimal"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  value={jumlah === 0 ? '' : jumlah.toString()}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    if (/^\d*$/.test(text)) {
                      // Menggunakan regex untuk memastikan hanya angka yang valid diizinkan
                      if (text === '') {
                        setJumlah(0);
                      } else {
                        setJumlah(Math.max(1, parseInt(text)));
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
                  placeholderTextColor="grey"
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
    </KeyboardAvoidingView>
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
    padding: 10,
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
