import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Gap} from '../../../components';

export default function AgendaExcerpt({data}) {
  const {navigate} = useNavigation();
  const {chapter_uuid, korwil_uuid, uuid} = data;

  const [imgKorwil, setImgKorwil] = useState(
    `${'https://panther-mania.id'}/images/posts/${uuid}.jpg`,
  );
  const [imgChapter, setImgChapter] = useState(
    `${'https://panther-mania.id'}/images/posts/${uuid}.jpg`,
  );

  https: return (
    <TouchableNativeFeedback
      useForeground
      onPress={() => navigate('AgendaDetail', {agenda: data})}>
      <View style={styles.btnAgenda}>
        <View style={styles.viewImgAgenda}>
          {/* <View style={styles.viewImg}>
            <Image
              source={{uri: imgChapter}}
              onError={() =>
                setImgChapter(
                  `${'https://panther-mania.id'}/images/posts/chapter/${uuid}.png`,
                )
              }
              style={{width: '100%', height: '100%'}}
              resizeMethod={'resize'}
            />
          </View> */}
          <Gap width={10} />
          <View style={styles.viewImg}>
            <Image
              source={{uri: imgKorwil}}
              onError={() =>
                setImgKorwil(
                  `${'https://panther-mania.id'}/images/posts/korwil/${uuid}.png`,
                )
              }
              style={{width: '100%', height: '100%'}}
              resizeMethod={'resize'}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  viewImg: {
    backgroundColor: 'white',
    width: 90,
    height: 90,
    borderRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  viewImgAgenda: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: 10,
    overflow: 'hidden',
    padding: 20,
    paddingBottom: 15,
  },
});
