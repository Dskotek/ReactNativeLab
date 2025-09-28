import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getWeather } from "../services/weatherapi";

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
    <View style={styles.card}>
        <Image
        source={{ uri: "https:" + weather.current.condition.icon }}
        style={{ width: 64, height: 64 }}
        />
        <Text style={styles.city}>{weather.location.name}</Text>
        <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
        <Text style={styles.condition}>{weather.current.text}</Text>
      
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  city: { fontSize: 20, fontWeight: "600" },
  temp: { fontSize: 36, fontWeight: "bold", marginVertical: 10 },
  condition: { fontSize: 16, color: "gray" },
});