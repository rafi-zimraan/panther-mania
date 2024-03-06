import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BackgroundImage, Gap, Header} from '../../components';
import {IconCoffe} from '../../assets';
import {colors} from '../../utils/constant';
import {useSelector} from 'react-redux';
import HTML from 'react-native-render-html';
import {useOrientation} from '../../hooks';

export default function Keranjang({navigation}) {
  const token = useSelector(state => state.auth.token);
  const [orderProduct, setOderProduct] = useState([]);
  const {width} = useOrientation();

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  // Transaksi Order
  const hanldeRiwayatOrder = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://panther-mania.id/api/v1/riwayat_order', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.data);
        setOderProduct(result.data);
      })
      .catch(error => {
        console.error(error);
        return error.message;
      });
  };

  useEffect(() => {
    hanldeRiwayatOrder();
  }, []);

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      {ready ? (
        <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
          <Header title="Riwayat Order" onPress={() => navigation.goBack()} />
          {orderProduct.map((val, ind) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate('KeranjangDetails', {
                    id_order: val.id_order,
                  })
                }
                key={ind}>
                <Image
                  source={{
                    uri: `${'https://panther-mania.id'}/images/products/${
                      val.produk?.gambar
                    }`,
                  }}
                  style={{height: '100%', width: 100}}
                  defaultSource={IconCoffe}
                />
                <View style={styles.viewContentProduct}>
                  <Text style={styles.titleFont}>
                    {val.produk?.nama_produk}
                  </Text>
                  <Gap height={12} />
                  {val.produk?.deskripsi ? (
                    <HTML
                      source={{html: val.produk?.deskripsi}}
                      contentWidth={width}
                      baseStyle={{color: 'black'}}
                      tagsStyles={{p: {margin: 0, padding: 0}}} // menambahkan gaya untuk tag 'p'
                      customHTMLElementModels={{}}
                    />
                  ) : (
                    <Text>No description avilable</Text>
                  )}
                  <Gap height={2} />
                  <Text style={styles.keterangan}>
                    Keterangan: {val.keterangan}
                  </Text>
                  <Gap height={2} />
                  <Text style={styles.price}>Rp.{val.produk?.harga}</Text>
                </View>
                <Image
                  source={
                    val?.bukti_transfer
                      ? {
                          uri: `https://www.panther-mania.id/images/orders/${val.bukti_transfer}`,
                        }
                      : IconCoffe
                  }
                  style={styles.imgBuktiTf}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.textLoading}>Memuat formulir</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imgBuktiTf: {
    height: 40,
    width: 40,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 20,
    right: 25,
    borderWidth: 1,
    borderColor: colors.black,
  },
  keterangan: {
    color: 'black',
    fontSize: 14,
  },
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

  description: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    color: colors.grey,
    fontSize: 14,
    fontWeight: '700',
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
