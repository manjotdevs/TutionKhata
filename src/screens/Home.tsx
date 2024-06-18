import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider as PaperProvider, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SText } from '../utils/Styled';

function Home({ navigation }: any): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [teacherList, setTeacherList] = useState<string[]>([]);

  useEffect(() => {
    retrieveData();
  }, []);

  // Add Teacher to storeData
  const addTeacher = async () => {
    if (teacherName.trim() !== '') {
      const newTeacherList = [...teacherList, teacherName];
      setTeacherList(newTeacherList);
      setTeacherName('');
      await storeData(newTeacherList);
    }
  };

  const storeData = async (data: string[]) => {
    try {
      await AsyncStorage.setItem('TeacherList', JSON.stringify(data));
    } catch (e) {
      console.log('Error saving data:', e);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TeacherList');
      if (value !== null) {
        setTeacherList(JSON.parse(value));
      }
    } catch (e) {
      console.log('Error retrieving data:', e);
    }
  };

  return (
    <PaperProvider>
      <View style={{ backgroundColor: 'rgba(40, 167, 69, 0.5)', height: '100%' }}>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button
          style={{ marginTop: 30 }}
          onPress={() => setShowModal(true)}
        >
          Show
        </Button>
        <SText className='bg-red-500'>hi</SText>
        <View style={Styles.container}>
          <TextInput
            value={teacherName}
            onChangeText={text => setTeacherName(text)}
            placeholder="Enter teacher's name"
            style={Styles.input}
          />
          <Button mode="contained" onPress={addTeacher} style={Styles.button}>
            Add
          </Button>
          <FlatList
            data={teacherList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item}
                left={() => <List.Icon icon="account" />}
              />
            )}
            style={Styles.textList}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={Styles.floatingButton}
      >
        <Icon name="plus" size={29} color={'rgba(255, 255, 255, 1)'} />
      </TouchableOpacity>
    </PaperProvider>
  );
}

const Styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    elevation: 25,
    shadowColor: '#0009',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
    borderRadius:2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    marginBottom: 20,
  },
  textList: {
    marginTop: 20,
  },
});

export default Home;
