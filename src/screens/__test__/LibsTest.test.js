import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React from 'react';
import formExample from '../SignUp/formExample';

export default function LibsTest() {
  return (
    <View>
      <Button
        title="log appended formdata"
        onPress={() => {
          const dataToSend = new FormData();

          for (let p in formExample) dataToSend.append(p, formExample[p]);

          console.log(dataToSend);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
