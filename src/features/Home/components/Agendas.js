import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ImgCommunity, ImgShirt} from '../../../assets';
import {Gap} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {fetchAgenda} from '../../Agenda/services/agendaServices';
import {colors} from '../../../utils/constant';
import {API_KEY_IMAGE} from '@env';
import AgendaExcerpt from './AgendaExcerpt';

export default function Agendas() {
  // console.log(API_KEY_IMAGE);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {status, data} = useSelector(state => state.agenda);

  useEffect(() => {
    if (status == 'idle') dispatch(fetchAgenda());
  }, [dispatch]);

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textTitle}>Agenda Kegiatan</Text>
        <ActivityIndicator
          color={colors.primary}
          size="small"
          animating={status == 'pending'}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewAgenda}>
        {/* {data?.map((agenda, i) => (
          <AgendaExcerpt key={i} data={agenda} />
        ))} */}
        {/* {data?.map((v, i) => {
          // const [chapterImgUri, setChapterImgUri] = useState(
          //   `${API_KEY_IMAGE}/chapter/${v.chapter_uuid}.jpg`,
          // );
          // const [korwilImgUri, setKorwilImgUri] = useState(
          //   `${API_KEY_IMAGE}/korwil/${v.korwil_uuid}.jpg`,
          // );

          let chapterImgUri = `${API_KEY_IMAGE}/chapter/${v.chapter_uuid}.jpg`;
          let korwilImgUri = `${API_KEY_IMAGE}/korwil/${v.korwil_uuid}.jpg`;

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
        })} */}
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
    paddingRight: 10,
  },
});
