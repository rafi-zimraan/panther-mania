import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';

const Box = ({
  uri,
  styleBoxContent,
  textContent,
  styleTextContent,
  textContentSecond,
  styleTextContentSecond,
}) => {
  return (
    <View>
      <View style={[styles.boxTitle]}>
        <Image source={{uri: uri}} style={styles.imageContent} />
      </View>
      <View style={[styles.boxContent, styleBoxContent]}>
        <Text style={[styles.textContent, styleTextContent]}>
          {textContent}
        </Text>
        {textContentSecond !== '' && (
          <Text style={[styles.textContent, styleTextContentSecond]}>
            {textContentSecond}
          </Text>
        )}
      </View>
    </View>
  );
};

export const CustomBox = ({
  styleCustomBox,
  styleBoxContent,
  textContent,
  styleTextContent,
  textContentSecond,
  styleTextContentSecond,
  uri,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styleCustomBox]}
      onPress={onPress}>
      <Box
        uri={uri}
        textContent={textContent}
        styleTextContent={styleTextContent}
        textContentSecond={textContentSecond}
        styleTextContentSecond={styleTextContentSecond}
        styleBoxContent={styleBoxContent}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.42,
    height: HEIGHT * 0.16,
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
    marginHorizontal: WIDTH * 0.02,
    marginVertical: HEIGHT * 0.01,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: HEIGHT * 0.005,
  },
  imageContent: {
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.06,
    width: WIDTH * 0.42,
    height: HEIGHT * 0.09,
  },
  boxTitle: {
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.06,
    width: WIDTH * 0.42,
    height: HEIGHT * 0.09,
    backgroundColor: colors.gainsBoro,
  },
  textTitle: {
    fontSize: HEIGHT * 0.016,
    color: colors.monSoon,
    fontFamily: fonts.BebasNeueRegular,
    position: 'absolute',
    bottom: 0,
    left: WIDTH * 0.03,
  },
  boxContent: {
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
    width: WIDTH * 0.4,
    height: HEIGHT * 0.06,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textContent: {
    fontSize: HEIGHT * 0.013,
    color: colors.monSoon,
    fontFamily: fonts.BebasNeueRegular,
    textAlign: 'left',
    marginVertical: 6,
    marginHorizontal: 7,
  },
});
