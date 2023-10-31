import React, {useEffect, useState} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SetModal} from '../../redux/slices/sosSlice';
import {ButtonAction, Gap} from '../../components';
import {IconPfpMapDefault} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export default function ModalUserDetailQR({data, visible}) {
  const dispatch = useDispatch();
  const {nama_lengkap, no_whatsapp, alamat, email, user_id, photo_profile} =
    data;
  async function handleWhatsApp() {
    const number = no_whatsapp.slice(1, no_whatsapp?.length);
    // const googleMapUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
    await Linking.openURL(
      `https://wa.me/62${number}?text=Salam%20lur%20saya%20dari%20anggota%20grup%20Panther%20Mania%20juga`,
    );
  }

  const [imgProfile, setImageProfile] = useState({
    uri: `${'https://panther-mania.id'}/images/profile/${photo_profile}`,
  });
  const navigation = useNavigation();

  console.log(`${'https://panther-mania.id'}/images/profile/${photo_profile}`);

  useEffect(() => {
    setImageProfile({
      uri: `${'https://panther-mania.id'}/images/profile/${photo_profile}`,
    });
  }, [photo_profile]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => navigation.goBack()}>
      <View style={styles.viewQR}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => dispatch(SetModal(false))}
        />
        <View style={styles.Container}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.ImgProfile}>
              <Image
                source={imgProfile}
                onError={() => setImageProfile(IconPfpMapDefault)}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
              <Text style={styles.textNamaProfile} numberOfLines={2}>
                {nama_lengkap}
              </Text>
              <Text style={{color: 'black'}}>{alamat}</Text>
              <Text style={{color: 'grey'}} numberOfLines={1}>
                {no_whatsapp}
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <ButtonAction
            title="Hubungi WhastApp"
            onPress={handleWhatsApp}
            iconLeft={'whatsapp'}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewQR: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.1,
  },
  Container: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    width: '90%',
    maxWidth: 520,
    borderRadius: 20,
    marginBottom: 20,
  },
  ImgProfile: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  textNamaProfile: {
    fontWeight: '700',
    fontSize: 18,
    color: 'black',
  },
});
