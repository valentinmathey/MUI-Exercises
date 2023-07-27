import React, { useState } from 'react';
import { CssBaseline, Container, TextField, Typography, Box } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import { LoadingButton } from "@mui/lab";
import  Navbar  from './Components/public/Navbar.jsx';
import  Footer  from './Components/public/Footer.jsx';
import { Weather } from './Components/public/Weather';
import { getWeatherData } from './Api/weatherAPI';

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });

    try {
      if (!city.trim()) {
        throw new Error("El Campo ciudad es obligatorio");
      }

      const weatherData = await getWeatherData(city);
      setWeather(weatherData);
    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Busca el clima en tu ciudad
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="city"
            label="Ciudad"
            variant="outlined"
            size="small"
            required
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={error.error}
            helperText={error.message}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Cargando..."
          >
            Buscar
          </LoadingButton>
        </Box>

        <Weather weather={weather} />
      </Container>
      <Footer />
    </>
  );
};

export default App;
