import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import Home from "./Screens/Home";
import CreatePostsScreen from "./Screens/CreatePostsScreen";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default () => {
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
      {/*<View style={styles.container}>*/}
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Login"
          options={{ title: "Start screen", headerShown: false }}
          component={LoginScreen}
        />
        <MainStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />

        <MainStack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <MainStack.Screen
          name="CreatePosts"
          options={{ headerShown: false }}
          component={CreatePostsScreen}
        />
      </MainStack.Navigator>
      {/*<StatusBar style="auto" />*/}
      {/*</View>*/}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
