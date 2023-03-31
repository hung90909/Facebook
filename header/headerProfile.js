import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content } from '../API/login';
import React, { useState, useEffect } from 'react';
import { checkData } from "../Check/index"

export default function HeaderProfile({ onPress , exit }) {
    return (
        <View style={{
            width: "100%", height: 40, backgroundColor: "white",
            justifyContent: "center",
        }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                    onPress={onPress}>
                    <Image style={{ width: 20, height: 20, marginStart: 15, marginTop:6 }} source={icon.back} />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={exit}
                style={{
                    marginRight:15,
                    borderColor:"red",
                    borderWidth:1,
                    borderRadius:5
                }}>
                    <Text style={{padding:5, fontWeight:"bold"}}>Exit</Text>
                </TouchableOpacity>

            </View>

        </View>
    )

}