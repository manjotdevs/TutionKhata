import React from 'react';
import AddStudent from '../Components/AddStudent';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';

function Home({navigation}: any): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <>
      <AddStudent />
      <Button
        mode="contained"
        textColor="#24ea0e"
        buttonColor="#afe3ea"
        onPress={() => {
          navigation.navigate('Main');
        }} icon="account">
        Main Page
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={{color:'black'}}>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </>
  );
}

export default Home;
