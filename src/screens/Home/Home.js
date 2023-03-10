import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header, Menu, Products} from '../../features/Home';
import {BackgroundImage} from '../../components';

export default function Home() {
  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <View style={styles.containerContent}>
            <Menu />
            <Products />
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
