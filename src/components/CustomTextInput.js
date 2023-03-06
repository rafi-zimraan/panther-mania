import {View, StyleSheet, TextInput, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import ButtonRound from './ButtonRound';
import {colors} from '../utils';

export const CustomTextInput = ({
  onChangeText,
  nameIconLeft,
  sizeIconLeft,
  colorIconLeft,
  placeholder,
  placeholderTextColor,
  styleTextInput,
  multiline = false,
  iconRightEnable = false,
  editable = true,
  keyboardType,
  onBlur,
  nameIconRight,
  sizeIconRight,
  colorIconRight,
  styleWrapperIconLeftTextIconRight,
  value,
  textError,
  onPressIn,
  secureTextEntry,
  buttonRightEnable,
  colorButtonRight,
  buttonRightPress,
  iconNameRight,
  iconSizeRight,
  iconColorRight,
  enableError,
}) => {
  const renderIconLeft = () => {
    switch (true) {
      case nameIconLeft === 'email':
        return <Icon name="email" size={sizeIconLeft} color={colorIconLeft} />;

      case nameIconLeft === 'password':
        return (
          <Icon name="security" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'nama lengkap' ||
        nameIconLeft === 'nama member' ||
        nameIconLeft === 'dewasa' ||
        nameIconLeft === 'anak anak':
        return (
          <Icon name="account" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'cari':
        return (
          <Icon name="magnify" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'jenis kelamin':
        return (
          <Icon
            name="gender-male-female"
            size={sizeIconLeft}
            color={colorIconLeft}
          />
        );

      case nameIconLeft === 'baju':
        return (
          <Icon name="tshirt-crew" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'tempat lahir' ||
        nameIconLeft === 'tanggal lahir' ||
        nameIconLeft === 'tanggal pajak':
        return (
          <Icon name="calendar" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'agama':
        return (
          <Icon
            name="star-crescent"
            size={sizeIconLeft}
            color={colorIconLeft}
          />
        );

      case nameIconLeft === 'status menikah':
        return (
          <Icon
            name="nature-people"
            size={sizeIconLeft}
            color={colorIconLeft}
          />
        );

      case nameIconLeft === 'alamat lengkap':
        return (
          <Icon name="map-marker" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'kelurahan' ||
        nameIconLeft === 'kecamatan' ||
        nameIconLeft === 'kabupaten' ||
        nameIconLeft === 'nama perusahaan' ||
        nameIconLeft === 'alamat perusahaan':
        return <Icon name="city" size={sizeIconLeft} color={colorIconLeft} />;

      case nameIconLeft === 'nomor telepon' ||
        nameIconLeft === 'nomor polisi' ||
        nameIconLeft === 'nomor ktp' ||
        nameIconLeft === 'nomor stnk' ||
        nameIconLeft === 'nomor sim' ||
        nameIconLeft === 'nomor chasis' ||
        nameIconLeft === 'nomor enginee' ||
        nameIconLeft === 'kontak darurat' ||
        nameIconLeft === 'tahun kendaraan' ||
        nameIconLeft === 'no punggung' ||
        nameIconLeft === 'no rekening':
        return (
          <Icon name="numeric" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'nomor wa':
        return (
          <Icon name="whatsapp" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'pekerjaan':
        return (
          <Icon name="briefcase" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'provinsi':
        return <Icon name="earth" size={sizeIconLeft} color={colorIconLeft} />;

      case nameIconLeft === 'warna kendaraan':
        return (
          <Icon name="palette" size={sizeIconLeft} color={colorIconLeft} />
        );

      case nameIconLeft === 'tipe kendaraan':
        return <Icon name="car" size={sizeIconLeft} color={colorIconLeft} />;

      case nameIconLeft === 'tipe kendaraan':
        return <Icon name="car" size={sizeIconLeft} color={colorIconLeft} />;
    }
  };

  const renderIconRight = () => {
    switch (true) {
      case nameIconRight === 'email':
        return (
          <Icon name="email" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'password':
        return (
          <Icon name="security" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'nama lengkap' ||
        nameIconLeft === 'nama member' ||
        nameIconLeft === 'dewasa' ||
        nameIconLeft === 'anak anak':
        return (
          <Icon name="account" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'cari':
        return (
          <Icon name="magnify" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'jenis kelamin':
        return (
          <Icon
            name="gender-male-female"
            size={sizeIconRight}
            color={colorIconRight}
          />
        );

      case nameIconRight === 'baju':
        return (
          <Icon
            name="tshirt-crew"
            size={sizeIconRight}
            color={colorIconRight}
          />
        );

      case nameIconRight === 'tempat lahir' ||
        nameIconRight === 'tanggal lahir' ||
        nameIconRight === 'tanggal pajak':
        return (
          <Icon name="calendar" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'agama':
        return (
          <Icon
            name="star-crescent"
            size={sizeIconRight}
            color={colorIconRight}
          />
        );

      case nameIconRight === 'status menikah':
        return (
          <Icon
            name="nature-people"
            size={sizeIconRight}
            color={colorIconRight}
          />
        );

      case nameIconRight === 'alamat lengkap':
        return (
          <Icon name="map-marker" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'kelurahan' ||
        nameIconRight === 'kecamatan' ||
        nameIconRight === 'kabupaten' ||
        nameIconRight === 'nama perusahaan' ||
        nameIconRight === 'alamat perusahaan':
        return <Icon name="city" size={sizeIconRight} color={colorIconRight} />;

      case nameIconRight === 'nomor telepon' ||
        nameIconRight === 'nomor polisi' ||
        nameIconRight === 'nomor ktp' ||
        nameIconRight === 'nomor stnk' ||
        nameIconRight === 'nomor sim' ||
        nameIconRight === 'nomor chasis' ||
        nameIconRight === 'nomor enginee' ||
        nameIconRight === 'kontak darurat' ||
        nameIconRight === 'tahun kendaraan' ||
        nameIconLeft === 'no punggung' ||
        nameIconLeft === 'no rekening':
        return (
          <Icon name="numeric" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'nomor wa':
        return (
          <Icon name="whatsapp" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'pekerjaan':
        return (
          <Icon name="briefcase" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'provinsi':
        return (
          <Icon name="earth" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'warna kendaraan':
        return (
          <Icon name="palette" size={sizeIconRight} color={colorIconRight} />
        );

      case nameIconRight === 'ok':
        return (
          <Icon name="check" size={sizeIconRight} color={colorIconRight} />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapperIconLeftTextIconRight,
          styleWrapperIconLeftTextIconRight,
        ]}>
        <View
          style={[
            styles.buttonIcon,
            nameIconLeft !== 'cari'
              ? {backgroundColor: colors.black}
              : {backgroundColor: 'transparent'},
          ]}>
          {renderIconLeft()}
        </View>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onPressIn={onPressIn}
          editable={editable}
          secureTextEntry={secureTextEntry}
          style={[
            {
              height: HEIGHT * 0.06,
              width:
                iconRightEnable || buttonRightEnable
                  ? WIDTH * 0.52
                  : WIDTH * 0.65,
              marginHorizontal: WIDTH * 0.01,
              color: colors.black,
            },
            [styleTextInput],
          ]}
          scrollEnabled={multiline ? true : false}
          multiline={multiline}
          value={value}
        />

        {iconRightEnable && (
          <View style={styles.buttonIcon}>{renderIconRight()}</View>
        )}

        {buttonRightEnable && (
          <ButtonRound
            type="icon"
            onPress={buttonRightPress}
            iconName={iconNameRight}
            iconColor={iconColorRight}
            iconSize={iconSizeRight}
            color={colorButtonRight}
          />
        )}
      </View>

      {enableError && <Text style={styles.textError}>{textError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginHorizontal: WIDTH * 0.009,
    marginVertical: HEIGHT * 0.014,
  },
  wrapperIconLeftTextIconRight: {
    borderTopLeftRadius: WIDTH * 0.075,
    borderTopRightRadius: WIDTH * 0.075,
    borderBottomLeftRadius: WIDTH * 0.075,
    borderBottomRightRadius: WIDTH * 0.075,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.07,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonIcon: {
    marginLeft: WIDTH * 0.02,
    width: WIDTH * 0.1,
    height: HEIGHT * 0.045,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: colors.reddish,
    fontFamily: fonts.BebasNeueRegular,
    fontSize: HEIGHT * 0.018,
    fontWeight: 'bold',
    textAlign: 'center',
    width: WIDTH * 0.8,
  },
});
