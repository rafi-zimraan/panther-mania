import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Formik} from 'formik';

const LibsDemo = () => {
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        console.log(values);
      }}
      validateOnBlur>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default LibsDemo;
