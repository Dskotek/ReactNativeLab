import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getWeather } from "../services/weatherapi";


const tempColor = (temp) => {
  if(temp <= 15) return "lightblue";
  return "#FFC000";

};

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
        <Text>Dagens väder</Text>
        <Image
        source={{ uri: "https:" + weather.current.condition.icon }}
        style={{ width: 64, height: 64 }}
        />
        <Text style={styles.city}>{weather.location.name}</Text>
        <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
        <Text style={styles.condition}>{weather.current.condition.text}</Text>
      
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 150,
    shadowColor: "#000", // svart skugga
    shadowOffset: { width: 5, height: 10 }, // skuggans position
    shadowOpacity: 0.1, // transparens
    shadowRadius: 5, // spridning
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
});