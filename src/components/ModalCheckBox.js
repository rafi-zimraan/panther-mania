import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal} from 'react-native-paper';
import {colors} from '../utils';

const ModalCheckBox = ({isVisible, dismissable, children, styleModal}) => {
  return (
    <Modal
      visible={isVisible}
      dismissable={dismissable}
      contentContainerStyle={[styles.modalCheckboxStyle, styleModal]}>
      {children}
    </Modal>
  );
};

export default ModalCheckBox;

const styles = StyleSheet.create({
  modalCheckboxStyle: {
    backgroundColor: colors.black03,
    flex: 1,
  },
});
