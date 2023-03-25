import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({
  title = 'Title',
  iconName = 'chevron-left',
  onPress,
}) {
  return (
    <View style={styles.container(StatusBar.currentHeight)}>
      {/* <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      /> */}
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={styles.btnHeader}>
          <Icon name={iconName} color={'white'} size={32} />
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.titleHeader}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: '500',
    marginHorizontal: 20,
    color: 'black',
    fontSize: 16,
  },
  btnHeader: {
    backgroundColor: 'black',
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: statBarHeight => ({
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    zIndex: 9,
    // marginTop: statBarHeight,
  }),
});
