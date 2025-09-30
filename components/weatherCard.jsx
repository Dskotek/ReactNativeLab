import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getWeather } from "../services/weatherapi";


const tempColor = (temp) => {
  if(temp <= 15) return "lightblue";
  return "#FFC000";

};

const kphToMs = (kph) => (kph / 3.6).toFixed(1);

const WeatherCard = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(location);
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;

  if (!weather) return null;

  return (
    <View style={[styles.card, {backgroundColor: tempColor(weather.current.temp_c) }]}>
        <Text>{weather.current.day} Aktuellt väder i</Text>
        <Text style={styles.city}>{weather.location.name}</Text>
        
        <Image
        source={{ uri: "https:" + weather.current.condition.icon }}
        style={styles.icon}
        />
        <Text style={styles.condition}>{weather.current.condition.text}</Text>
        <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
        <Text style={styles.txt}>Känns som: {weather.current.feelslike_c}°C</Text>
        <Text style={styles.txt}>Luftfuktighet: {weather.current.humidity}%</Text>
        <Text style={styles.txt}>Vind: {kphToMs (weather.current.wind_kph)} m/s</Text>
        <Text style={styles.txt}>Visibilitet: {weather.current.vis_km}km</Text>
        <Text style={styles.txtUpdated}>Senast uppdaterad: {'\n'}{weather.current.last_updated}</Text>
        
      
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  txtUpdated: {
    fontSize: 12,
    color: "black",
    marginTop: 25,
    opacity: 0.5,
    textAlign: "center"
  },
  card: {
    padding: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000", // svart skugga
    shadowOffset: { width: 5, height: 10 }, // skuggans position
    shadowOpacity: 0.1, // transparens
    shadowRadius: 5, // spridning
    width: "80%",
    height: "45%"
  },
  city: { 
    fontSize: 20, 
    fontWeight: "600" 
  },
  temp: { 
    fontSize: 36, 
    fontWeight: "bold", 
    marginVertical: 10 
  },
  condition: { 
    fontSize: 16, 
    color: "gray" 
  },
  icon: {
        width: 64,
        height: 64,
    },
    txt: {
        fontSize: 16,
        fontStyle: "italic"
    }
});