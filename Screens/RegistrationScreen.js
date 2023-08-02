import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const RegistrationScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View>
        <Image></Image>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View>
        <Text style={styles.text}>Реєстрація</Text>
        <TextInput style={styles.input} placeholder={"Логін"} />
        <TextInput
          style={styles.input}
          placeholder={"Адреса електронної пошти"}
        />
        <TextInput style={styles.input} placeholder={"Пароль"} />
        <TouchableOpacity></TouchableOpacity>
        <Text>Вже є акаунт? Увійти</Text>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgba(33, 33, 33, 1)",
    flex: 1,
    fontSize: 30,
    marginTop: 220,
  },
  input: {
    flex: 3,
    borderWidth: 1,
    backgroundColor: "rgba(232, 232, 232, 1)",
    height: 50,
  },
});

export default RegistrationScreen;
