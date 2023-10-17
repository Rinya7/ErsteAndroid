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
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { authSingUpUser } from "../redux/auth/authOperations";
import { pickImage, takePhoto } from "../utilites/pickImage";
import { nanoid } from "nanoid";
import uploadAvatarToServer from "../firebase/utilites/uploadAvatarToServer";

const baseState = {
  nickName: "",
  email: "",
  password: "",
  avatar: "../assets/images/avatarDefault.png",
};

const RegistrationScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [state, setState] = useState(baseState);

  const addAvatar = async () => {
    const aserAvatar = await takePhoto();
    setState((prevState) => ({ ...prevState, avatar: aserAvatar }));
  };

  const signIn = async () => {
    try {
      const fileAvatarId = nanoid();
      const uploadAvatarFromServer = await uploadAvatarToServer(
        state.avatar,
        fileAvatarId
      );

      setState((prevState) => ({
        ...prevState,
        avatar: uploadAvatarFromServer,
      }));
      dispatch(authSingUpUser(state));
      setState(baseState);
    } catch (error) {
      console.log(error.message);
    }
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
              {state.avatar.length > 0 ? (
                <Image
                  source={{ uri: state.avatar }}
                  style={styles.avatar}
                ></Image>
              ) : (
                <Image
                  source={require("../assets/images/default.jpg")}
                  style={styles.avatar}
                ></Image>
              )}

              <TouchableOpacity style={styles.add} onPress={addAvatar}>
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
                value={state.nickName}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickName: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder={"Адреса електронної пошти"}
                textContentType={"emailAddress"}
                autoComplete={"email"}
                textAlign={"left"}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder={"Пароль"}
                textContentType={"password"}
                autoComplete="password"
                textAlign={"left"}
                secureTextEntry={true}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
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
    transform: [{ translateY: -50 }],
  },
  add: {
    position: "absolute",
    transform: [{ translateX: 60 }, { translateY: 30 }],
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
