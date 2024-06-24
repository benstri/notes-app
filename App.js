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

// above is all of the imports

function HomeScreen({ navigation, item }) { // HOME SCREEN PAGE
  const [search, setSearch] = useState("");
  const { data: searchData, error: searchNotesError, isLoading: searchNotesIsLoading } = useSearchNotesQuery(""+search);
  const [ addNote, { data: addNoteData, error: addNoteError }] = useAddNoteMutation();
  const inputRef = useRef(null);

  
  useEffect(() => { // navigates to new note upon creating it
    if (addNoteData != undefined) {
      console.log(addNoteData.title);
      navigation.navigate("Note", {note: addNoteData});
    }
  }, [addNoteData]);

  const renderItem = ({ item }) => ( // note card inside the masonrylist
    <TouchableOpacity onPress={() => {navigation.navigate('Note', {note : item}); }} style={tw`w-[98%] mb-0.5 mx-auto bg-[#DBE2EF] p-1 rounded px-1`}> 
      <Text style={tw`text-xl font-bold`}> 
        {item.title}
      </Text>
      <Text style={tw`text-lg`}>
        {item.content} 
      </Text>
    </TouchableOpacity>
  )
    
  return (
    <View style={tw`flex-1 items-center pt-5`}> 
      <Text style={tw`mb-4 text-xl font-bold`}>
        Notes App 
      </Text> 
      <TextInput // search bar
        placeholder='Search'
        value={search}
        ref={inputRef}
        style={tw`text-lg bg-slate-300 rounded p-1 w-screen`}
        onChangeText={(search) => {setSearch(search)}}
      />
    
      {searchData ?
        <MasonryList // columed notes
          style={tw`px-0.5 pt-4 pb-20`}
          data={searchData}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        : <></>
      }
      <TouchableOpacity // adds new note to the masonrylist
        onPress={() => { addNote({title: "", content: ""}); }}
        style={tw`bg-[#46B5D1] rounded-full absolute bottom-[5%] right-8 mx-auto items-center flex-1 justify-center w-12 h-12`}
      >
        <Text style={tw`text-white text-center text-4xl mt--1`}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewNote({ route, navigation }) { // NOTE SCREEN PAGE
  const {note} = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const inputRef = useRef(null);
  const [ deleteNote ] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const focusInput = () => { // focuses on text input, makes it more user friendly
    inputRef.current.focus();
  }

  const saveNote = () => {
    updateNote({ id: note.id, title: title, content: content });
  }

  const changeTitle = (text) => {
    setTitle(text);
    saveNote(text);
  }

  const changeContent = (text) => {
    setContent(text);
    saveNote(text);
  }
  
  useLayoutEffect(() => { // delete button in head of the edit screen
    saveNote();
    navigation.setOptions({
      title: title,
      headerRight: () => 
      <TouchableOpacity 
        onPress={() => {
          navigation.popToTop(); // makes sure the screen returns to home upon deletion
          deleteNote(note);
        }} 
      >
        <Text style={tw`mr-5 text-xl`}>
          🗑️
        </Text>
      </TouchableOpacity>,
    });
  }, [navigation, note, title, content]);

  /*
  useEffect(() => { // will delete the note if it is empty, for some reason doesn't work right now
    saveNote();
    navigation.addListener("beforeRemove", (event) => {
      if (title === ("") && content === ("")) { 
        deleteNote(note);
      }
    });
  }, [navigation, note, title, content]);
  */ 

  return (
    <View style={tw`pt-5 pl-5 pr-5 h-full`}>
      <TextInput // title of note
        defaultValue={title}
        style={tw`text-2xl`}
        ref={inputRef}
        placeholder='New Note Title'
        onChangeText={changeTitle}
      />
      <TextInput // content of note
        defaultValue={content}
        placeholder='Add the content to your new note!'
        style={tw`text-lg h-4/5`}
        ref={inputRef}
        multiline={true}
        onChangeText={changeContent}
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
            headerStyle: tw`border-0`,
            headerTitleStyle: tw`font-bold`,
            headerShadowVisible: false, 
          }}
          />
          <Stack.Screen
          name="Note"
          component={NewNote}
          options={{
            headerStyle: tw`border-0`,
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