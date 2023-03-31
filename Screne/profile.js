import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content, API_Profile } from '../API/login';
import React, { useState, useEffect } from 'react';
import HeaderPost from "../header/headerPost"
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import HeaderProfile from '../header/headerProfile';
export default function Profile(props) {
    const nav = props.navigation;
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    const trangThai = useIsFocused();
    const getAPI = () => {
        fetch(API_Profile)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));

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
    useEffect(() => {
        getAPI();
    }, [trangThai])
    return (
       
        <FlatList
            style={{ }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
         
                <SafeAreaView style={{ flex: 1, }}>
                  <HeaderProfile 
                  onPress={()=>{
                    nav.navigate("Home",{item})
                  }}
                  exit={()=>{
                    nav.navigate("Login")
                  }}
                  />
                    <Image
                        style={{ width: "100%", height: 180 ,marginTop:5 }}
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQx4ZyraeYXWkpBsBzcIdFf_PMRU2id8joA&usqp=CAU" }} />
                    <Image style={{
                        width: 130, height: 130, borderRadius: 100, position: "absolute", top: 150, left: 10,
                        borderWidth: 3, borderColor: "white"
                    }} source={{ uri: item.img ? item.img :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yWypu8OJJOXTlGhzyUe5XJgDur_VllDeYQ&usqp=CAU" }} />
               
                    <TouchableOpacity 
                    onPress={()=>{
                        pickImage(item.id);
                        let name = item.name;
                        let sex = item.sex;
                        let hoc_van = item.hoc_van;
                        let sinh_song = item.sinh_song
                        let Tieu_Sua = item.Tieu_Sua;
                        const newList = {
                            name , sex , hoc_van, sinh_song, Tieu_Sua,
                            img:image
                        }
                        fetch(API_Profile+"/"+item.id,{
                            method:"PUT",
                            body:JSON.stringify(newList),
                            headers:{
                                "Content-Type": "application/json"
                            }
                        }).then(getAPI())
                      
                    }}
                    style={{
                        width: 30, height: 30, borderRadius: 20, backgroundColor: "gray", justifyContent: "center", alignItems: "center",
                        position: "absolute", top: 245, left: 110

                    }}>
                        <Image style={{ width: 20, height: 20 }} source={icon.camera} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 36, marginLeft: 10 }}> {item.name}</Text>
                    <Text style={{marginLeft:23}}>{item.Tieu_Sua}</Text>
                    <View style={{ paddingHorizontal: 10, marginTop:25 }}>
                        <TouchableOpacity
                        onPress={()=>{
                            nav.navigate("EditProfile",{item})
                        }}
                         style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 40,
                            alignItems:"center",
                            justifyContent: "center",
                            backgroundColor: "#C6C7C1",
                            borderRadius:10
                        }}>
                            <Image style={{ width: 20, height: 20 }} source={icon.edit} />
                            <Text style={{fontWeight:"bold",marginLeft:6}}>Chỉnh sửa trang cá nhân</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"100%", height:20, backgroundColor:"#A0A19D",
                    marginTop:20}} />
                    <View style={{paddingHorizontal:10}}>
                          <Text style={{fontWeight:"bold", fontSize:20, marginTop:20}}>Chi tiết </Text>
                          <View style={{flexDirection:"row", marginTop:17, alignItems:"center",
                        width:"70%"}}>
                            <Image style={{
                                tintColor:"gray",
                                width:20, height:20,
                            }} source={icon.study}/>
                            <Text style={{marginLeft:6}}>{item.hoc_van}</Text>
                          </View>
                        
                          <View style={{flexDirection:"row", marginTop:15}}>
                            <Image style={{
                                tintColor:"gray",
                                width:20, height:20,
                            }} source={icon.home}/>
                            <Text style={{marginLeft:6}}>{item.sinh_song}</Text>
                          </View>

                          <View style={{flexDirection:"row", marginTop:15}}>
                            <Image style={{
                                tintColor:"gray",
                                width:20, height:20,
                            }} source={icon.use}/>
                            <Text style={{marginLeft:6}}>{item.sex}</Text>
                          </View>
                    </View>
                
                </SafeAreaView>
            }
        />

    )

}