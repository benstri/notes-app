import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import NewNote from "./elements/Note";
import HomeScreen from "./elements/Home";

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  
  return (
    <NavigationContainer style={tw`bg-gray-900 text-white`}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Note" component={NewNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;