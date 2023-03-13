import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Agendas, HomeHeader, Menu, Products} from '../../features/Home';
import {BackgroundImage, Header} from '../../components';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      {/* <Header /> */}
      <ScrollView>
        <View style={styles.container}>
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
