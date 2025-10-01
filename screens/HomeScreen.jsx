import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useLocation from "../hooks/uselocation";
import WeatherCard from "../components/weatherCard";
import ForecastCard from "../components/forecastCard";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  const { getLocation, errorMsg } = useLocation();
  const [coords, setCoords] = useState(null);
  const [viewMode, setViewMode] = useState("weather");

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

  const locationString = coords
    ? `${coords.latitude},${coords.longitude}`
    : null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {/*<Text style={styles.header}>EasyWeather</Text>*/}
            <Image
              source={require("../assets/vecteezy_drought-png-graphic-clipart-design_23258264.png")}
              style={{
                width: 208,
                height: 203,
                marginBottom: "4%",
                marginTop: "3%",
              }}
            ></Image>
            {locationString == null ? (
              <TouchableOpacity style={styles.btn} onPress={handleGetWeather}>
                <Text style={styles.btnText}>Hämta väder</Text>
              </TouchableOpacity>
            ) : viewMode == "weather" ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setViewMode("forecast")}
              >
                <Text style={styles.btnText}>Visa väderprognos</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setViewMode("weather")}
              >
                <Text style={styles.btnText}>Visa dagens väder</Text>
              </TouchableOpacity>
            )}
            {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

            {locationString && viewMode === "weather" && (
              <WeatherCard location={locationString} />
            )}
            {locationString && viewMode === "forecast" && (
              <ForecastCard location={locationString} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "lightyellow",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 50,
    marginHorizontal: 20,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },

  btn: {
    backgroundColor: "darkblue",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 50,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  coords: {
    marginTop: 10,
    fontSize: 16,
  },
});
