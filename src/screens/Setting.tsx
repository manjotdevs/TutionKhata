import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Button,Surface } from 'react-native-paper';
import SettingLogo from '../Components/SettingLogo';
function Setting() {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
      <SettingLogo />
      </View>
      <View>
        <Text>hi</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagecontainer: {
  }
});

export default Setting;
