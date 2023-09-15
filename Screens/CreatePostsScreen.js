import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreatePostsScreen = () => {
  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.post}>
        <View style={styles.foto}>
          <Image
            source={require("../assets/images/defaultPostFoto.jpg")}
            style={styles.defaultPostFoto}
          ></Image>
          <TouchableOpacity
            style={[
              styles.addFoto,
              {
                transform: [{ translateX: 150 }, { translateY: 100 }],
              },
            ]}
          >
            <Image source={require("../assets/images/addFoto.png")}></Image>
          </TouchableOpacity>
          <Text style={styles.download}>Завантажте фото</Text>
        </View>
        <View style={styles.inputDiv}>
          <TextInput
            style={styles.input}
            placeholder={"Назва..."}
            textContentType={"name"}
            autoComplete={"name"}
            textAlign={"left"}
          />

          <TextInput
            style={styles.input}
            placeholder={"Місцевість"}
            autoComplete={"country"}
            textAlign={"left"}
          />
        </View>
        <TouchableOpacity style={styles.buttonPublic}>
          <Text>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 16,
  },
  foto: {
    paddingBottom: 32,
  },

  defaultPostFoto: {
    width: "100%",
    borderRadius: 8,
    position: "relative",
  },
  addFoto: {
    position: "absolute",
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
});

export default CreatePostsScreen;
