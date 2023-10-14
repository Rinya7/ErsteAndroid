import { Image, TouchableOpacity } from "react-native";
import DefaultPostsScreen from "./nestedPostsScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedPostsScreens/CommentsScreen";
import MapScreen from "./nestedPostsScreens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { authSingOutUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ route }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSingOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        options={{
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
        }}
        component={DefaultPostsScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Comments"
        options={{
          title: "Comments",
        }}
        component={CommentsScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Map"
        options={{ title: "Map" }}
        component={MapScreen}
      ></NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
