import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import MasonryList from "@react-native-seoul/masonry-list";
import { TouchableOpacity } from 'react-native-web';

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

export default HomeScreen;