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
} from "react-native";

import { useSelector } from "react-redux";
import uploadCommentsToServer from "../../firebase/utilites/uploadCommentsToServer";

const CommentsScreen = ({ route, navigation }) => {
  const { nickName } = useSelector((state) => state.auth);
  const postId = route.params;
  const [comment, setComment] = useState("");

  const sendComment = async () => {
    await uploadCommentsToServer(postId, comment, nickName);

    navigation.navigate("DefaultScreen");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
    paddingBottom: 16,
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
