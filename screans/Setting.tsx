import { View, Text, SafeAreaView,Button,Image, StyleSheet } from "react-native";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';



export default function Setting() {
  return (
    <SafeAreaView>
      <View>
         <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </SafeAreaView>
  );
}

