import { Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import MasonryList from "@react-native-seoul/masonry-list";
import { TouchableOpacity } from 'react-native';
import { useSearchNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from './db';

function HomeScreen({ navigation, item }) { // HOME SCREEN PAGE

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
    <TouchableOpacity onPress={() => {navigation.navigate('Note', {note : item}); }} style={tw`w-[98%] mb-0.5 mx-auto bg-[#DBE2EF] p-1 rounded px-1`}> 
      <Text style={tw`text-xl font-bold`}>
        {item.title} 
      </Text>
      <Text style={tw`text-lg`}>
        {item.content}
      </Text>
      <TouchableOpacity onPress={() => deleteNote(item)} style={tw`items-start`}> 
        <Text style={tw`p-1 text-base bg-[#F67280] mb-1 rounded`}>
          Delete
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
    
  return (
    <View style={tw`flex-1 items-center pt-5 bg-[#3F72AF]`}> 
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
        onPress={() => { addNote({title: "New Note", content: "Edit your note with a description!"}); }}
        style={tw`bg-[#46B5D1] rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}
      >
        <Text style={tw`text-white text-center text-4xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewNote({ route }) { // NOTE SCREEN PAGE
  const [updateNote] = useUpdateNoteMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const {note} = route.params;

  function focusInput() {
    inputRef.current.focus();
  }

  saveNote = () => {
    updateNote({id : note.id, content : content, title : title});
  }

  // style later

  return (
    <View style={tw`pt-5 pl-5 pr-5 bg-[#3F72AF] h-full`}>
      <TextInput
        onChangeText={(text) => setTitle(text)}
        value={title}
        style={tw`text-2xl text-white`}
        ref={inputRef}
        placeholder='New Note Title'
      />
      <TextInput
        onChangeText={(text) => setContent(text)}
        value={content}
        placeholder='Add the content to your new note!'
        style={tw`text-lg h-4/5 text-white`}
        ref={inputRef}
        multiline={true}
      />
      <TouchableOpacity
        onPress={saveNote}
        style={tw`bg-[#46B5D1] absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center rounded p-1`}
        onSubmitEditing={() => {
          alert('Your note has been saved.')
        }}
      >
        <Text style={tw`text-white text-center text-2xl mt--1`}>Save</Text>
      </TouchableOpacity>
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
            headerStyle: tw`bg-[#112D4E] border-0`,
            headerTintColor: `#fff`,
            headerTitleStyle: tw`font-bold`,
            headerShadowVisible: false, 
          }}
          />
          <Stack.Screen 
          name="Note" 
          component={NewNote}
          options={{
            headerStyle: tw`bg-[#112D4E] border-0`,
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