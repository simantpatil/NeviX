import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import logo from "../src/logo.png";

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-neutral-900">
      <Image animation="fadeIn" duration={3000} style={{height:165,width:165}} source={logo}/>
      <Text> </Text>
      <Animatable.Text
        className="text-4xl text-cyan-500 font-bold"
        animation="fadeIn"
        duration={3000}>
        NeviX
      </Animatable.Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
