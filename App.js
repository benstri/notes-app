import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useRef } from 'react';
import MasonryList from "@react-native-seoul/masonry-list";
import { TouchableOpacity } from 'react-native';
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation } from './db';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) { // HOME SCREEN PAGE
    
  return (
    <View style={tw`flex-1 items-center pt-5 bg-[#151965]`}> 
      <Text style={tw`mb-4 text-xl text-white font-bold`}> 
        Inscript - Notes App
      </Text>
      <TouchableOpacity 
        title="New Note"
        onPress={() => navigation.navigate('Note')}
        style={tw`bg-[#46B5D1] rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}
      >
        <Text style={tw`text-white text-center text-4xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewNote() { // NOTE SCREEN PAGE

  const [text, onChangeText] = useState('New Note Title');
  const [number, onChangeNumber] = useState('');
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  // style later

  return (
    <View style={tw`pt-5 pl-5 pr-5`}>
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

function App() {
  useDeviceContext(tw);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerStyle: tw`bg-[#151965] border-0`,
          headerTintColor: `#fff`,
          headerTitleStyle: tw`font-bold`,
          headerShadowVisible: false, 
        }}
        />
        <Stack.Screen 
        name="Note" 
        component={NewNote}
        options={{
          headerStyle: tw`bg-[#151965] border-0`,
          headerTintColor: `#fff`,
          headerTitleStyle: tw`font-bold`,
          headerShadowVisible: false, 
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;