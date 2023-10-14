import {
  Camera,
  //CameraType
} from "expo-camera";
import * as Location from "expo-location";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
//import { useIsFocused } from "@react-navigation/native";

import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import { Dimensions } from "react-native";
import { useEffect, useState } from "react";

import uploadPhotoToServer from "../firebase/utilites/uploadPhotoOnServer";

//Шаблон публикации
const basePost = {
  namePlace: "",
  nameLocation: "",
  gps: { latitude: "", longitude: "" },
  photo: "",
};

const CreatePostsScreen = ({ navigation }) => {
  //  const isFocused = useIsFocused();

  const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [postTitles, setPostTitles] = useState(basePost);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      setPostTitles((prevState) => ({
        ...prevState,
        gps: {
          latitude: `${location.coords.latitude}`,
          longitude: `${location.coords.longitude}`,
        },
      }));
    })();

    setDisableBtn(
      postTitles.namePlace.length == 0 ||
        postTitles.nameLocation.length == 0 ||
        postTitles.photo.length == 0
    );
  }, [postTitles]);

  const logBack = ({ navigation }) => {
    navigation.goBack();
  };

  if (!permissionCam) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCam.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermissionCam} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();

    setPostTitles((prevState) => ({
      ...prevState,
      photo: uri,
    }));
  };

  const publickPost = async () => {
    const fileId = nanoid();
    const uploadFotoFromServer = await uploadPhotoToServer(
      postTitles.photo,
      fileId
    );
    console.log("uploadFotoFromServer:", uploadFotoFromServer);
    navigation.navigate("DefaultScreen", postTitles);
    setPostTitles(basePost);
    setDisableBtn(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.post}>
          <View style={styles.pictures}>
            {/*{isFocused && (*/}
            <Camera
              style={styles.camera}
              //type={type}
              ref={setCamera}
            >
              {postTitles.photo.length > 0 && (
                <View style={styles.takedFotoContainer}>
                  <Image
                    source={{ uri: postTitles.photo }}
                    style={styles.makedFoto}
                  ></Image>
                </View>
              )}
              <TouchableOpacity style={styles.addFoto} onPress={takePhoto}>
                <Image source={require("../assets/images/addFoto.png")}></Image>
              </TouchableOpacity>
            </Camera>
            {/*)}*/}

            <Text style={styles.download}>Завантажте фото</Text>
          </View>
          <View style={styles.inputDiv}>
            <TextInput
              style={styles.input}
              placeholder={"Назва..."}
              textContentType={"name"}
              autoComplete={"name"}
              textAlign={"left"}
              value={postTitles.namePlace}
              onChangeText={(value) =>
                setPostTitles((prevState) => ({
                  ...prevState,
                  namePlace: value,
                }))
              }
            />

            <TextInput
              style={styles.input}
              placeholder={"Місцевість"}
              autoComplete={"country"}
              textAlign={"left"}
              value={postTitles.nameLocation}
              onChangeText={(value) =>
                setPostTitles((prevState) => ({
                  ...prevState,
                  nameLocation: value,
                }))
              }
            />
          </View>
          <TouchableOpacity
            disabled={disableBtn}
            style={[
              styles.buttonPublic,
              { backgroundColor: disableBtn ? "#F6F6F6" : "#FF6C00" },
            ]}
            onPress={publickPost}
          >
            <Text>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deletePost}
            onPress={() => logBack({ navigation })}
          >
            <Image source={require("../assets/images/trash.png")}></Image>
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
    paddingHorizontal: 16,
  },
  pictures: {
    paddingBottom: 32,
  },

  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  takedFotoContainer: {
    position: "absolute",
  },
  makedFoto: {
    height: 240,
    width: Dimensions.get("window").width * 0.91,
    borderRadius: 8,
  },
  addFoto: {
    opacity: 0.7,
  },
  download: {
    color: "rgba(189, 189, 189, 1))",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    paddingTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 232, 232, 1)",

    paddingVertical: 16,
    marginBottom: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  buttonPublic: {
    backgroundColor: "#F6F6F6",
    maxHeight: 50,
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 32,
  },
  deletePost: {
    width: 70,
    height: 40,
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "flex-end",
  },
});

export default CreatePostsScreen;
