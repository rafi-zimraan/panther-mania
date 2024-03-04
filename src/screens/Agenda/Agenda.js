import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {BackgroundImage, Gap, Header, SearchInput} from '../../components';
import {useSelector} from 'react-redux';
import {AgendaExcerpt} from '../../features/Agenda';

export default function Agenda({navigation}) {
  const {data} = useSelector(state => state.agenda);

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Agenda Kegiatan" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          {/* <SearchInput /> */}
          <Gap height={20} />
          <View style={styles.viewProduct}>
            {data?.map((agenda, i) => (
              <AgendaExcerpt key={i} data={agenda} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewImgAgenda: {
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 3,
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
  },
});
