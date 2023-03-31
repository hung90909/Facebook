import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screne/Register';
import Login from './Screne/Login';
import Home from './Screne/Home';
import Add from './Screne/Add';
import Profile from './Screne/profile';
import EditProfile from './Screne/EditProfile';
import Search from './Screne/search';
import Edit from './Screne/Edit';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Register" component={Register} options={{}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Add" component={Add} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title:"Chỉnh sửa trang cá nhân"}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
        <Stack.Screen name="Edit" component={Edit} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = () =>{
  
}
