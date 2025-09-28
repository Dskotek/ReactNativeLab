import { useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setError("Platsåtkomst nekad");
      return null;
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      return coords;
    }
    return null;
  };

  return { latitude, longitude, error, getLocation };
};

export default useLocation;