import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function CommentsScreen() {
  const [comment, setComment] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={"Адреса електронної пошти"}
          textContentType={"emailAddress"}
          autoComplete={"email"}
          textAlign={"left"}
          value={comment}
          onChangeText={(value) =>
            setComment((prevState) => ({ ...prevState, comment: value }))
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
  },
  form: {
    paddingHorizontal: 16,
    maxHeight: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    marginTop: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
  },
});

export default CommentsScreen;
