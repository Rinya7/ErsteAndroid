import { NavigationContainer } from "@react-navigation/native";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import Home from "../screens/Home";
import { useEffect, useState } from "react";
//import auth from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {
  authSingOutUser,
  authStateChangeUser,
} from "../redux/auth/authOperations";
import CommentsScreen from "../screens/nestedPostsScreens/CommentsScreen";
import MapScreen from "../screens/nestedPostsScreens/MapScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {stateChange ? (
          <MainStack.Group>
            <MainStack.Screen
              initialRouteName="Home"
              name="Home"
              options={{ headerShown: false }}
              component={Home}
            />
            <MainStack.Screen
              name="Comments"
              options={{
                title: "Comments",
                tabBarStyle: { display: "none" },
              }}
              component={CommentsScreen}
            />

            <MainStack.Screen name="Map" component={MapScreen} />
          </MainStack.Group>
        ) : (
          <MainStack.Group>
            <MainStack.Screen
              name="LoginScreen"
              options={{ title: "Start screen", headerShown: false }}
              component={LoginScreen}
            />
            <MainStack.Screen
              name="RegistrationScreen"
              options={{ headerShown: false }}
              component={RegistrationScreen}
            ></MainStack.Screen>
          </MainStack.Group>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
