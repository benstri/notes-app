import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

function Card({notedata, navigation}) { // NOTE CARD IN GRID ON HOME SCREEN
    return (
        
        <Button
            style={tw`rounded-m bg-slate-900 text-white`}
            
        >
            <Text style={tw`text-white`}>{notedata.title}</Text>
            <Text style={tw`text-white`}>{notedata.description}</Text>
        </Button>
    );
}

export default Card;