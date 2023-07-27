const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;

export const getWeatherData = async (city) => {
  try {
    const response = await fetch(`${API_WEATHER}${city}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.code,
      conditionText: data.current.condition.text,
      icon: data.current.condition.icon,
    };
  } catch (error) {
    throw new Error("Error al obtener datos climáticos.");
  }
};
