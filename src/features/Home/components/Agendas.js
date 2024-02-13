import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {fetchAgenda} from '../../Agenda/services/agendaServices';
import {colors} from '../../../utils/constant';
import AgendaExcerpt from './AgendaExcerpt';

export default function Agendas() {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {status, data} = useSelector(state => state.agenda);

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchAgenda());
    }
  }, [dispatch]);

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textTitle}>Agenda Kegiatan</Text>
        <ActivityIndicator
          color={colors.primary}
          size="small"
          animating={status == 'pending'}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewAgenda}>
        {/* AgendaExcerpt to prevent multiple hooks re-render */}
        {data?.map((agenda, i) => (
          <AgendaExcerpt key={i} data={agenda} />
        ))}
        {data && (
          <TouchableNativeFeedback
            useForeground
            onPress={() => navigate('Agenda')}>
            <View style={styles.btnViewMore}>
              <Icon
                name={'chevron-right'}
                color={'black'}
                size={50}
                style={styles.icon}
              />
            </View>
          </TouchableNativeFeedback>
        )}
      </ScrollView>
    </View>
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
  btnViewMore: {
    backgroundColor: 'white',
    elevation: 3,
    overflow: 'hidden',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    margin: 10,
  },
  textAgendaTitle: {
    fontWeight: '500',
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  viewAgenda: {
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 170,
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#183240',
    fontSize: 17,
    paddingHorizontal: 20,
    paddingRight: 10,
  },
});
