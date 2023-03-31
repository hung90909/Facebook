import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content } from '../API/login';
import React, { useState, useEffect } from 'react';
import HeaderPost from "../header/headerPost"
import HeaderEdit from '../header/headerEdit';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {checkData} from "../Check/index"
import {useRoute} from '@react-navigation/native';

export default function Edit(props) {
    const rount = useRoute();
    const nav = props.navigation;
    const {item} = rount.params;
    const [img, setImg] = useState(item.img);
    const [title, setTitle] = useState(item.title);
    const [countLike, setCountLike] = useState(item.countLike);
    const [statusLike, setStatusLike] = useState(item.statusLike);
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const times = `${hours}:${minutes}`;

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
            setImg(result.assets[0].uri);
        }
    };

    const onEdit = (id) =>{
        const newList = {
            title ,img , countLike, statusLike, times
        }
        fetch(API_Content +"/"+ id, {
            method:"PUT",
            body: JSON.stringify(newList),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => nav.goBack())
    }
   return(
    <SafeAreaView>
        <HeaderEdit
        onPress={()=>{
           nav.goBack()
        }}
        post={()=>{
            onEdit(item.id)
        }}
        />
        <View style={{padding:20}}>
         <TextInput 
         value={title}
        onChangeText={(text) => {
           setTitle(text);
        }}
         />
           </View>
          {img && <Image style={{
            width:"100%",height:200
         }} source={{uri:img}}/> }
         <TouchableOpacity
         onPress={()=>{
            pickImage();
         }}>
             <Image  style={{width:30 , height:30 , marginTop:15 ,marginLeft:20 }} source={icon.img}/> 
         </TouchableOpacity>
        
    </SafeAreaView>
   )
}