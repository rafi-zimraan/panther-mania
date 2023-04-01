import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import React from 'react';
import {BackgroundImage, Gap, Header, SearchInput} from '../../components';
import {ImgCommunity, ImgShirt} from '../../assets';
import {useSelector} from 'react-redux';
import {API_KEY_IMAGE} from '@env';

export default function Agenda({navigation}) {
  const {data} = useSelector(state => state.agenda);

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Agenda Kegiatan" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <SearchInput />
          <Gap height={20} />
          <View style={styles.viewProduct}>
            {data?.map((v, i) => {
              let chapterImgUri = `${API_KEY_IMAGE}/chapter/${v.chapter_uuid}.jpg`;
              let korwilImgUri = `${API_KEY_IMAGE}/korwil/${v.korwil_uuid}.jpg`;
              return (
                <TouchableNativeFeedback
                  key={i}
                  useForeground
                  onPress={() =>
                    navigation.navigate('AgendaDetail', {agenda: v})
                  }>
                  <View style={styles.btnAgenda}>
                    <View style={styles.viewImgAgenda}>
                      <Image
                        source={{uri: chapterImgUri}}
                        onError={() => {
                          chapterImgUri = `${API_KEY_IMAGE}/chapter/${v.chapter_uuid}.png`;
                          // setChapterImgUri(
                          //   `${API_KEY_IMAGE}/chapter/${v.chapter_uuid}.png`,
                          // );
                        }}
                        style={{width: 100, height: 100}}
                        resizeMethod={'resize'}
                      />
                      <Image
                        source={{uri: korwilImgUri}}
                        onError={() => {
                          korwilImgUri = `${API_KEY_IMAGE}/korwil/${v.korwil_uuid}.png`;
                          // setKorwilImgUri(
                          //   `${API_KEY_IMAGE}/korwil/${v.korwil_uuid}.png`,
                          // );
                        }}
                        style={{width: 100, height: 100}}
                        resizeMethod={'resize'}
                      />
                    </View>
                    <Text style={styles.textAgendaTitle} numberOfLines={1}>
                      {v.judul}
                    </Text>
                    <Gap flex={1} />
                    <Text style={styles.textDescription} numberOfLines={2}>
                      {v.deskripsi}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewImgAgenda: {
    // margin: 15,
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 3,
    // marginBottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
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
    padding: 20,
    paddingTop: 0,
    // backgroundColor: 'aqua',
  },
});
