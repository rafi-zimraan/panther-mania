import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import usePermission from '../../../hooks/usePermission';
import {
  AccessCoarseLocation,
  AccessFineLocation,
} from '../../../utils/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLocation} from '../../../hooks';
import {useSelector} from 'react-redux';

export default function ModalLocation() {
  const [modal, setModal] = useState(true);
  const [textLoading, setTextLoading] = useState('Memeriksa perizinan..');
  const {requestPermission: requestLocationFine, granted: locationFine} =
      usePermission(AccessFineLocation),
    {requestPermission: requestLocationCoarse, granted: locationCoarse} =
      usePermission(AccessCoarseLocation);
  const {getCurrentLocation, altitude} = useLocation();
  const {status} = useSelector(state => state.save_our_souls);

  useEffect(() => {
    if (!locationFine) {
      setTextLoading('Izin lokasi diperlukan.');
      requestLocationFine();
    } else if (!locationCoarse) {
      setTextLoading('Izin lokasi kasar diperlukan.');
      requestLocationCoarse();
    } else if (locationCoarse && locationFine && altitude == null) {
      getCurrentLocation();
      setTextLoading('Mencari lokasi Anda...');
    } else if (status == 'pending') {
      setTextLoading('Memuat semua orang...');
    } else setModal(false);
  }, [locationFine, locationCoarse, altitude, status]);

  const permissions_granted = locationFine && locationCoarse;

  return (
    <Modal
      visible={modal}
      transparent
      onRequestClose={() => setModal(false)}
      animationType="fade">
      <View style={styles.BgOverlay} />
      <View style={styles.containerAlignment}>
        <View style={styles.container}>
          <View style={styles.viewLoading}>
            {!locationFine || !locationCoarse ? (
              <Icon name={'information-outline'} size={35} color={'black'} />
            ) : (
              <ActivityIndicator color={'black'} size={'large'} />
            )}
            <Text style={styles.textLoading}>{textLoading}</Text>
            {!permissions_granted && (
              <TouchableNativeFeedback
                useForeground
                onPress={() => {
                  requestLocationFine();
                  requestLocationCoarse();
                }}>
                <View style={styles.btnRefresh}>
                  <Icon
                    name={'refresh'}
                    color={'black'}
                    size={30}
                    style={styles.icon}
                  />
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnRefresh: {
    backgroundColor: 'white',
    elevation: 5,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
  },
  textLoading: {
    color: 'black',
    marginHorizontal: 10,
    flex: 1,
  },
  viewLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  containerAlignment: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  BgOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
  },
});
