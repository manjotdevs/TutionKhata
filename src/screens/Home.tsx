import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddStudent from '../components/AddStudent';
import {Button} from 'react-native-paper';

function Home({navigation}:any):React.JSX.Element{
  return (
    <>
      <AddStudent />
      <Button
        mode="contained"
        textColor="#24ea0e"
        buttonColor="#afe3ea"
        onPress={() => {
          navigation.navigate('main')
        }}>
        Main Page
      </Button>
    </>
  );
}

export default Home;

