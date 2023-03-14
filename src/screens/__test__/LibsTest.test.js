import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function LibsTest() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x, i) => (
        <Item key={x} i={i} />
      ))}
    </ScrollView>
  );
}

function Item({i}) {
  const [open, setopen] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setopen(!open);
  };
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
      <View style={styles.row}>
        <Text>Header - {i + 1}</Text>
        <Text>{open ? 'close' : 'open'}</Text>
      </View>
      {open &&
        [1, 2, 3, 4, 5].map(x => (
          <Text key={x} style={styles.subItem}>
            - SOME DATA
          </Text>
        ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingTop: 5,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 5,
  },
  subItem: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
