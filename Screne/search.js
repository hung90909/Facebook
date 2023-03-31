import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content, API_Profile } from '../API/login';
import React, { useState, useEffect } from 'react';
import HeaderPost from "../header/headerPost"
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

export default function Search(props) {
    const nav = props.navigation;
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const serchItem = (search) => {
        fetch(API_Content + "?title_like=" + search)
            .then(res => res.json())
            .then(data => setData(data))
    }
    const getAPI = ()=>{
        fetch(API_Content+ "?title_like=" + search)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
        
      }
    return (
        <SafeAreaView>
            <View style={{
                width: "100%", height: 40, borderBottomWidth: 1, justifyContent: "center",
                flexDirection: "row", justifyContent: "center"
            }}>
                <TouchableOpacity
                    onPress={() => {
                        nav.goBack();
                    }}>
                    <Image style={{ width: 20, height: 20, marginTop: 4, marginRight: 10 }} source={icon.back} />
                </TouchableOpacity>
                <TextInput
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                    placeholder='Search'
                    style={{
                        width: "65%", height: 30, backgroundColor: "#B5BABA", borderRadius: 20,
                        fontSize: 12, paddingLeft: 10
                    }} />
                <TouchableOpacity
                    onPress={() => {
                        if (search.length > 0) {
                            serchItem(search);
                        }

                    }}>
                    <Text style={{ color: "#3333FF", fontSize: 15, marginTop: 4, marginLeft: 10 }}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={{ margin: 10, borderBottomWidth: 0.5 }}>

                        {item.title && <Text style={{ fontSize: 15 }}>{item.title}</Text>}
                        {item.img && <Image style={{ width: "100%", height: 200, marginTop: 10 }} source={{ uri: item.img }} />}
                        <TouchableOpacity
                            onPress={() => {
                                let like = item.countLike + 1;
                                let status = true;
                                let times = item.times;
                                let title = item.title;
                                let img = item.img;

                                const newList = {
                                    countLike: like, statusLike: status, img, title, times
                                }
                                fetch(API_Content + "/" + item.id, {
                                    method: "PUT",
                                    body: JSON.stringify(newList),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(getAPI())
                            }}
                            style={{ flexDirection: "row", marginTop: 20 }}>
                            <Image style={{
                                width: 20, height: 20, tintColor: item.statusLike == true ? "#3333FF" : "gray"
                            }} source={icon.like} />
                            <Text style={{ marginStart: 6, marginBottom: 15 }}>{item.countLike}K</Text>
                        </TouchableOpacity>


                    </View>

                }
            />
        </SafeAreaView>
    )
}