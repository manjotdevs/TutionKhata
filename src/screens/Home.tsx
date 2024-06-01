import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppBar from '../components/AppBar';
import AddStudent from '../components/AddStudent';

function Home() {
  return (
    <>
      <AppBar />
      <AddStudent />
    </>
  );
}

export default Home;
