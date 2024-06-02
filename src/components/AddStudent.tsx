import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';

function AddStudent(){
    return(
        <Card>
            <Card.Title title="Add Student" />
            <Card.Content>
               <IconButton icon="plus" />
            </Card.Content>
        </Card>
    )
}

export default AddStudent;