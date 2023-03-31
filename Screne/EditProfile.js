import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content, API_Profile } from '../API/login';
import React, { useState, useEffect } from 'react';
import HeaderPost from "../header/headerPost"
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
export default function EditProfile(props) {
    const nav = props.navigation;
    const route = useRoute();
    const { item } = route.params;
    const [img, setImage] = useState(item.img);
    const [name, setName] = useState(item.name);
    const [sex , setSex] = useState(item.sex);
    const [hoc_van, setHoc_van] = useState(item.hoc_van);
    const [Tieu_Sua,setTieu_Sua] = useState(item.Tieu_Sua);
    const [sinh_song, setSinh_song] = useState(item.sinh_song);
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
    
    const Edit = (id) =>{
        const newList ={
            name , img , Tieu_Sua, sex, hoc_van , sinh_song
        }
        fetch(API_Profile +"/"+id,{
            method:"PUT",
            body:JSON.stringify(newList),
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => nav.goBack())
    }
    return (
        <View style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Ảnh đại diện</Text>
                <TouchableOpacity
                onPress={()=>{
                    pickImage()
                    Edit(item.id)
                }}
                >
                    <Text style={{ color: "#3333FF", fontSize: 15 }}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            <Image style={{
                width: 130, height: 130, borderRadius: 100, alignSelf: "center",
                marginTop: 10
            }} source={{ uri: item.img }} />
            <View style={{ height: 0.5, width: "100%", backgroundColor: "gray", marginTop: 14 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Tiểu sử</Text>
                <TouchableOpacity
                onPress={()=>{
                    Edit(item.id)
                }}>
                    <Text style={{ color: "#3333FF", fontSize: 15 }}>Thêm</Text>
                </TouchableOpacity>

            </View>
            <TextInput
               onChangeText={(text)=>{
                setTieu_Sua(text)
               }}
                placeholder='Mo ta ban than...'
                style={{ alignSelf: "center", fontSize: 16, marginTop:10 }}
                value={Tieu_Sua} />
            <View style={{ height: 0.5, width: "100%", backgroundColor: "gray", marginTop: 14 }} />
            <View  style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Chi tiết</Text>
                <TouchableOpacity
                onPress={()=>{
                    Edit(item.id)
                }}>
                    <Text style={{ color: "#3333FF", fontSize: 15 }}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
            onChangeText={(text)=>{
                setHoc_van(text)
            }}
            placeholder='Học vấn...'
            style={{marginTop:20, borderWidth:1, height:40,paddingStart:10}} 
            value={hoc_van}/>
            <TextInput
               onChangeText={(text)=>{
                setSinh_song(text)
            }}
            placeholder='Sinh sống... '
             style={{marginTop:10, borderWidth:1, height:40,paddingStart:10}} 
            value={sinh_song}/>
            <TextInput
             onChangeText={(text)=>{
                setSex(text)
            }}
            placeholder='Giới tính...'
             style={{marginTop:10, borderWidth:1, height:40,paddingStart:10}} 
            value={sex}/>
        </View>
    )
}