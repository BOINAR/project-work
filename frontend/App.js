import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import Dashboard from "./components/Dashboard";
import Skills from "./components/Skills/Skills";
import Deconnect from "./components/Deconnect";
import ListOffers from "./components/ListOffers";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userInfo from "./reducers/userInfo.js";
import professions from "./reducers/professions";
import likes from "./reducers/likes";
import blackList from "./reducers/blackList";
import jobOffers from "./reducers/jobOffers";
import applications from "./reducers/applications";
import upcomingMissions from "./reducers/upcomingMissions";

import Welcome1 from "./components/Welcome1";
import Welcome2 from "./components/Welcome2";
import LogIn from "./components/LogIn";
import Inscription from "./components/Inscription";
import CvPopOver from "./components/CvPopOver";
import ScreenOffer from "./components/ScreenOffer";
import ContractsDetails from "./components/ContractsDetails";

import AsyncStorage from "@react-native-async-storage/async-storage";

const store = createStore(
  combineReducers({
    userInfo,
    professions,
    jobOffers,
    likes,
    blackList,
    upcomingMissions,
    applications
  })
);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === "Dashboard") {
            // iconName = focused
            //   ? "home-sharp"
            //   : "ios-information-circle-outline";
            return <Ionicons name={"home-sharp"} size={25} color={color} />;
            // iconName = 'home-sharp';
          } else if (route.name === "ListOffers") {
            return (
              <MaterialCommunityIcons
                name="text-box-search-outline"
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Deconnect") {
            return (
              <AntDesign name="logout" size={25} color={color} />
            );
          } else if (route.name === "Skills") {
            return (
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#00F0FF",
        inactiveTintColor: "#B9FFFF",
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: "#001150",
          height: 67,
          paddingBottom: 8,
          borderWidth: 3,
          borderColor: "#00F0FF",
          borderRadius: 40,
          borderTopWidth: 3,
          borderTopColor: "#00F0FF",
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          position: "absolute",
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="ListOffers" component={ListOffers} />
      <Tab.Screen name="Skills" component={Skills} />
      <Tab.Screen name="Deconnect" component={Deconnect} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome1" component={Welcome1} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Welcome2" component={Welcome2} />
          <Stack.Screen name="CvPopover" component={CvPopOver} />
          <Stack.Screen name="Register" component={Inscription} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="ScreenOffer" component={ScreenOffer} />
          <Stack.Screen name="ContractsDetails" component={ContractsDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
