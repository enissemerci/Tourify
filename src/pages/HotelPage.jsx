import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Divider } from '@mui/material';
import BackgroundImage from '../assets/bg2.jpeg'; // Görsel dosyanızın yolu


const HotelPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: 'white',
          mt: 5,
          fontWeight: 'bold',
          textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
        }}
      >
        Otel bulunamadı
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BackgroundImage})`, // Arka plan resmi URL'sini buraya ekleyin
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
            alt={hotel.name}
            src={hotel.imageUrl || 'https://via.placeholder.com/300'} // Otel görseli yoksa placeholder kullanılır
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '2px solid #D3D3D3',
            }}
          />
          <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
            {hotel.name}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {hotel.country}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {hotel.city}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {hotel.address}
        </Typography>
        <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
          Puan: <span style={{ color: '#4A4A4A' }}>{hotel.rating}</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default HotelPage;