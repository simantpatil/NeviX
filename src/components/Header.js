import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

  

const Header = ({navigation}) => {
  const user = auth.currentUser;
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login");
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <View className="flex-row px-4 py-3 justify-between items-center bg-gray-800 shadow-lg ">
      <Pressable onPress={signOutUser}>
      <Text className="text-base font-Bold text-cyan-400">
        NeviX
      </Text>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <MagnifyingGlassIcon color="#ffffff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
