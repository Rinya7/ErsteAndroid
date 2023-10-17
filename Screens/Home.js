import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { useNavigation } from "@react-navigation/native";
import DefaultPostsScreen from "./nestedPostsScreens/DefaultPostsScreen";
import { authSingOutUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const Home = () => {
  //  const { userId, nickName, avatar } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logBack = ({ navigation }) => {
    navigation.goBack();
  };

  const logOut = () => {
    dispatch(authSingOutUser());
  };
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "undefined" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="DefaultScreen"
        options={{
          headerShown: true,
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={logOut}>
              <Image
                source={require("../assets/images/logout.png")}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 16,
                }}
              ></Image>
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/images/grid.png")}
              style={{
                width: 40,
                height: 40,
                borderWidth: focused ? 1 : 0,
                borderColor: focused ? "#E0E0E0" : "#FFF",
              }}
            ></Image>
          ),
        }}
        //component={PostsScreen}
        component={DefaultPostsScreen}
      />

      <Tab.Screen
        name="CreatePost"
        options={{
          headerShown: true,
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => logBack({ navigation })}>
              <Image
                source={require("../assets/images/arrowLeft.png")}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 16,
                }}
              ></Image>
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/images/new.png")}
              style={{
                width: 70,
                height: 40,
                borderWidth: focused ? 1 : 0,
                borderColor: focused ? "#E0E0E0" : "#FFF",
              }}
            ></Image>
          ),
        }}
        component={CreatePostsScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/images/user.png")}
              style={{
                width: 40,
                height: 40,
                borderWidth: focused ? 1 : 0,
                borderColor: focused ? "#E0E0E0" : "#FFF",
              }}
            ></Image>
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Home;
