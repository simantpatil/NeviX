import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ActivityIndicator
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
    useEffect(() => {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(!authUser){
          setLoading(false);
        }
        if(authUser){
          navigation.replace("Home");
        }
      });
  
      return unsubscribe;
    },[])
    
    const login = () => {
      signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        console.log("user credential",userCredential);
        const user = userCredential.user;
        console.log("user details",user)
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
        {loading ? (
          <View style={{backgroundColor:"#212121",alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
            <ActivityIndicator size="large" color={"cyan"}/>
          </View>
        ) : (
          <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 20, color: "#06B6D4", fontWeight: "bold" }}>
              Sign In
            </Text>
  
            <Text style={{ fontSize: 18, color: "white", marginTop: 8, fontWeight: "600" }}>
              Sign In to your account
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
  
            <Pressable
            onPress={login}
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
                Login
              </Text>
            </Pressable>
  
            <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Don't have a account? Sign Up
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Home")} style={{ marginTop: 20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Skip Sign in
              </Text>
            </Pressable>
          </View>
          
        </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  