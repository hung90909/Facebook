import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content } from '../API/login';
import React, { useState, useEffect } from 'react';
import HeaderPost from "../header/headerPost"
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {checkData} from "../Check/index"

export default function Add(props) {
    const nav = props.navigation;
   // const {onPress} = props;
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [countLike, setCountLike] = useState(0);
    const [statusLike, setStatusLike] = useState(false);
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const times = `${hours}:${minutes}`;

  
    const onSave = () => {
        const newList = {
            img: image, title, countLike, statusLike, times
        }
        fetch(API_Content, {
            method: "POST",
            body: JSON.stringify(newList),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
   
    return (
        <SafeAreaView style={{ }}>
          <HeaderPost
          onPress={() => nav.navigate('Home')}
          
          post={()=>{
            if(checkData(title , image) == true){
            onSave();
            nav.navigate('Home')
            }else{
                Alert.alert("Thông báo","Bạn cần nhập thông tin !",[
                    {
                        title:"Ok"
                    }
                ])
            }
          }}
   
          />
          <View style={{padding:20}}>
            <TextInput
                onChangeText={(text) => {
                    setTitle(text);
                }}
                style={{ fontSize: 20 }}
                placeholder='Bạn đang nghĩ gì ?' />
            {image && <Image
                style={{
                    width: 150, height: 150, resizeMode: "center"
                }} source={{ uri: image }} />}
            <TouchableOpacity
                onPress={() => {
                    pickImage();
                }}
                style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 25, height: 25, marginTop: 30 }} source={icon.img} />
                <Text style={{ marginTop: 30, marginLeft: 10 }}>Image</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {
                    onSave();
                }}>
                <Text>Dang </Text>
            </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}