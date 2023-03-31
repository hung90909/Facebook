import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native';
import { img } from '../compoment/index';
import { API_Login } from '../API/login';
import React, { useState } from 'react';
import {checkEmail , checkPassword} from "../Check/validate"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
    const nav = props.navigation;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail , setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const navigation = props.navigation;
   
  const onLogin = () => {
    fetch(API_Login+'?email='+email)
    .then(res => res.json())
    .then(async res_login =>{
        if(res_login.length != 1){
           alert("Email không tồn tại")
           return
        }else{
            if(res_login[0].password != password){
               alert("Password không tồn tại")
              
               return;
            }else{  
                nav.navigate("Home")
                onClear();
                
                try{
                     await AsyncStorage.setItem('Login_thongTin', JSON.stringify(res_login[0]));
                    
                }catch(e){

                }
            }
        }
    }).finally()
  };
  const showLogin = () =>{
    if(checkEmail(email) == true && checkPassword(password) == true){
      return true
    }else{
        return false
    }
  }
  const onClear = () =>{
    setEmail("")
    setPassword("")
  }
    return (
        <View style={{
              padding: 20
        }}>
            <Image style={{
                width: 100, height: 100, marginTop: 90,
                borderRadius: 50 , alignSelf:"center"
            }} source={require("../assets/logo.png")} />
            <TextInput
                onChangeText={(text) => {
                    if(checkEmail(text) == true){
                        setEmail(text);
                        setErrorEmail('')
                    }else{
                        setErrorEmail("Email is not valid")
                    }
                   
                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                    marginTop: 50, borderRadius: 6, padding: 10
                }}
                placeholder="Phone or email" />
                <Text style={{color:"red"}}>{errorEmail}</Text>
            <TextInput
              //  value={password}
                secureTextEntry
                onChangeText={(text) => {
                    if(checkPassword(text) == true){
                        setPassword(text);
                        setErrorPassword('')
                    }else{
                        setErrorPassword("Pass is not valid")
                    }
                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                      borderRadius: 6, padding: 10
                }}
                placeholder="Pass" />
                <Text style={{color:"red"}}>{errorPassword}</Text>
            <TouchableOpacity
                onPress={() => {
                    onLogin();
                    onClear();
                }}
               disabled={showLogin()?false:true}
                style={{
                    
                    width: "100%", height: 40, backgroundColor:showLogin()?"#3333FF":"gray",
                    marginTop: 20, alignItems: "center", justifyContent: "center",
                    borderRadius: 8
                }}>
                <Text style={{
                    color: "white", fontSize: 15, fontWeight: "bold"
                }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Register")

                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                    marginTop: 70, alignItems: "center", justifyContent: "center",
                    borderRadius: 8
                }}>
                <Text style={{
                    color: "black"
                }}>Register</Text>
            </TouchableOpacity>
            <Image style={{ width: 50, height: 50 , alignSelf:"center", marginTop:10}} source={img.meta} />
        </View>
    )
}