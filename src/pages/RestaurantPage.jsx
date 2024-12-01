import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Divider } from '@mui/material';

const RestaurantPage = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;

  if (!restaurant) {
    return <Typography variant="h5">Restoran bulunamadı</Typography>;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: '#F8F8F8',
        p: 3,
        mt: 5,
        borderRadius: 2,
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      }}
      style={{ minHeight: '720px', marginBottom: '20px' }}
    >
      <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
      <img
          alt={restaurant.name}
          src={restaurant.imageUrl} // API'den gelen görsel URL'si
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "2px solid #D3D3D3",
          }}
        />
        <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          {restaurant.name}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {restaurant.country}
      </Typography>
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {restaurant.city} 
      </Typography>
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {restaurant.address} {/* Adres bilgisi eklendi */}
      </Typography>
      <Typography variant="body2" sx={{ color: "#9E9E9E", mt: 1 }}>
        Puan: <span style={{ color: "#4A4A4A" }}>{restaurant.rating}</span>
      </Typography>
    </Container>
  );
};

export default RestaurantPage;