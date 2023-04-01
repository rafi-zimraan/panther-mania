import React from 'react';
import {Controller} from 'react-hook-form';
import {TextInput, Text} from 'react-native';

export default function FormInput({name, defaultValue, rules, render}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({onChange, value}) => render(onChange, value)}
    />
  );
}
