import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../utils/dimension'

const CustomModal = ({
    styleModal,
    visible,
    transparent = true,
    children
}) => {
  return (
    <Modal
    transparent={transparent}
    style={styleModal}
    visible={visible}
    >
        {children}
    </Modal>
  )
}

export default CustomModal