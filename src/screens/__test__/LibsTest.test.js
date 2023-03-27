import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import formExample from '../SignUp/formExample';

export default function LibsTest() {
  let multiPart = new FormData();
  let json = formExample;

  for (let p in json) multiPart.append(p, json[p]);

  multiPart.append('profile', formExample.profile);
  multiPart.append('ktp', formExample.ktp);
  multiPart.append('bukti_tf', formExample.bukti_tf);
  multiPart.append('sim', formExample.sim);
  multiPart.append('stnk', formExample.stnk);
  axios
    .put('https://panther-mania.id/api/v1/update', multiPart, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGFudGhlci1tYW5pYS5pZFwvYXBpXC92MVwvYXV0aCIsImlhdCI6MTY3OTkwMzI3OCwiZXhwIjoxNjc5OTA2ODc4LCJuYmYiOjE2Nzk5MDMyNzgsImp0aSI6InljNTNRMG5NRUF4cDdNQnkiLCJzdWIiOjMxMzcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.w4FpKOEsT-PoQygI_9YxUPw5VoMznRXt5a9gpWDXbWg`,
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.log(err));

  return (
    <View>
      <Text>LibsTest</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
