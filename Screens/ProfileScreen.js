import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";

import { authSingOutUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";

const ProfileScreen = ({ navigation }) => {
  const { nickName, avatar, email } = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);
  //  const [likes, setLikes] = useState({});
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllUsersPosts(userId);
  }, []);

  const getAllUsersPosts = async (userId) => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), postId: doc.id })));
    });
  };

  const logOut = () => {
    dispatch(authSingOutUser());
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.card}>
          <TouchableOpacity onPress={logOut}>
            <Image
              source={require("../assets/images/logout.png")}
              style={styles.logOut}
            ></Image>
          </TouchableOpacity>
          <View style={[styles.divAva]}>
            <Image source={{ uri: avatar }} style={styles.avatar}></Image>

            <TouchableOpacity style={styles.del}>
              <Image source={require("../assets/images/del.png")}></Image>
            </TouchableOpacity>
            <Text style={styles.textEmail}>{email}</Text>
            <Text style={styles.textTitle}>{nickName}</Text>
          </View>

          {userPosts.length > 0 ? (
            <FlatList
              data={userPosts}
              renderItem={({ item }) => (
                <View style={styles.postList}>
                  <View style={styles.post}>
                    <Image
                      source={{ uri: item.photo }}
                      style={styles.fotoPost}
                    ></Image>
                    <View>
                      <Text style={styles.postTitle}>{item.namePlace}</Text>
                      <View style={styles.postDescription}>
                        <View style={styles.postComment}>
                          <TouchableOpacity
                            style={styles.feedback}
                            onPress={() =>
                              navigation.navigate("Comments", item)
                            }
                          >
                            <Image
                              source={require("../assets/images/message.png")}
                            ></Image>
                          </TouchableOpacity>
                          <Text style={styles.reviews}>
                            {item.totalComments || 0}
                          </Text>
                          <TouchableOpacity
                            style={styles.feedback}
                            onPress={() => console.log("make like")}
                          >
                            <Image
                              source={require("../assets/images/thumbsUp.png")}
                            ></Image>
                          </TouchableOpacity>
                          <Text style={styles.likes}>{item.likes}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Map", item.gps)}
                        >
                          <Image
                            source={require("../assets/images/map-pin.png")}
                          ></Image>
                        </TouchableOpacity>
                        <Text style={styles.country}>{item.nameLocation}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.textNoPosts}>No Posts</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 16,
    maxHeight: 550,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  divAva: {
    alignItems: "center",
  },
  avatar: {
    borderRadius: 16,
    width: 120,
    height: 120,
    position: "absolute",
    transform: [{ translateY: -60 }],
  },
  del: {
    transform: [{ translateX: 60 }, { translateY: 16 }],
  },
  logOut: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 0,
    marginTop: 22,
  },
  textEmail: { marginTop: 22 },
  textTitle: {
    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
  },
  postList: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    maxHeight: 550,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  post: {
    marginBottom: 32,
  },
  fotoPost: {
    height: 240,

    borderRadius: 8,
  },
  postTitle: {
    color: "rgba(33, 33, 33, 1)",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    paddingTop: 8,
    paddingBottom: 8,
  },
  postDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
  },
  postComment: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
  },
  feedback: {
    marginRight: 8,
  },
  reviews: {
    marginRight: 24,
  },
  country: {
    marginLeft: 4,
    textDecorationLine: "underline",
    color: "rgba(33, 33, 33, 1)",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  textNoPosts: { textAlign: "center" },
  //  post: {
  //    marginBottom: 32,
  //  },
  //  fotoPost: {
  //    width: "100%",
  //    borderRadius: 8,
  //  },
  //  postTitle: {
  //    color: "rgba(33, 33, 33, 1)",
  //    fontSize: 16,
  //    fontFamily: "Roboto-Medium",
  //    paddingTop: 8,
  //    paddingBottom: 8,
  //  },
  //  postDescription: {
  //    flexDirection: "row",
  //    justifyContents: "space-between",
  //    textAlign: "center",
  //  },
  //  postComment: {
  //    flex: 1,
  //    flexDirection: "row",
  //    textAlign: "center",
  //  },
  //  feedback: {
  //    marginRight: 8,
  //  },
  //  reviews: {
  //    marginRight: 24,
  //  },
  //  country: {
  //    marginLeft: 4,
  //    textDecorationLine: "underline",
  //    color: "rgba(33, 33, 33, 1)",
  //    fontSize: 16,
  //    fontFamily: "Roboto-Regular",
  //  },
});

export default ProfileScreen;
