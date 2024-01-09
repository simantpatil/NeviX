import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    Alert
  } from "react-native";
  import { Feather } from '@expo/vector-icons';
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db } from "../firebase";
  import { doc, setDoc } from "firebase/firestore";
  const RegisterScreen = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [phone,setPhone] = useState("");
      const navigation = useNavigation();
      const register = () => {
        if(email === "" || password === "" || phone === ""){
          Alert.alert(
            "Invalid Details",
            "Please fill all the details",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        }
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
          console.log("user credential",userCredential);
          const user = userCredential._tokenResponse.email;
          const myUserUid = auth.currentUser.uid;
  
          setDoc(doc(db,"NeviX",`${myUserUid}`),{
            email:user,
            phone:phone
          })
        })
      }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#212121",
          alignItems: "center",
          padding: 10,
        }}
      >
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 20, color: "#06B6D4", fontWeight: "bold" }}>
              Register
            </Text>
  
            <Text style={{ fontSize: 18, color: "white", marginTop: 8, fontWeight: "600" }}>
              Create a new Account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="white"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="white"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "white",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                }}
              />
            </View>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="white"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "white",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20,
                }}
              />
            </View>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="white" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone No"
                placeholderTextColor="white"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "white",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 10,
                }}
              />
            </View>
  
            <Pressable
            onPress={register}
              style={{
                width: 300,
                backgroundColor: "#06B6D4",
                padding: 15,
                borderRadius: 100,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ fontSize: 18, textAlign: "center", color: "black" }}>
                Register
              </Text>
            </Pressable>
  
            <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Already have a account? Sign in
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({});
  