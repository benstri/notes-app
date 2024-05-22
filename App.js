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