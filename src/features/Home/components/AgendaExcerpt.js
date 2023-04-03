import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function AgendaExcerpt({data}) {
  const {
    chapter_uuid,
    created_at,
    deadline,
    deskripsi,
    expired,
    gambar,
    id,
    id_chapter,
    id_kategori,
    id_korwil,
    jam,
    judul,
    judul_seo,
    korwil_uuid,
    nama_chapter,
    nama_korwil,
    public: _public,
    tanggal,
    updated_at,
    uuid,
  } = data;

  return (
    <TouchableNativeFeedback
      key={i}
      useForeground
      onPress={() => navigate('AgendaDetail', {agenda: v})}>
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
  textDescription: {
    color: 'black',
    fontSize: 12,
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
    paddingBottom: 15,
  },
});
