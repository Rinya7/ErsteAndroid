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
import { useNavigation } from "@react-navigation/native";

const baseLogState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [logState, setLogState] = useState(baseLogState);
  const signIn = () => {
    navigation.navigate("Home");
    setLogState(logState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
                value={logState.name}
                onChangeText={(value) =>
                  setLogState((prevState) => ({ ...prevState, name: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder={"Адреса електронної пошти"}
                textContentType={"emailAddress"}
                autoComplete={"email"}
                textAlign={"left"}
                value={logState.email}
                onChangeText={(value) =>
                  setLogState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                textContentType={"password"}
                autoComplete="password"
                textAlign={"left"}
                secureTextEntry={true}
                value={logState.password}
                onChangeText={(value) =>
                  setLogState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
            </View>
            <TouchableOpacity style={styles.buttonReg} onPress={signIn}>
              <Text>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonIn}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.textLogIn}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

export default RegistrationScreen;
