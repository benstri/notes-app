import { SafeAreaView, Text } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 

function App() {
  useDeviceContext(tw);
  
  return (
    <Provider store={store}> 
      <SafeAreaView>
        <Text style={tw`w-screen ml-5 mt-5 text-left text-xl`}>
          Inscript - Notes App
        </Text>
      </SafeAreaView>
    </Provider>
  )
}

export default App;
