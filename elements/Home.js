import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
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

export default HomeScreen;