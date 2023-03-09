import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';

export default function LibsTest() {
  return (
    <View>
      <Button
        title="hit"
        onPress={async () => {
          try {
            const {data} = await axios.post(
              'https://panthermania.lapaksiswa.com/api/auth/signup',
            );
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
