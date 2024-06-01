import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import { useTheme } from 'react-native-paper';

function AppBar() {
  const { colors } = useTheme();
  return (
    <View>
      <Appbar.Header style={{backgroundColor:colors.primary}} > 
        <Appbar.Content title="TutionKhata" />
      </Appbar.Header>
      <Text style={{color: colors.primary}}>TutionKhata</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    alignContent: 'center',
    color: 'white',
  },
});

export default AppBar;
