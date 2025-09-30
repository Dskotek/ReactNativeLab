import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getForecast } from "../services/weatherapi";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const tempColor = (temp) => {
  if (temp <= 15) return "lightblue";
  return "#FFC000";
};

const ForecastCard = ({ location }) => {
  const weekday = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", { weekday: "long" });
  };

  const [expandedDays, setExpandedDays] = useState([]);

  const toggleExpand = (date) => {
    setExpandedDays((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const kphToMs = (kph) => (kph / 3.6).toFixed(1);

  const months = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const formatDate = (dateString) => {
    const day = parseInt(dateString.slice(8, 10), 10);
    const month = parseInt(dateString.slice(5, 7), 10);
    return `${day} ${months[month - 1]}`;
  };

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecast(location, 4);
        setForecast(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [location]);

  if (loading)
    return (
      <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
    );

  if (!forecast) return null;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Väderprognos för {forecast.location.name}{" "}
          </Text>

          {forecast.forecast.forecastday.slice(1).map((day) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: tempColor(day.day.avgtemp_c) },
              ]}
              key={day.date}
            >
              <Text style={styles.txtDay}>
                {weekday(day.date).charAt(0).toUpperCase() +
                  weekday(day.date).slice(1)}
              </Text>
              <Text style={styles.txtDate}>{formatDate(day.date)}</Text>
              <Text style={styles.txtTemp}>{day.day.avgtemp_c} °C</Text>
              <Image
                source={{ uri: "https:" + day.day.condition.icon }}
                style={styles.icon}
              />

              <Text style={styles.txt}>{day.day.condition.text}</Text>
              <View style={styles.showMoreBtnContainer}>
                <TouchableOpacity
                  style={styles.showMoreBtn}
                  onPress={() => toggleExpand(day.date)}
                >
                  <Text style={styles.showMoreTxt}>
                    {expandedDays.includes(day.date)
                      ? "Visa mindre ↑"
                      : "Visa mer ↓"}
                  </Text>
                </TouchableOpacity>
              </View>

              {expandedDays.includes(day.date) && (
                <View style={styles.showMoreContainer}>
                  <Text style={styles.txt}>🌡ꜛHögsta temperatur: {day.day.maxtemp_c}°C   
                  </Text>
                  <Text style={styles.txt}>🌡ꜜLägsta temperatur: {day.day.mintemp_c}°C   
                  </Text>
                  <Text style={styles.txt}>💧Nederbörd: {day.day.totalprecip_mm} mm 
                  </Text>
                  <Text style={styles.txt}>🌬️Vind: {kphToMs(day.day.maxwind_kph)} m/s 
                  </Text>
                  <Text style={styles.txt}>☀️UV-index: {day.day.uv}  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default ForecastCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 5,
    width: 300,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  txtContainer: {
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  txt: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center"
  },
  txtDay: {
    marginTop: 3,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  txtDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  txtTemp: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 64,
    height: 64,
  },
  showMoreBtnContainer: {
    marginTop: "15",
    alignItems: "flex-end",
    marginLeft: 185,
  },
  showMoreBtn: {
    backgroundColor: "lightgray",
    opacity: 0.7,
  },

  showMoreTxt: {
    color: "blue",
  },
  showMoreContainer: {},
});
