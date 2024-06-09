import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const defaultImage = require('../assets/Images/profile_pic.jpg'); // Your default image path

  useEffect(() => {
    loadImage();
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera permission to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const requestStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs storage permission to save photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const openCamera = async (): Promise<void> => {
    const cameraPermission = await requestCameraPermission();
    const storagePermission = await requestStoragePermission();

    if (!cameraPermission || !storagePermission) {
      Alert.alert('Permissions not granted');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset?.base64) {
          AsyncStorage.setItem('storedImage', asset.base64);
          setImageUri(asset.uri);
        }
      }
    });
  };

  const openGallery = async (): Promise<void> => {
    const storagePermission = await requestStoragePermission();

    if (!storagePermission) {
      Alert.alert('Storage permission not granted');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset?.base64) {
          AsyncStorage.setItem('storedImage', asset.base64);
          setImageUri(asset.uri);
        }
      }
    });
  };

  const loadImage = async (): Promise<void> => {
    const base64String = await AsyncStorage.getItem('storedImage');
    if (base64String) {
      setImageUri(`data:image/jpeg;base64,${base64String}`);
    } else {
      setImageUri(Image.resolveAssetSource(defaultImage).uri);
    }
  };

  const deleteImage = async (): Promise<void> => {
    await AsyncStorage.removeItem('storedImage');
    setImageUri(Image.resolveAssetSource(defaultImage).uri);
  };

  return (
    <View style={styles.container}>
      <Image
        source={imageUri ? { uri: imageUri } : defaultImage}
        style={styles.image}
      />
      <Button title="Open Camera" onPress={openCamera} />
      <Button title="Open Gallery" onPress={openGallery} />
      <Button title="Load Image" onPress={loadImage} />
      <Button title="Delete Image" onPress={deleteImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Setting;
