import {
  Camera,
  //CameraType
} from "expo-camera";
import * as Location from "expo-location";
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
} from "react-native";

import { Dimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

//Шаблон публикации
const basePost = {
  namePlace: "",
  nameLocation: "",
  gps: "",
};
//const navigation = useNavigation();
const CreatePostsScreen = () => {
  const navigation = useNavigation();
  //  const isFocused = useIsFocused();

  const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [postTitles, setPostTitles] = useState(basePost);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (
      postTitles.namePlace.length !== 0 &&
      postTitles.nameLocation.length !== 0 &&
      postTitles.gps.length !== 0
    ) {
      setDisableBtn(false);
    }
  }, [postTitles]);

  const LogBack = ({ navigation }) => {
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
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    //Location by foto
    const location = await Location.getCurrentPositionAsync();
    console.log("latitude:", location.coords.latitude);
    console.log("longitude:", location.coords.longitude);
    setPostTitles((prevState) => ({
      ...prevState,
      gps: `${location.coords.latitude} ${location.coords.longitude}`,
    }));
  };

  const publickPost = ({ navigation }) => {
    console.log("postTitles:", postTitles);
    //console.log("navigation:", navigation.navigate);
    //navigation.navigate("Home");
    setPostTitles(basePost);
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
              {photo && (
                <View style={styles.takedFotoContainer}>
                  <Image
                    source={{ uri: photo }}
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
            onPress={() => publickPost(navigation)}
          >
            <Text>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deletePost}
            onPress={() => LogBack({ navigation })}
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
