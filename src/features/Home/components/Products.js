import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {ImgShirt} from '../../../assets';
import {Gap} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Products() {
  // const {status} = useSelector(state => state)
  return (
    <View>
      <Text style={styles.textTitle}>Produk Panther Mania</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewProduct}>
        {[...new Array(4).keys()].map((v, i) => (
          <TouchableNativeFeedback key={i} useForeground>
            <View style={styles.btnProduct}>
              <Image source={ImgShirt} style={{width: '100%', height: '60%'}} />
              <Text style={styles.textProductTitle}>Baju Kemeja Member</Text>
              <Text>Rp 250.000,-</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
        <TouchableNativeFeedback useForeground>
          <View style={styles.btnViewMore}>
            <Icon
              name={'chevron-right'}
              color={'black'}
              size={50}
              style={styles.icon}
            />
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  btnProduct: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    width: 200,
    height: 250,
    margin: 10,
    overflow: 'hidden',
  },
  viewProduct: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#183240',
    fontSize: 17,
    paddingHorizontal: 20,
  },
});
