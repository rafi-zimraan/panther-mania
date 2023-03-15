import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {BackgroundImage, Header} from '../../components';
import {IconCalendar, IconFlagGreen, ImgCommunity} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useOrientation from '../../utils/useOrientation';

export default function AgendaDetail({navigation}) {
  const {isPortrait} = useOrientation();
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView>
        <Header title="Rincian Agenda" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.viewImgAgenda}>
            <Image source={ImgCommunity} style={{width: '100%', height: 200}} />
          </View>
          <Text style={styles.textAgendaTitle}>
            Perkumpulan Komunitas Panther Mania Aceh
          </Text>
          <View style={styles.viewDetail}>
            <View style={styles.viewDate}>
              <Image
                source={IconCalendar}
                style={styles.imgDetail}
                resizeMethod={'resize'}
              />
              <Text style={styles.textDetail}>17 Agustus, 08:00</Text>
            </View>
            <View style={styles.viewKorwil}>
              <Image
                source={IconFlagGreen}
                style={{...styles.imgDetail, left: -5, top: -10}}
                resizeMethod={'resize'}
              />
              <Text style={styles.textDetail}>Korwil Aceh</Text>
            </View>
          </View>
          <View style={styles.viewAgendaDetail}>
            <Text style={{color: 'black'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAgendaDetail: {
    backgroundColor: 'white',
    padding: 30,
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
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
    marginVertical: 25,
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
    margin: 15,
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 3,
    marginBottom: 0,
  },
  container: {
    width: '100%',
    maxWidth: 580,
    alignSelf: 'center',
    flex: 1,
  },
});
