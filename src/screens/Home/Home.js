import {ScrollView, StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {Agendas, HomeHeader, Menu, Products} from '../../features/Home';
import {BackgroundImage, Gap} from '../../components';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      {/* <Gap height={StatusBar.currentHeight} /> */}
      <BackgroundImage />
      <ScrollView>
        <View style={styles.container}>
          <Gap height={StatusBar.currentHeight} />
          <HomeHeader />
          <View style={styles.containerContent}>
            <Menu />
            <Products />
            <Agendas />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerContent: {
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 480,
  },
});
