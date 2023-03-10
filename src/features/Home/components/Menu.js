import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import {
  IconCalendar,
  IconProduct,
  IconSOS,
  IconUser,
  IconWhatsApp,
} from '../../../assets';
import {Gap} from '../../../components';

export default function Menu() {
  return (
    <View style={styles.container}>
      {[...new Array(5).keys()].map((v, i) => {
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
            : {icon: IconUser, title: 'Profil'};
        return (
          <View key={i} style={{alignItems: 'center', marginBottom: 10}}>
            <TouchableNativeFeedback useForeground>
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
    marginTop: 12,
  },
  btnMenu: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 60 / 2,
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
