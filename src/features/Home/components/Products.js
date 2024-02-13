import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IconUser, ImgShirt} from '../../../assets';
import {Gap} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {fetchProduct} from '../../PantherProduct/services/pantherProductServices';
import {colors} from '../../../utils/constant';
import {API_KEY_IMAGE} from '@env';
import {useCurrencyFormat} from '../../../hooks';

export default function Products() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {status, data} = useSelector(state => state.panther_product);

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchProduct());
    }
  }, [dispatch]);

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textTitle}>Produk Panther Mania</Text>
        <ActivityIndicator
          color={colors.primary}
          size="small"
          animating={status == 'pending'}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewProduct}>
        {data?.slice(0, 4).map((v, i) => (
          <TouchableNativeFeedback
            key={i}
            useForeground
            onPress={() => navigate('ProductDetail', {product: v})}>
            <View style={styles.btnProduct}>
              <Image
                source={{
                  uri: `${'https://panther-mania.id'}/images/products/${
                    v.gambar
                  }`,
                }}
                style={styles.imgProduct}
              />

              <Text style={styles.textProductTitle} numberOfLines={2}>
                {v.nama_produk}
              </Text>
              <Text style={styles.textPrice}>{useCurrencyFormat(v.harga)}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
        {data && (
          <TouchableNativeFeedback
            useForeground
            onPress={() => navigate('PantherProduct')}>
            <View style={styles.btnViewMore}>
              <Icon
                name={'chevron-right'}
                color={'black'}
                size={50}
                style={styles.icon}
              />
            </View>
          </TouchableNativeFeedback>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textPrice: {
    fontWeight: 'bold',
    color: 'green',
    margin: 2.5,
  },
  imgProduct: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
  },
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnViewMore: {
    backgroundColor: 'white',
    elevation: 3,
    overflow: 'hidden',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    margin: 10,
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
    width: 200,
    height: 250,
    margin: 10,
    overflow: 'hidden',
    padding: 10,
  },
  viewProduct: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    height: 290,
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#183240',
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
