import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  console.log("route.params:", route.params);
  const { longitude, latitude } = route.params;
  const latitudeX = parseFloat(route.params ? latitude || null : null);
  const longitudeY = parseFloat(route.params ? longitude || null : null);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitudeX,
          longitude: longitudeY,
          latitudeDelta: 0.009,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{ latitude: latitudeX, longitude: longitudeY }}
          title="post photo"
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
