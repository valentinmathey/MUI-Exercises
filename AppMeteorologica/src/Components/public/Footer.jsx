import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 2,
        textAlign: 'center',
        fontSize: '10px',
      }}
    >
      <Typography variant="body2">
        Powered by:{' '}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
