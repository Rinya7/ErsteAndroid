import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  StatusBar,
  FlatList,
  Text,
  SafeAreaView,
} from "react-native";

import { useSelector } from "react-redux";
import uploadCommentsToServer from "../../firebase/utilites/uploadCommentsToServer";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase/config";
import { getFormattedDate } from "../../helpers/dateUtils";

const CommentsScreen = ({ route, navigation }) => {
  const { avatar, nickName } = useSelector((state) => state.auth);
  console.log("route.params:", route.params);
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    allCommentsFromServer();
  }, []);

  const sendComment = async () => {
    const dateWriteComment = getFormattedDate();
    await uploadCommentsToServer(
      postId,
      comment,
      nickName,
      dateWriteComment,
      avatar
    );
    //navigation.navigate("DefaultScreen");
    setComment("");
  };

  const allCommentsFromServer = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollection = collection(postRef, "comments");
      await onSnapshot(commentsCollection, (data) =>
        setAllComment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    } catch (error) {
      console.error("Error download colection:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image source={{ uri: photo }} style={styles.fotoPost}></Image>
        <SafeAreaView style={styles.containerComments}>
          <FlatList
            data={allComment}
            renderItem={({ item }) => (
              <View style={styles.item}>
                {item.avatar ? (
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.fotoUser}
                  ></Image>
                ) : (
                  <Image
                    source={require("../../assets/images/avatarDefault.png")}
                    style={styles.fotoUser}
                  ></Image>
                )}
                <Text>{item.nickName}</Text>
                <Text style={styles.title}>{item.comment}</Text>
                <Text>{item.dateWriteComment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Коментувати..."}
            textContentType={"name"}
            autoComplete={"name"}
            textAlign={"left"}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.add} onPress={sendComment}>
            <Image source={require("../../assets/images/send.png")}></Image>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  fotoUser: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  fotoPost: {
    height: 240,
    borderRadius: 8,
  },
  containerComments: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    marginVertical: 24,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  title: {
    fontSize: 32,
  },
  form: {
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  add: {
    position: "absolute",
    right: 0,
    transform: [{ translateX: -24 }, { translateY: 8 }],
  },
});

export default CommentsScreen;
