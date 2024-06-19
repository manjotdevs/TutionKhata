import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {
  Provider as PaperProvider,
  List,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SText, SView, STextInput, STouchableOpacity} from '../utils/Styled';
import {Background, Button} from '../utils/Themes';

function Home({navigation}: any): React.JSX.Element {
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
    <>
      <SView className='h-full'>
        <STextInput
          value={teacherName}
          onChangeText={text => setTeacherName(text)}
          placeholder="Enter teacher's name"
        />
         <STouchableOpacity onPress={addTeacher} className={Button.primary}>
            <SText>Add</SText>
          </STouchableOpacity>
        <FlatList
          data={teacherList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <List.Item title={item} left={() => <List.Icon icon="account" />} />
          )}
        />
      <STouchableOpacity
        onPress={() => setShowModal(true)}
        className={`${Button.floating}`}>
        <Icon name="plus" size={29} color={'rgba(255, 255, 255, 1)'} />
      </STouchableOpacity>
 
      </SView>
   </>
  );
}
export default Home;
