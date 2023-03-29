import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {API_SIGNIN} from '@env';
import axios from 'axios';

export default function LibsTest() {
  axios
    .post(API_SIGNIN, {
      email: 'testing02@gmail.com',
      password: 'rahasia123',
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  return (
    <View>
      <Text>LibsTest</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
