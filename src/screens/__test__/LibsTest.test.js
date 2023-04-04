import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import FormField from './FormField';

export default function LibsTest() {
  const {control, register} = useForm();
  return <FormField onSubmit={data => console.log(data)} />;
}

const styles = StyleSheet.create({});
