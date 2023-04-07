import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {FormInput} from '../../features/Auth';
import {Gap} from '../../components';

export default function LibsTest() {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <View>
      <Text>LibsTest</Text>
      <Gap height={20} />
      <FormInput
        control={control}
        errors={errors}
        name="profile"
        type="image"
        title={'Foto Profil'}
      />
      <Gap height={20} />
      <FormInput
        control={control}
        errors={errors}
        name="ktp"
        type="image"
        title={'Foto KTP'}
      />
      <Gap height={20} />
      <Button
        title="Submit"
        onPress={handleSubmit(data => console.log(data))}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
