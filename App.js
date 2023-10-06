import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Main from "./components/Main";

export default () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
};

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: "#fff",
//  },
//});
