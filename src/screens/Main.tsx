import React from 'react';
import {Text} from 'react-native';
import { Button } from 'react-native-paper';
export default function MainScrean({navigation}:any) {
  return (
    <>
      <Text>Home</Text>
      <Button onPress={()=>{
        navigation.navigate('Home')
      }}>Home page</Button>
    </>
  );
}
