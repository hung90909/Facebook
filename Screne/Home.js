import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert, TouchableHighlight } from 'react-native';
import { img, icon } from '../compoment/index';
import { API_Login, API_Content } from '../API/login';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
export default function Home(props) {
  const nav = props.navigation;
  const route = useRoute();
  const { item } = route.params ? route.params : {};
  const [data, setData] = useState([]);
  const trangThai = useIsFocused()
  const getAPI = () => {
    fetch(API_Content)
      .then(res => res.json())
      .then(data => setData([...data, data].sort((a, b) => b.id - a.id)))
      .catch(err => console.log(err));

  }
  const onDelete = (id) => {
    fetch(API_Content + '/' + id, {
      method: "DELETE"
    }).then(getAPI())
  }
  useEffect(() => {
    getAPI();
  }, [trangThai])
//   const trangThaiLike = (item) => {
//     let click = item.map((items) => {
//       if (items.name == item.name) {
//         return { ...items, isChecked: items.statusLike == false ? true : false };
//       }
//       return items
//     })
// }
return (
  <View style={{}}>
    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
      <Image style={{ width: 100, height: 40, marginTop: 20, marginStart: 15 }} source={img.facebook} />
      <TouchableOpacity
        onPress={() => {
          nav.navigate('Search');
        }}
        style={{
          marginTop: 30, marginRight: 18, width: 25, height: 25, backgroundColor: "#D3D3D3",
          justifyContent: "center", alignItems: "center", borderRadius: 15
        }}>
        <Image style={{ width: 15, height: 15 }} source={icon.search} />
      </TouchableOpacity>

    </View>

    <View style={{
      flexDirection: "row", justifyContent: "center", paddingHorizontal: 15,
      marginBottom: 15
      , alignItems: "center", marginHorizontal: 15
    }}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate('Profile');
        }}>
        <Image style={{
          width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: "gray"
        }} source={{ uri: item ? item.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yWypu8OJJOXTlGhzyUe5XJgDur_VllDeYQ&usqp=CAU" }} />
      </TouchableOpacity>

      <TextInput
        // onChangeText={(text)=>{
        //    setSearch(text)
        // }}
        style={{
          borderWidth: 1, borderColor: "gray", width: "80%",
          height: 35, paddingStart: 15, marginHorizontal: 10,
          borderRadius: 20
        }}
        placeholder="What are you think ?" />
      <View style={{
        width: 35, height: 35, borderRadius: 17, backgroundColor: "#D3D3D3", justifyContent: "center",
        alignItems: "center"
      }}>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Add")
          }}>
          <Image
            style={{ width: 20, height: 20 }} source={icon.add} />
        </TouchableOpacity>

      </View>

    </View>

    <View style={{ width: "100%", height: 10, backgroundColor: "gray" }}></View>
    <FlatList
      style={{ marginVertical: 10, }}

      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <>
          {item.id && <TouchableHighlight
            underlayColor={"white"}
            onLongPress={() => {
              nav.navigate("Edit", { item })
            }}>

            <View style={{ margin: 10, borderBottomWidth: 0.4 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {item.times && <Text style={{ color: "gray" }}>Đăng lúc: {item.times}</Text>}
                {item.id && <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Thông báo", "Bạn có chắc chẵn muốn xóa không ?", [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          onDelete(item.id)
                        }
                      }
                    ])

                  }}>
                  <Image style={{ width: 20, height: 20 }} source={icon.delete} />
                </TouchableOpacity>}

              </View>

              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              {item.img && <Image
                resizeMode='stretch'
                style={{ width: "100%", height: 250, marginTop: 10 }} source={{ uri: item.img }} />}
              <TouchableOpacity
                onPress={() => {
                  let like = item.statusLike == true ? item.countLike - 1 : item.countLike + 1;
                  let status = item.statusLike == true? false : true;;
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
                  width: 20, height: 20, tintColor: item.statusLike == true ? "#3333FF" : "gray",
                  marginBottom: 15
                }} source={icon.like} />
                {item.countLike != 0 && <Text style={{ marginStart: 6, marginBottom: 15 }}>{item.countLike}K</Text>}
              </TouchableOpacity>

            </View>
          </TouchableHighlight>
          }
        </>
      }
    />

  </View>

)

}