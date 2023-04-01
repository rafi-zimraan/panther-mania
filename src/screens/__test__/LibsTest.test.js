import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FormField from './FormField';

export default function LibsTest() {
  return (
    <View>
      <Text>LibsTest</Text>
      <FormField onSubmit={data => console.log(data)} />
    </View>
  );
}

const styles = StyleSheet.create({});
