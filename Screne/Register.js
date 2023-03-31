import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity , Alert , ToastAndroid} from 'react-native';
import { img } from '../compoment/index';
import { useState , useEffect } from "react"
import { API_Login } from '../API/login';
import {checkEmail , checkPassword , checkRepassword} from "../Check/validate"
import { async } from '@firebase/util';
export default function Register(props) {
    const nav = props.navigation;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorEmail , setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRepassword, setErrorRepassword] = useState('');
    const validatePassword =(textrepassword , textpassword)=>{
        return textpassword === textrepassword
    }
    const newList = {
        email , password:repassword
    }
    const thongBao = (txtThongBao) =>{
        Alert.alert("Thông báo", txtThongBao);
    }
    const Toast = () =>{
        ToastAndroid.show("Đăng ký thành công!", ToastAndroid.LONG)
    }
    const kiemTraEmail = (text)=>{
        fetch(API_Login)
        .then(res => res.json())
        .then(res_check =>{
            if(res_check.some((item) => item.email === text)){
               thongBao("Email này đã tồn tại")
             
                return;
            }else{
              Toast();
                fetch(API_Login,{
                    method:'POST',
                    body:JSON.stringify(newList),
                    headers:{
                        "Content-Type": "application/json",
                        "ACCEPT": "application/json"
                    }
                }).
                then( nav.goBack())
                .catch(err=>console.log(err));
            }
        }).catch(err => console.log(err))
    }
    // const checkLogin =()=>{
    //     if(errorEmail === '' || errorPassword === '' || errorRepassword === ''){
    //         kiemTraEmail(email); 
           
    //     }
    // }
    const checkValidate = () =>{
        if(email.length == 0 || password.length == 0 || repassword.length == 0){
           thongBao("Vui lòng nhập đầy đử thông tin !");
        }else{
        // loginSuccess();
         kiemTraEmail(email);
        }
    } 
    const onClear = () =>{
        setEmail("")
        setPassword("")
        setRepassword("")
       
    }
    return (

        <View style={{
          padding:20
        }}>
            <Image style={{
                alignSelf:"center",
                width: 100, height: 100, marginTop: 10,
                borderRadius: 50
            }} source={img.logo} />
            <TextInput
                onChangeText={(text) => {
                    if (checkEmail(text) == true) {
                        setErrorEmail("")
                         setEmail(text)
                    }else{
                        setErrorEmail( "Email is not valid");
                    }
                   
                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                    marginTop: 50, borderRadius: 6, padding: 10
                }}
                placeholder="Phone or email" />
                <Text style={{color:"red"}}>{errorEmail}</Text>
            <TextInput
                onChangeText={(text) => {
                    if (checkPassword(text) == true) {
                         setErrorPassword("")
                         setPassword(text)
                    }else{
                        setErrorPassword("Password is not valid");
                    }
                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                    borderRadius: 6, padding: 10
                }}
                placeholder="Pass" />
                 <Text style={{color:"red"}}>{errorPassword}</Text>
            <TextInput
                onChangeText={(text) => {
                    if (checkRepassword(text) == true && validatePassword(text, password) == true) {
                        setErrorRepassword("")
                        setRepassword(text)
                    }else{
                        setErrorRepassword("Re-password is not valid");
                    }
                }}
                style={{
                    width: "100%", height: 40, borderColor: "gray", borderWidth: 1,
                    borderRadius: 6, padding: 10
                }}
                placeholder="Repass" />
                 <Text style={{color:"red"}}>{errorRepassword}</Text>
            <TouchableOpacity
            onPress={()=>{
             
                checkValidate();
       
              
            }}
             style={{
                width: "100%", height: 40, backgroundColor: "#3333FF",
                marginTop: 40, alignItems: "center", justifyContent: "center",
                borderRadius: 8
            }}>
                <Text style={{
                    color: "white", fontSize: 15, fontWeight: "bold"
                }}>Đăng ký</Text>
            </TouchableOpacity>
            <Image style={{ width: 50, height: 50, marginTop: 50, alignSelf:"center" }} source={img.meta} />
        </View>
    )
}