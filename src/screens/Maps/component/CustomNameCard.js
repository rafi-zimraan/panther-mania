import {View, Text, StyleSheet, Linking, Image} from 'react-native';
import React, {useContext} from 'react';
import {fonts, images} from '../../../assets';
import {HEIGHT, WIDTH} from '../../../utils/dimension';
import {colors} from '../../../utils';
import CustomMenu from '../../../components/CustomMenu';
import {GlobalContext} from '../../../Store/globalContext';

const CustomNameCard = ({
  nama,
  email,
  alamat,
  phoneNumber,
  platNumber,
  noWa,
  LinkPhoto,
}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;
  return (
    <View style={styles.styleWrapperNameCard}>
      <Text
        style={[
          styles.styleTextNameCard,
          {color: dark ? colors.carbonGrey : colors.carbonGrey},
        ]}>
        {nama}
      </Text>

      <View style={styles.styleWrapperImageBackground}>
        <Image
          source={images.logopanthermania}
          style={styles.styleImageBackground}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: WIDTH * 1.4,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: WIDTH * 0.4,
          }}>
          <Text
            style={[
              styles.styleTextInformationUser,
              {color: dark ? colors.carbonGrey : colors.carbonGrey},
            ]}>
            {email}
          </Text>
          <Text
            style={[
              styles.styleTextInformationUser,
              {color: dark ? colors.carbonGrey : colors.carbonGrey},
            ]}>
            {alamat}
          </Text>
          <Text
            style={[
              styles.styleTextInformationUser,
              {color: dark ? colors.carbonGrey : colors.carbonGrey},
            ]}>
            {phoneNumber}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: HEIGHT * 0.035,
            // alignSelf: 'center',
          }}>
          <Image
            source={LinkPhoto}
            style={{
              width: WIDTH * 0.23,
              height: HEIGHT * 0.09,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.BebasNeueRegular,
              fontSize: HEIGHT * 0.025,
              color: dark ? colors.carbonGrey : colors.carbonGrey,
            }}>
            {platNumber}
          </Text>
          <CustomMenu
            sourceImage={images.imagewa}
            styleContainer={[
              {
                justifyContent: 'center',
                marginLeft: WIDTH * 0.015,
                marginRight: WIDTH * 0.015,
              },
            ]}
            styleWrapperImageAndText={{
              backgroundColor: colors.white,
            }}
            onPress={() => Linking.openURL(noWa)}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomNameCard;

const styles = StyleSheet.create({
  styleWrapperNameCard: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.28,
    position: 'absolute',
    bottom: HEIGHT * 0.012,
    left: WIDTH * 0.027,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HEIGHT * 0.02,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: HEIGHT * 0.005,
  },
  styleTextNameCard: {
    fontFamily: fonts.BebasNeueRegular,
    fontSize: HEIGHT * 0.033,
    marginTop: HEIGHT * 0.02,
    position: 'absolute',
    top: HEIGHT * -0.003,
  },
  styleWrapperImageBackground: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.16,
    position: 'absolute',
    left: WIDTH * -0.001,
    bottom: HEIGHT * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.doubleSpanishWhite,
    opacity: 0.15,
  },
  styleImageBackground: {
    width: WIDTH * 0.65,
    height: HEIGHT * 0.09,
  },
  styleWrapperProfile: {
    marginTop: HEIGHT * 0.05,
    alignItems: 'center',
  },
  styleWrapperInformationUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH * 0.87,
  },
  styleWrapperTextInformationUser: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: WIDTH * 0.1,
    marginTop: HEIGHT * 0.03,
  },
  styleTextInformationUser: {
    fontFamily: fonts.BebasNeueRegular,
    fontSize: HEIGHT * 0.018,
    textAlign: 'left',
  },
});
