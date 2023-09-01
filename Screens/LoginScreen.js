import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../assets/images/bg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.form}>
            <Text style={styles.textTitle}>Увійти</Text>
            <View style={styles.inputDiv}>
              <TextInput
                style={styles.input}
                placeholder={"Адреса електронної пошти"}
                textContentType={"emailAddress"}
                autoComplete={"email"}
                textAlign={"left"}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                textContentType={"password"}
                textAlign={"left"}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.divReg}>
              <Text style={styles.textReg}>Немає акаунту?</Text>
              <TouchableOpacity>
                <Text style={styles.linkReg}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
  form: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 16,
    maxHeight: 490,
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
  add: {
    position: "absolute",
  },
  textTitle: {
    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
  },

  inputDiv: {},
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    marginTop: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
  },
  buttonLogin: {
    backgroundColor: "#FF6C00",
    maxHeight: 50,
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 43,
  },

  divReg: {
    marginTop: 16,
    marginBottom: 64,
    flexDirection: "row",
    justifyContent: "center",
  },
  textReg: {
    color: "rgba(27, 67, 113, 1)",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginRight: 5,
  },
  linkReg: {
    color: "rgba(27, 67, 113, 1)",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
