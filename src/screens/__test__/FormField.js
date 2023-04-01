import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const FormField = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  function FormInput({onChangeText, value, placeholder}) {
    return (
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    );
  }

  return (
    <View>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{required: true}}
        render={({field}) => (
          <TextInput
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Email"
          />
        )}
      />
      {errors?.email && <Text>This field is required</Text>}

      <Controller
        control={control}
        name="lastName"
        defaultValue=""
        rules={{required: true}}
        render={({field}) => (
          <TextInput
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Last Name"
          />
        )}
      />
      {errors?.lastName && <Text>This field is required</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FormField;
