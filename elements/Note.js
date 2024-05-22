import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useRef } from 'react';

function NewNote() { // NOTE SCREEN PAGE

    const [text, onChangeText] = useState('New Note Title');
    const [number, onChangeNumber] = useState('');

    const inputRef = useRef(null);

    function focusInput() {
      inputRef.current.focus();
    }

    // style later

    return (
      <View style={tw`pt-5`}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={tw`text-2xl`}
          ref={inputRef}
        />
        <TextInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder='Add the content to your new note!'
          style={tw`text-lg`}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
    );
}

export default NewNote;