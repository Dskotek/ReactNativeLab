import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useLocation from "../hooks/uselocation";
import WeatherCard from "../components/weatherCard";
import ForecastCard from "../components/forecastCard";

const HomeScreen = () => {
  const { getLocation, errorMsg } = useLocation();
  const [coords, setCoords] = useState(null);

  const handleGetWeather = async () => {
    const locationCoords = await getLocation();
    if (locationCoords) {
      setCoords(locationCoords);
    }
  };
  const handleGetForecast = async () => {
    const locationCoords = await getLocation();
    if (locationCoords) {
      setCoords(locationCoords);
    }
};

  const locationString = coords ? `${coords.latitude},${coords.longitude}` : null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EasyWeather</Text>
      <TouchableOpacity style={styles.btn} onPress={handleGetWeather}>
        <Text style={styles.btnText}>Hämta väder</Text>
      </TouchableOpacity>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {/*{locationString && <ForecastCard location={locationString} />}*/}
      {locationString && <WeatherCard location={locationString} 
      />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20 
},
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, 
    paddingTop: 50, 
    marginHorizontal: 20 
},
  description: { 
    textAlign: "center", 
    marginBottom: 20, 
    marginHorizontal: 20 },

  btn: { 
    backgroundColor: "blue", 
    padding: 10, 
    borderRadius: 50, 
    marginHorizontal: 50 
},
  btnText: { 
    color: "white", 
    fontWeight: "bold" 
},
  error: { 
    color: "red", 
    marginTop: 10 
},
  coords: { 
    marginTop: 10, 
    fontSize: 16 
},
});