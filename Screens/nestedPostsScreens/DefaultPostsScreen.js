import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const DefaultPostsScreen = ({ route, navigation }) => {
  console.log("route.params.posts:", route.params);
  const gps = route.params ? route.params.gps || null : null;

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.user}>
        <Image
          source={require("../../assets/images/default.jpg")}
          style={styles.fotoUser}
        ></Image>
        <View style={styles.infoUser}>
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <Text style={styles.emailUser}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.post}>
          <Image
            source={require("../../assets/images/fotoPost.jpg")}
            style={styles.fotoPost}
          ></Image>
          <View>
            <Text style={styles.postTitle}>postTitle</Text>
            <View style={styles.postDescription}>
              <View style={styles.postComment}>
                <TouchableOpacity
                  style={styles.feedback}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Image
                    source={require("../../assets/images/message.png")}
                  ></Image>
                </TouchableOpacity>
                <Text style={styles.reviews}>8</Text>
                <TouchableOpacity
                  style={styles.feedback}
                  onPress={() => navigation.navigate("ProfileScreen")}
                >
                  <Image
                    source={require("../../assets/images/thumbs-up.png")}
                  ></Image>
                </TouchableOpacity>
                <Text style={styles.likes}>154</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", {
                    gps,
                  })
                }
              >
                <Image
                  source={require("../../assets/images/map-pin.png")}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.country}>Ukraina</Text>
            </View>
          </View>
        </View>
      </View>
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
  divAva: {
    alignItems: "center",
  },
  avatar: {
    borderRadius: 16,
    position: "absolute",
  },

  textTitle: {
    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 30,
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
  },
  post: {
    marginBottom: 32,
  },
  fotoPost: {
    width: "100%",
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
});

export default DefaultPostsScreen;
