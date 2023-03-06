import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import {colors} from '../utils';

const AlertMessage = ({
  visible,
  dismissable = false,
  onDismiss,
  styleContainerModal,
  styleWrapper,
  styleWrapperHeader,
  styleWrapperContent,
  styleTitleContent,
  titleContent,
  styleButton,
  styleTextButton,
  textButton = 'CEK DETAIl',
  onClose,
  enableTypeContentIcon = true,
  enableSubmit = true,
  enableClose = true,
  onSubmit,
  type,
}) => {
  const renderTypeContentIcon = () => {
    switch (true) {
      case type === 'success':
        return (
          <Icon
            name="checkbox-marked-circle"
            size={HEIGHT * 0.15}
            color={colors.white}
            style={{
              textShadowColor: colors.black03,
              textShadowOffset: {
                width: 0,
                height: 3,
              },
              textShadowRadius: 15,
            }}
          />
        );

      case type === 'failed':
        return (
          <Icon name="close-circle" size={HEIGHT * 0.09} color={colors.red} />
        );

      case type === 'setting':
        return (
          <Icon name="cog-outline" size={HEIGHT * 0.09} color={colors.gray} />
        );
    }
  };
  return (
    <Modal
      visible={visible}
      dismissable={dismissable}
      onDismiss={onDismiss}
      style={[styles.styleContainerModal, styleContainerModal]}>
      <View style={[styles.styleWrapper, styleWrapper]}>
        {enableClose && (
          <TouchableOpacity
            style={[styles.styleWrapperHeader, styleWrapperHeader]}
            onPress={onClose}>
            <Icon name="close-circle" size={HEIGHT * 0.05} color={colors.red} />
          </TouchableOpacity>
        )}
        <View style={[styles.styleWrapperContent, styleWrapperContent]}>
          {enableTypeContentIcon && renderTypeContentIcon()}
          <Text style={[styles.styleTitleContent, styleTitleContent]}>
            {titleContent}
          </Text>

          {enableSubmit && (
            <Button
              mode="contained"
              onPress={onSubmit}
              style={[styles.styleButton, styleButton]}>
              <Text style={[styles.styleTextButton, styleTextButton]}>
                {textButton}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AlertMessage;

const styles = StyleSheet.create({
  styleContainerModal: {
    flex: 1,
  },
  styleWrapper: {
    padding: WIDTH * 0.05,
    width: WIDTH * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.dustySteel,
    borderRadius: HEIGHT * 0.02,
    alignItems: 'center',
  },
  styleWrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  styleTitleContent: {
    color: colors.white,
    marginTop: HEIGHT * 0.02,
    fontSize: HEIGHT * 0.024,
    fontFamily: fonts.BebasNeueRegular,
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
    // textShadowColor: colors.black,
    // textShadowOffset: {
    //   width: 2,
    //   height: 5,
    // },
    // textShadowRadius: 10,
  },
  styleWrapperContent: {
    alignItems: 'center',
    marginHorizontal: WIDTH * 0.05,
  },
  styleButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: HEIGHT * 0.02,
    marginBottom: HEIGHT * 0.02,
    width: WIDTH * 0.37,
    paddingHorizontal: 0,
    height: HEIGHT * 0.05,
    alignSelf: 'center',
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
  },
  styleTextButton: {
    fontSize: HEIGHT * 0.02,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: fonts.BebasNeueRegular,
  },
});
