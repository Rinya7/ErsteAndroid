import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  console.log("route.params.map:", route.params);
  const { gps } = route.params;
  const latitudeX = gps ? gps.latitude || null : null;
  const longitudeY = gps ? gps.longitude || null : null;
  console.log("latitudeX", latitudeX);
  console.log("longitudeY", longitudeY);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 46.5833932,
          longitude: 11.9051815,
          latitudeDelta: 0.009,
          longitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{ latitude: 46.5833932, longitude: 11.9051815 }}
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
