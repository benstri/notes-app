import { SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { Button } from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={tw`flex-1 items-center justify-center mt-10`}> 
      <Button 
        title="New Note"
        onPress={() => navigation.navigate('Note')}
      />
    </View>
  );
}

function NewNote() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-lg`}>New Note</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Note" component={NewNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;