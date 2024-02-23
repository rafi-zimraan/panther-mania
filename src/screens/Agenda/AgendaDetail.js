import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {BackgroundImage, ButtonAction, Gap, Header} from '../../components';
import {IconCalendar, IconFlagGreen, ImgCommunity} from '../../assets';
import {API_KEY_IMAGE} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJoinAgenda} from '../../features/Agenda/services/agendaServices';
import HTML from 'react-native-render-html';
import {useOrientation} from '../../hooks';
import {colors} from '../../utils/constant';

export default function AgendaDetail({navigation, route}) {
  // console.log(API_KEY_IMAGE);

  const {
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
    nama_chapter,
    nama_korwil,
    public: _public,
    tanggal,
    updated_at,
    uuid,
    chapter_uuid,
    korwil_uuid,
  } = route.params.agenda;
  const dispatch = useDispatch();
  const {status_join} = useSelector(state => state.agenda);
  const {token, user_data} = useSelector(state => state.auth);
  const [formVisible, setFormVisible] = useState(false);
  const [dewasa, setDewasa] = useState('');
  const [anak, setAnak] = useState('');
  const [kendaraan, setKendaraan] = useState('');
  const {width} = useOrientation();

  const [chapterImgUri, setChapterImgUri] = useState(
    `${'https://panther-mania.id'}/images/posts/${uuid}.jpg`,
  );
  const [korwilImgUri, setKorwilImgUri] = useState(
    `${'https://panther-mania.id'}/images/posts/${uuid}.jpg`,
  );

  function handleJoinAgenda() {
    const invalidForm = dewasa == '' || anak == '' || kendaraan == '';
    if (!formVisible) {
      setFormVisible(true);
    } else if (invalidForm) {
      ToastAndroid.show('Isi formulir dengan benar', ToastAndroid.SHORT);
    } else {
      const formData = {
        dewasa,
        anak,
        kendaraan,
        agenda: id,
        member: user_data.user_id,
        token,
      };
      dispatch(fetchJoinAgenda(formData));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <BackgroundImage />
        <ScrollView>
          <Header title="Rincian Agenda" onPress={() => navigation.goBack()} />
          <View style={styles.container}>
            <View style={styles.viewImgAgenda}>
              <Image
                source={{uri: chapterImgUri}}
                onError={() =>
                  setChapterImgUri(
                    `${'https://panther-mania.id'}/images/posts/korwil/${gambar}.png`,
                  )
                }
                style={{width: 100, height: 100}}
                resizeMethod={'resize'}
              />
              {/* <Image
              source={{uri: korwilImgUri}}
              onError={() =>
                setKorwilImgUri(
                  `${'https://panther-mania.id'}/images/posts/korwil/${gambar}.png`,
                )
              }
              style={{width: 100, height: 100}}
              resizeMethod={'resize'}
            /> */}
            </View>
            <Text style={styles.textAgendaTitle}>{judul}</Text>
            <View style={styles.viewDetail}>
              <View style={styles.viewDate}>
                <Image
                  source={IconCalendar}
                  style={styles.imgDetail}
                  resizeMethod={'resize'}
                />
                <Text style={styles.textDetail}>
                  {tanggal} - {jam?.slice(0, 5)}
                </Text>
              </View>
              {/* <View style={styles.viewKorwil}>
                <Image
                  source={IconFlagGreen}
                  style={{...styles.imgDetail, left: -5, top: -10}}
                  resizeMethod={'resize'}
                />
                <Text style={styles.textDetail}>Korwil Aceh</Text>
              </View> */}
            </View>
            <View style={styles.viewAgendaDetail}>
              <HTML
                source={{html: deskripsi}}
                contentWidth={width}
                baseStyle={{color: 'black'}}
              />
              {/* <Text style={{color: 'black'}}>{deskripsi}</Text> */}
            </View>
            <Gap height={20} />
            {formVisible && (
              <View style={styles.containerForm}>
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder="Jumlah peserta dewasa.."
                  keyboardType="number-pad"
                  onChangeText={setDewasa}
                  style={{color: 'black'}}
                />
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder="Jumlah anak dewasa.."
                  keyboardType="number-pad"
                  onChangeText={setAnak}
                  style={{color: 'black'}}
                />
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder="Tipe kendaraan yang dibawa.."
                  onChangeText={setKendaraan}
                  style={{color: 'black'}}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <Gap height={20} />
        <ButtonAction
          title="Gabung Agenda"
          loading={status_join == 'pending'}
          onPress={handleJoinAgenda}
        />
        <Gap height={20} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
    marginBottom: 5,
    borderRadius: 50,
  },
  viewAgendaDetail: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 50,
    elevation: 3,
    marginBottom: 3,
  },
  imgDetail: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: -15,
    top: -7.5,
  },
  textDetail: {
    color: 'white',
    fontWeight: '500',
  },
  viewKorwil: {
    backgroundColor: 'green',
    height: 35,
    borderRadius: 35 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  viewDate: {
    backgroundColor: 'tomato',
    height: 35,
    borderRadius: 35 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  viewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  textAgendaTitle: {
    textAlign: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '80%',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    marginBottom: 3,
    color: 'black',
    fontWeight: 'bold',
  },
  viewImgAgenda: {
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 3,
    marginBottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  container: {
    width: '100%',
    maxWidth: 580,
    alignSelf: 'center',
    flex: 1,
    padding: 20,
  },
});
