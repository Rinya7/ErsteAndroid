import * as React from "react";
import { View, Image } from "react-native";

import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./ProfileScreen";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";

function Posts({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <PostsScreen> </PostsScreen>
    </View>
  );
}

function CreatePost({ navigation }) {
  navigation.navigate("CreatePosts");
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen> </ProfileScreen>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
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
        component={Posts}
      />
      <Tab.Screen
        name="CreatePost"
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          //  headerShown: false,
          tabBarShowLabel: false,
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
        component={CreatePost}
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
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Home;
