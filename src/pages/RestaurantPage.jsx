import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Divider } from '@mui/material';
import BackgroundImage from '../assets/bg2.jpeg'; // Görsel dosyanızın yolu

const RestaurantPage = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  if (!restaurant) {
    return <Typography variant="h5">Restoran bulunamadı</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.85)', // Şeffaf beyaz arka plan
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
          <img
            alt={restaurant.name}
            src={restaurant.imageUrl} // API'den gelen görsel URL'si
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '2px solid #D3D3D3',
            }}
          />
          <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
            {restaurant.name}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {restaurant.country}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {restaurant.city}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {restaurant.address} {/* Adres bilgisi eklendi */}
        </Typography>
        <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
          Puan: <span style={{ color: '#4A4A4A' }}>{restaurant.rating}</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default RestaurantPage;