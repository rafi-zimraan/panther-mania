import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import FormInput from './FormInput';

const FormField = ({onSubmit}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      agama: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  return (
    <View>
      <Controller
        control={control}
        name="email"
        rules={{required: true}}
        render={({field}) => (
          <FormInput
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
        rules={{required: true}}
        render={({field}) => (
          <FormInput
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Last Name"
          />
        )}
      />
      {errors?.lastName && <Text>This field is required</Text>}
      <Controller
        control={control}
        name="agama"
        rules={{
          validate: value => (value == 'Pilih Agama' ? 'invalid option' : true),
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <FormInput
            type="picker"
            onPickerChange={onChange}
            selectedPickerValue={value}
            placeholderPicker="Pilih Agama"
            pickerItem={[
              {value: 'Islam', label: 'Islam'},
              {value: 'Buddha', label: 'Buddha'},
              {value: 'Atheis', label: 'Atheis'},
            ]}
          />
        )}
      />
      {errors?.agama && <Text>This field is required</Text>}

      <Controller
        control={control}
        name="date"
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <FormInput
            type="date"
            // value={}
          />
        )}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FormField;
