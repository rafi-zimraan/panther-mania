import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/constant';
import {BackgroundImage, Gap, Header} from '../../components';
import {IconCoffe} from '../../assets';

export default function RiwayatPembelian({navigation}) {
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <Header
          title="Riwayat pembelian"
          onPress={() => navigation.navigate('Home')}
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
              keterangan: Ingin mempunyai kualitas bagus
            </Text>
            <Gap height={4} />
            <Text style={styles.price}>Rp. 160000</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 110,
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
