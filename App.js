import "react-native-gesture-handler";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import Home from "./Screens/Home";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import { useState } from "react";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {/*{isLoggedIn ? (*/}
        <MainStack.Group>
          <MainStack.Screen
            initialRouteName="Home"
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          {/*<MainStack.Screen
              name="CreatePostsScreen"
              component={CreatePostsScreen}
            />*/}
        </MainStack.Group>
        {/*) : (*/}
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
        {/*)}*/}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
