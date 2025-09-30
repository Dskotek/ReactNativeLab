import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet} from "react-native";
import { getForecast } from "../services/weatherapi";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const tempColor = (temp) => {
  if(temp <= 15) return "lightblue";
  return "#FFC000";

};

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
   return(
    <SafeAreaProvider>
        <SafeAreaView style= {{flex: 1}}>
    <View style={styles.container}>
        <Text style={styles.header}>3 dagars prognos för {forecast.location.name} </Text>

        {forecast.forecast.forecastday.map((day) => (
            <View style={[styles.itemContainer, {backgroundColor: tempColor(day.day.avgtemp_c)}]}
             key={day.date}>
                <Image
                        source={{ uri: "https:" + day.day.condition.icon }}
                        style={styles.icon}
                        />
                <View style={styles.txtContainer}>
                    <Text style={styles.txt}>Datum: {day.date}</Text>
                    <Text style={styles.txt}>{day.day.condition.text}</Text>
                    <Text style={styles.txt}>Medeltemperatur: {day.day.avgtemp_c} °C</Text>
                </View>
                
                </View>
        ))}
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
   )
   
}
export default ForecastCard;

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold"
    },
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"

    },
    itemContainer: {
        backgroundColor: "lightblue",
        padding: 10,
        margin: 5,
        width: 300,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 10 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
        alignItems: "center"

    },
    txtContainer: {
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 10
    },
    txt: {
        fontSize: 16,
        fontStyle: "italic"
    },
    icon: {
        width: 64,
        height: 64,
    }
});