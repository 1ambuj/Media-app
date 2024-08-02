import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomesScreen/index.jsx';
import CameraScreen from './components/CameraScreen/index.jsx';
import LoginScreen from './components/LoginScreen/index.jsx';
import useAuthListener from './hooks/useAuthListener.js';
import UserContextProvider from './context/User.jsx';
import MediaScreen from './components/MediaScreen/index.jsx';
import Button from './components/general/Button.jsx';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import CameraNavigation from './components/HomesScreen/CameraNavigation.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ 
            headerRight: (props) => <CameraNavigation />
          }} />
          <Stack.Screen name="Camera" component={CameraScreen}  />
          <Stack.Screen name="Media" component={MediaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}