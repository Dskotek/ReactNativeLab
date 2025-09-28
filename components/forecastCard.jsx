import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, Alert } from "react-native";
import { getForecast } from "../services/weatherapi";



const ForecastList = ({ forecast }) => {
    return (
        
        <FlatList
        data={forecast.forecastday}
        keyExtractor={({ item}) => item.date}
        renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.txt}>{item.date}</Text>
                    <Image
                        source={{ uri: `https:${item.day.condition.icon}` }}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.txt}>Max: {item.day.maxtemp_c}°C</Text>
                    <Text style={styles.txt}>Min: {item.day.mintemp_c}°C</Text>
                    <Text style={styles.txt}>{item.day.condition.text}</Text>
                </View>
        )}
            />
    )
}
        

const ForecastCard = ({ location }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const data = await getForecast(location, 3);
                setForecast(data);
            } catch (err) {
                console.error(err); 
            }
            finally {
                setLoading(false); 
            }
        };
        fetchForecast();
    }, 
    [location]);

    if (loading) return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;

    if (!forecast) return null;

    return (
        //Alert.alert(JSON.stringify(forecast)),
        <View style={styles.card}>
            <ForecastList forecast={forecast} />
        </View>
         
        
    );
    
}
export default ForecastCard;

const styles = StyleSheet.create({});