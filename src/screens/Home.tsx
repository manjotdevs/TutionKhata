import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home({navigation}: any): React.JSX.Element {
  const [ShowModal, setShowModal] = useState(false);

  return (
    <>
      <View style={{backgroundColor:'green',height:'100%'}}>
        <Portal>
          <Modal
            visible={ShowModal}
            onDismiss={() => {
              setShowModal(false);
            }}>
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button
          style={{marginTop: 30}}
          onPress={() => {
            setShowModal(true);
          }}>
          Show
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
        style={Styles.floationgbutton}>
        <Text>+</Text>
      </TouchableOpacity>
    </>
  );
}

const Styles = StyleSheet.create({
  floationgbutton: {
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
});

export default Home;
