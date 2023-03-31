import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content } from '../API/login';
import React, { useState, useEffect } from 'react';
import {checkData} from "../Check/index"
export default function HeaderPost({onPress, post }){
    return(
        <View style={{width:"100%", height:50 , borderBottomWidth:1 , flexDirection:"row",
        justifyContent:"space-between", alignItems:"center"}}>
            <TouchableOpacity 
             onPress={onPress}
            style={{flexDirection:"row", alignItems:"center"}}>
            <Image style={{width:17 , height:17 , marginStart:15}} source={icon.back}/>
           <Text style={{marginStart:8,fontSize:16}}>Tạo bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={post}>
                 <Text style={{fontSize:17, marginRight:15
                }}>Post</Text>
            </TouchableOpacity>
         
        </View>
    )
}