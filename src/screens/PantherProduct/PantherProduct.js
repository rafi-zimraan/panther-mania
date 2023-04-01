import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {BackgroundImage, Header} from '../../components';
import {ImgShirt} from '../../assets';
import {useCurrencyFormat, useOrientation} from '../../hooks';
import {useSelector} from 'react-redux';

export default function PantherProduct({navigation}) {
  const {data} = useSelector(state => state.panther_product);
  const {width} = useOrientation();

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Produk Panther" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.viewProduct}>
            {data?.map((v, i) => (
              <TouchableNativeFeedback
                key={i}
                useForeground
                onPress={() =>
                  navigation.navigate('ProductDetail', {product: v})
                }>
                <View style={{...styles.btnProduct, width: width / 2.4}}>
                  <Image source={ImgShirt} style={styles.imgProduct} />
                  <Text style={styles.textProductTitle} numberOfLines={2}>
                    {v.nama_produk}
                  </Text>
                  <Text style={styles.textPrice}>
                    {useCurrencyFormat(v.harga)}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textPrice: {
    fontWeight: 'bold',
    color: 'green',
  },
  imgProduct: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
  },
  textProductTitle: {
    fontWeight: '500',
    color: 'black',
    marginVertical: 5,
    flex: 1,
  },
  btnProduct: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    height: 220,
    margin: 10,
    overflow: 'hidden',
    padding: 10,
    maxWidth: 180,
  },
  container: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    // backgroundColor: 'aqua',
  },
});
