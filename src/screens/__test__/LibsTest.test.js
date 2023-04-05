// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {useForm} from 'react-hook-form';
// import FormField from './FormField';

// export default function LibsTest() {
//   const {control, register} = useForm();
//   return <FormField onSubmit={data => console.log(data)} />;
// }

// const styles = StyleSheet.create({});

import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import FormInput from './FormInput';

export default function LibsTest() {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  return (
    <View>
      <FormInput
        control={control}
        errors={errors}
        name={'email'}
        iconName={'gmail'}
        placeholder={'Masukan email'}
        defaultValue={'contoh@rmail'}
      />
      <FormInput
        control={control}
        errors={errors}
        name={'password'}
        placeholder={'Masukan password'}
        secureTextEntry
      />
      <FormInput
        control={control}
        errors={errors}
        name={'brith_date'}
        type={'date'}
        placeholder={'Pilih Tanggal Lahir'}
      />
      <FormInput
        control={control}
        errors={errors}
        name={'tax_date'}
        type={'date'}
        placeholder={'Pilih Tanggal Pajak'}
      />
      <FormInput
        control={control}
        errors={errors}
        name={'no_sim'}
        keyboardType={'number-pad'}
        placeholder={'Masukan Nomor sim'}
      />
      <FormInput
        control={control}
        errors={errors}
        name={'agama'}
        type="picker"
        validate={value => (value == 'Pilih Agama' ? false : true)}
        pickerItem={[
          {
            name: 'Pilih Agama',
            value: 'Pilih Agama',
          },
          {
            name: 'Islam',
            value: 'Islam',
          },
          {
            name: 'Buddha',
            value: 'Buddha',
          },
          {
            name: 'Atheis',
            value: 'Atheis',
          },
        ]}
      />
      <Button
        title="submit"
        onPress={handleSubmit(data => console.log(data))}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
