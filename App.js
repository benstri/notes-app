import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import MasonryList from "@react-native-seoul/masonry-list";
import { TouchableOpacity } from 'react-native';
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation } from './db';



function HomeScreen({ navigation }) { // HOME SCREEN PAGE

  const { data: searchData, error, isLoading } = useSearchNotesQuery("");
  const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation();
  const [ deleteNote ] = useDeleteNoteMutation();
  
  useEffect(() => {
    if (addNoteData != undefined) {
      console.log(addNoteData.title);
      navigation.navigate("Edit", {data: addNoteData});
    }
  }, [addNoteData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item) } style={tw`w-[98%] mb-0.5 mx-auto bg-purple-300 rounded-sm px-1`}> 
      <Text>
        {item.title} 
      </Text>
      <Text>
        {item.id}
      </Text>
    </TouchableOpacity>
  )
    
  return (
    <View style={tw`flex-1 items-center pt-5 bg-[#151965]`}> 
      <Text style={tw`mb-4 text-xl text-white font-bold`}> 
        Inscript - Notes App
      </Text>
      
      {searchData ?
        <MasonryList
          style={tw`px-0.5 pt-4 pb-20`}
          data={searchData}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        : <></>
      }
      <TouchableOpacity
        onPress={() => { addNote({title: "New Note", content: "content"}); }}
        style={tw`bg-[#46B5D1] rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}
      >
        <Text style={tw`text-white text-center text-4xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewNote( {route, navigation }) { // NOTE SCREEN PAGE

  

  const [text, onChangeText] = useState('New Note Title');
  const [number, onChangeNumber] = useState('');
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  useLayoutEffect(() => {
    navigation.setOptions({ title: route.params.data.title });
  }, []);
  

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

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;