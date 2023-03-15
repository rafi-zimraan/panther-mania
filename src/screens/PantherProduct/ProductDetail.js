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
} from 'react-native';
import React, {useState} from 'react';
import {BackgroundImage, Gap, Header} from '../../components';
import {ImgShirt} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function ProductDetail({route, navigation}) {
  const [showDesc, setShowDesc] = useState(false);

  const productDesc =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat. Duis auteirure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur. Excepteur sint occaecatcupidatat non proident, sunt in culpa qui officia deseruntmollit anim id est laborum.';

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Produk" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.viewImgProduct}>
            <Image source={ImgShirt} style={{width: '100%', height: '100%'}} />
          </View>
          <Text style={styles.textProductTitle}>Baju Kemeja Member</Text>
          <TouchableNativeFeedback
            useForeground
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setShowDesc(!showDesc);
            }}>
            <View style={{...styles.containerDesc}}>
              <Text style={{color: 'black'}}>
                {productDesc.slice(0, 40)}
                {!showDesc ? '...' : ''}
              </Text>
              {showDesc && (
                <Text style={{color: 'black'}}>
                  {productDesc.slice(40, productDesc.length)}
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
              </View>
            </View>
          </TouchableNativeFeedback>
          <View style={{padding: 20}}>
            <Text style={styles.textOrderTitle}>Order Barang</Text>
            <Gap height={20} />
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Nama produk</Text>
              <Text style={{color: 'black'}}>Baju Kemeja Member</Text>
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
              <Text style={{color: 'black'}}>1</Text>
            </View>
            <View style={styles.viewRecipt}>
              <Text style={{color: 'black'}}>Total order</Text>
              <Text style={{color: 'black'}}>Rp 250.000,-</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableNativeFeedback useForeground>
        <View style={styles.btnPurchase}>
          <Text style={styles.textBtnPurchase}>Beli Sekarang</Text>
          {/* <ActivityIndicator style={styles.textBtnPurchase} color={'white'} /> */}
        </View>
      </TouchableNativeFeedback>
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
    marginTop: -70,
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 520,
  },
});
