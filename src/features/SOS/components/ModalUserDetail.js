import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SetModal} from '../../../redux/slices/sosSlice';
import {API_KEY_IMAGE} from '@env';
import {ButtonAction, Gap} from '../../../components';
// console.log(API_KEY_IMAGE)

export default function ModalUserDetail({data}) {
  const dispatch = useDispatch();
  const {modal} = useSelector(state => state.save_our_souls);
  const {
    alamat,
    distance,
    email,
    handphone,
    nama_lengkap,
    no_whatsapp,
    user_id,
  } = data;

  async function handleWhatsApp() {
    const number = no_whatsapp.slice(1, no_whatsapp?.length);
    await Linking.openURL(`https://wa.me/62${number}`);
  }

  return (
    <Modal
      visible={modal}
      transparent
      animationType="slide"
      onRequestClose={() => dispatch(SetModal(false))}>
      <View style={styles.viewAlginment}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => dispatch(SetModal(false))}
        />
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.viewImgProfile}>
              <Image
                source={{uri: `${API_KEY_IMAGE}/profile/${user_id}.jpg`}}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
              <Text style={styles.textProfileName} numberOfLines={2}>
                {nama_lengkap}
              </Text>
              <Text style={{color: 'black'}}>{alamat}</Text>
              <Text numberOfLines={1} style={{color: 'grey'}}>
                {email}
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <Text>{no_whatsapp.slice(1, no_whatsapp.length)}</Text>
          <ButtonAction title="Hubungi WhatsApp" onPress={handleWhatsApp} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewImgProfile: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 3,
    overflow: 'hidden',
  },
  textProfileName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.1,
  },
  container: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    width: '90%',
    maxWidth: 520,
    borderRadius: 20,
    marginBottom: 20,
  },
  viewAlginment: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
});
