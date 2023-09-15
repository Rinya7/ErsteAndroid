import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const LogOut = ({ navigation }) => {
  navigation.navigate("LoginScreen");
  console.log("Hello");
};

const ProfileScreen = () => {
  const navigation = useNavigation();
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
          <TouchableOpacity onPress={() => LogOut({ navigation })}>
            <Image
              source={require("../assets/images/logout.png")}
              style={styles.logOut}
            ></Image>
          </TouchableOpacity>
          <View style={[styles.divAva]}>
            <Image
              source={require("../assets/images/default.jpg")}
              style={[
                styles.avatar,
                {
                  transform: [{ translateY: -60 }],
                },
              ]}
            ></Image>

            <TouchableOpacity
              style={[
                styles.del,
                {
                  transform: [{ translateX: 70 }, { translateY: 16 }],
                },
              ]}
            >
              <Image source={require("../assets/images/del.png")}></Image>
            </TouchableOpacity>
            <Text style={styles.textTitle}>Profile</Text>
          </View>

          <View style={styles.post}>
            <Image
              source={require("../assets/images/fotoPost.jpg")}
              style={styles.fotoPost}
            ></Image>
            <View>
              <Text style={styles.postTitle}>postTitle</Text>
              <View style={styles.postDescription}>
                <View style={styles.postComment}>
                  <TouchableOpacity style={styles.feedback}>
                    <Image
                      source={require("../assets/images/message.png")}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.reviews}>8</Text>
                  <TouchableOpacity style={styles.feedback}>
                    <Image
                      source={require("../assets/images/thumbs-up.png")}
                    ></Image>
                  </TouchableOpacity>
                  <Text style={styles.likes}>154</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/images/map-pin.png")}
                  ></Image>
                </TouchableOpacity>
                <Text style={styles.country}>Ukraina</Text>
              </View>
            </View>
          </View>
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
    width: 140,
    height: 120,
    position: "absolute",
  },
  del: {
    //position: "absolute",
    //right: 0,
    //marginTop: 22,
  },
  logOut: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 0,
    marginTop: 22,
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
    justifyContents: "space-between",
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

export default ProfileScreen;
