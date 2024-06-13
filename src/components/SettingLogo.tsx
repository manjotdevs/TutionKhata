import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Text,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultImage = require('../assets/Images/profile_pic.jpg'); // Your default image path

const SettingLogo: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      mediaType: 'photo' as const,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset?.base64) {
          AsyncStorage.setItem('storedImage', asset.base64);
          setImageUri(asset.uri ?? null);
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
      mediaType: 'photo' as const,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets && response.assets[0];
        if (asset?.base64) {
          AsyncStorage.setItem('storedImage', asset.base64);
          setImageUri(asset.uri ?? null);
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
    <>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}>
        <Image
          source={imageUri ? { uri: imageUri } : defaultImage}
          style={styles.image}
        />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
          style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View>
              <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Text>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={openGallery}>
                <Text>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={loadImage}>
                <Text>Load Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={deleteImage}>
                <Text>Delete Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cancelView}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    bottom: 0,
    width: '100%',
    height: '100%',
    margin: 0,
  },
  modalView: {
    position: 'absolute',
    top: 80,
    backgroundColor: 'blue',
    width: '100%',
    height: 500,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    backgroundColor: '#6200EE',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 8, // For Android
  },
  buttonCancel: {
    backgroundColor: 'red',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 8, // For Android
    width: '30%',
  },
  cancelView: {
    flex: 1,
    paddingTop: 30,
    position: 'relative',
    left: '65%',
  },
});

export default SettingLogo;
