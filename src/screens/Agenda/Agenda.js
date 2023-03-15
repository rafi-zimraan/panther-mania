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
import {ImgCommunity, ImgShirt} from '../../assets';
import useOrientation from '../../utils/useOrientation';

export default function Agenda({navigation}) {
  const {width} = useOrientation();
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Agenda Kegiatan" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.viewProduct}>
            {[...new Array(10).keys()].map((v, i) => (
              <TouchableNativeFeedback
                key={i}
                useForeground
                onPress={() => navigation.navigate('AgendaDetail')}>
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
  textDescription: {
    color: 'black',
    fontSize: 12,
  },
  textAgendaTitle: {
    fontWeight: '500',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  imgAgenda: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
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
  container: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    // backgroundColor: 'aqua',
  },
});
