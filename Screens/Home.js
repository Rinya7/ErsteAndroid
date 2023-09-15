import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
const MainStack = createStackNavigator(); // вказує на групу навігаторів
import { useNavigation } from "@react-navigation/native";

function Posts() {
  return (
    <View style={{ flex: 1 }}>
      <PostsScreen> </PostsScreen>
    </View>
  );
}

function CreatePost() {
  return (
    //  navigation.navigate("CreatePostsScreen");
    <View style={{ flex: 1 }}>
      <CreatePostsScreen> </CreatePostsScreen>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen> </ProfileScreen>
    </View>
  );
}

const LogOut = ({ navigation }) => {
  navigation.navigate("LoginScreen");
  console.log("Hello");
};

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => LogOut({ navigation })}>
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
        component={Posts}
      />
      <Tab.Screen
        name="CreatePost"
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
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
