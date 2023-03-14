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
import {ImgCommunity, ImgShirt} from '../../../assets';
import {Gap} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export default function Agendas() {
  const {navigate} = useNavigation();
  // const {status} = useSelector(state => state)
  return (
    <View>
      <Text style={styles.textTitle}>Agenda Kegiatan</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewAgenda}>
        {[...new Array(4).keys()].map((v, i) => (
          <TouchableNativeFeedback key={i} useForeground>
            <View style={styles.btnAgenda}>
              <Image source={ImgCommunity} style={styles.imgAgenda} />
              <Text style={styles.textAgendaTitle} numberOfLines={2}>
                Judul Kegiatan
              </Text>
              <Text style={styles.textDescription}>
                Deskripsi kegiatan yang sangat panjang sekali
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigate('Agenda')}>
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
  textDescription: {
    color: 'black',
    fontSize: 12,
  },
  imgAgenda: {
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
  textAgendaTitle: {
    fontWeight: '500',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  btnAgenda: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 15,
    width: 250,
    height: 200,
    margin: 10,
    overflow: 'hidden',
    padding: 10,
  },
  viewAgenda: {
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
