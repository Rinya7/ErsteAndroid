import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";

import {
  allPostByServer,
  loadPostByIdFromServer,
} from "../../firebase/utilites/loadPostByServer";
import { useSelector } from "react-redux";
import { uploadLikesToServer } from "../../firebase/utilites/uploadToServer";

const DefaultPostsScreen = ({ navigation }) => {
  const { nickName, avatar, email, userId } = useSelector(
    (state) => state.auth
  );

  const [posts, setPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [allWhoLiked, setAllWhoLiked] = useState([]);

  useEffect(() => {
    allPostByServer(setPosts);
  }, []);

  const sendLikes = async (postId) => {
    const { likes, whoLiked } = loadPostByIdFromServer(postId);
    setTotalLikes(likes);
    setAllWhoLiked(whoLiked);

    console.log("totalLikes", totalLikes);
    console.log("allWhoLiked", allWhoLiked);

    console.log("whoLiked.indexOf(userId)", allWhoLiked.indexOf(userId));

    if (allWhoLiked.indexOf(userId) === -1) {
      setTotalLikes(totalLikes + 1);
      const updatedAllWhoLiked = [...allWhoLiked, userId];
      setAllWhoLiked(updatedAllWhoLiked);

      console.log("totalLikes", totalLikes);
      console.log("allWhoLiked", allWhoLiked);

      await uploadLikesToServer(postId, totalLikes, allWhoLiked);
    } else {
      setTotalLikes(totalLikes - 1);
      const updatedAllWhoLiked = [...allWhoLiked];
      updatedAllWhoLiked.splice(allWhoLiked.indexOf(userId), 1);
      setAllWhoLiked(updatedAllWhoLiked);
      await uploadLikesToServer(postId, totalLikes, allWhoLiked);
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.user}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.fotoUser}></Image>
        ) : (
          <Image
            source={require("../../assets/images/avatarDefault.png")}
            style={styles.fotoUser}
          ></Image>
        )}

        <View style={styles.infoUser}>
          <Text style={styles.nameUser}>{nickName}</Text>
          <Text style={styles.emailUser}>{email}</Text>
        </View>
      </View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.card}>
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
                        onPress={() => navigation.navigate("Comments", item)}
                      >
                        <Image
                          source={require("../../assets/images/message.png")}
                        ></Image>
                      </TouchableOpacity>
                      <Text style={styles.reviews}>
                        {item.totalComments || 0}
                      </Text>
                      <TouchableOpacity
                        style={styles.feedback}
                        onPress={() => sendLikes(item.postId)}
                      >
                        {false ? (
                          <Image
                            source={require("../../assets/images/thumbsUpGreen.png")}
                          ></Image>
                        ) : (
                          <Image
                            source={require("../../assets/images/thumbsUp.png")}
                          ></Image>
                        )}
                      </TouchableOpacity>
                      <Text style={styles.likes}>{item.likes}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Map", item.gps)}
                    >
                      <Image
                        source={require("../../assets/images/map-pin.png")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 16,
  },
  user: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  fotoUser: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  infoUser: {
    justifyContent: "center",
  },
  nameUser: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  emailUser: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    maxHeight: 550,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  //  divAva: {
  //    alignItems: "center",
  //  },
  //  avatar: {
  //    borderRadius: 16,
  //    position: "absolute",
  //  },

  //  textTitle: {
  //    color: "rgba(33, 33, 33, 1)",
  //    textAlign: "center",
  //    fontSize: 30,
  //    marginTop: 92,
  //    marginBottom: 33,
  //    fontFamily: "Roboto-Medium",
  //  },
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
});

export default DefaultPostsScreen;
