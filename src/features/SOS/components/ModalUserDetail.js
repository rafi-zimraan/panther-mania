import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  Linking,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SetModal} from '../../../redux/slices/sosSlice';
import {API_KEY_IMAGE} from '@env';
import {ButtonAction, Gap} from '../../../components';
import {IconPfpMapDefault, IconUser} from '../../../assets';
// console.log(API_KEY_IMAGE)

export default function ModalUserDetail({data}) {
  const dispatch = useDispatch();
  const {modal, coords} = useSelector(state => state.save_our_souls);
  const {latitude, longitude} = coords;
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
    const googleMapUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
    await Linking.openURL(
      `https://wa.me/62${number}?text=Tolong%2C%20saya%20perlu%20bantuan.%0ABerikut%20lokasi%20saya%20saat%20ini%3A%0A%0Ahttps%3A%2F%2Fwww.google.com%2Fmaps%2Fplace%2F${latitude}%2C${longitude}`,
    );
  }

  const [imgProfile, setImgProfile] = useState({
    uri: `${API_KEY_IMAGE}/profile/${user_id}.jpg`,
  });

  useEffect(() => {
    setImgProfile({
      uri: `${API_KEY_IMAGE}/profile/${user_id}.jpg`,
    });
  }, [user_id]);

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
                source={imgProfile}
                // set user image to default if uri is invalid
                onError={() => setImgProfile(IconPfpMapDefault)}
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
          {/* <Text>{no_whatsapp.slice(1, no_whatsapp.length)}</Text> */}
          <ButtonAction
            title="Hubungi WhatsApp"
            onPress={handleWhatsApp}
            iconLeft={'whatsapp'}
          />
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
    backgroundColor: 'white',
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
