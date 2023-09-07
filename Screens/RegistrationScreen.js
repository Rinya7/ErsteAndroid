import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    console.log({ name, email, password });
  };
  return (
    <KeyboardAvoidingView
      //  behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../assets/images/bg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.form}>
            <View style={[styles.divAva]}>
              <Image
                source={require("../assets/images/default.jpg")}
                style={[
                  styles.avatar,
                  {
                    transform: [{ translateY: -50 }],
                  },
                ]}
              ></Image>
              <TouchableOpacity
                style={[
                  styles.add,
                  {
                    transform: [{ translateX: 60 }, { translateY: 30 }],
                  },
                ]}
              >
                <Image source={require("../assets/images/add.png")}></Image>
              </TouchableOpacity>
            </View>

            <Text style={styles.textTitle}>Реєстрація</Text>
            <View style={styles.inputDiv}>
              <TextInput
                style={styles.input}
                placeholder={"Логін"}
                textContentType={"name"}
                autoComplete={"name"}
                textAlign={"left"}
                value={name}
                onChangeText={setName}
              />
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
                autoComplete="password"
                textAlign={"left"}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.buttonReg} onPress={signIn}>
              <Text>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonIn}>
              <Text style={styles.textLogIn}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
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
  add: {
    position: "absolute",
  },
  textTitle: {
    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 30,
    marginTop: 92,
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
  buttonReg: {
    backgroundColor: "#FF6C00",
    maxHeight: 50,
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 43,
  },
  buttonIn: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 45,
  },
  textLogIn: {
    color: "rgba(27, 67, 113, 1)",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
