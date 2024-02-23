import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {
  IconCalendar,
  IconProduct,
  IconSOS,
  IconUser,
  IconWhatsApp,
  IconKeranjang,
} from '../../../assets';
import {Gap} from '../../../components';
import {useNavigation} from '@react-navigation/native';

export default function Menu() {
  const {navigate} = useNavigation();

  async function handleNavigate(index) {
    try {
      switch (index) {
        case 0:
          return await Linking.openURL('https://wa.me/6282161196119');
        case 1:
          return navigate('Agenda');
        case 2:
          return navigate('PantherProduct');
        case 3:
          return navigate('SaveOurSouls');
        case 4:
          return navigate('Keranjang');
        case 5:
          return navigate('UserProfile');
        default:
          console.log('index tidak ditemukan');
      }
    } catch (error) {
      console.log('handleNavigate error:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      {[...new Array(6).keys()].map((v, i) => {
        // image sources and text titles are based on array index
        const source =
          i == 0
            ? {icon: IconWhatsApp, title: 'Chat Admin'}
            : i == 1
            ? {icon: IconCalendar, title: 'Agenda'}
            : i == 2
            ? {icon: IconProduct, title: 'Produk'}
            : i == 3
            ? {icon: IconSOS, title: 'SOS'}
            : i == 4
            ? {icon: IconKeranjang, title: 'keranjang'}
            : {icon: IconUser, title: 'Profil'};
        return (
          <View key={i} style={{alignItems: 'center', marginBottom: 10}}>
            <TouchableNativeFeedback
              useForeground
              onPress={() => handleNavigate(i)}>
              <View style={styles.btnMenu}>
                <Image source={source.icon} style={styles.image} />
              </View>
            </TouchableNativeFeedback>
            <Gap height={2.5} />
            <Text style={styles.textTitle}>{source.title}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'grey',
  },
  image: {
    width: 35,
    height: 35,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 7,
  },
  btnMenu: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 2.5,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: 15,
    marginBottom: 20,
  },
});
