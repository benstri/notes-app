import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { Button } from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

function HomeScreen({ navigation }) { // main page

  return (
    <View style={tw`flex-1 items-center mt-5`}> 
      <Button 
        title="New Note"
        onPress={() => navigation.navigate('Note')}
      />
    </View>
  );
}

function NewNote() { 

  const [text, onChangeText] = useState('New Note Title');
  const [number, onChangeNumber] = useState('');
  
  return (

    <View style={tw`mt-5`}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={tw`text-2xl`}
      />
      <TextInput
        onChangeText={onChangeNumber}
        value={number}
        placeholder='Add the content to your new note!'
        style={tw`text-lg`}
        keyboardType="numeric"
      />
    </View>
  );
}

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