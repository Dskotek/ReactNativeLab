
const API_KEY = "bf6bb28604d2421fb92101351252509";
const WEATHER_API_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (location) => {
  try {
    const result = await fetch(
      `${WEATHER_API_URL}/current.json?key=${API_KEY}&q=${location}&lang=sv`
    );

    if (!result.ok) {
      throw new Error("Kunde inte hämta väderdata");
    }

    return result.json();
  } catch (error) {
    console.error("Fel i getWeather:", error);
    throw error;
  }
};
export const getForecast = async (location) => {
    try {
      const result = await fetch(
        `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&lang=sv`
      );
        if (!result.ok) {
            throw new Error("Kunde inte hämta väderdata");
        }

        return result.json();
    } catch (error) {
        console.error("Fel i getForecast:", error);
        throw error;
    }
}