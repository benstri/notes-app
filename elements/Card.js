import { SafeAreaView, Text, View, TextInput } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from '../store';
import 'react-native-reanimated'; 
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-web';

function Card({notedata, navigation}) { // NOTE CARD IN GRID ON HOME SCREEN
    return (
        
        <TouchableOpacity
            style={tw`rounded-m bg-slate-900 text-white`}
            onPress={() => navigation.navigate('Note')}
        >
            <Text style={tw`text-white`}></Text>
            <Text style={tw`text-white`}></Text>
        </TouchableOpacity>
    );
}

export default Card;