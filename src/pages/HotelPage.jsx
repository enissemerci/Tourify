import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Divider } from '@mui/material';

const HotelPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;

  if (!hotel) {
    return <Typography variant="h5">Otel bulunamadı</Typography>;
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
          alt={hotel.name}
          src={hotel.imageUrl}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "2px solid #D3D3D3",
          }}
        />
        <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          {hotel.name}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {hotel.country}
      </Typography>
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {hotel.city} 
      </Typography>
      <Typography variant="body2" sx={{ color: "#6E6E6E", mt: 1 }}>
        {hotel.address} {/* Adres bilgisi eklendi */}
      </Typography>
      <Typography variant="body2" sx={{ color: "#9E9E9E", mt: 1 }}>
        Puan: <span style={{ color: "#4A4A4A" }}>{hotel.rating}</span>
      </Typography>
    </Container>
  );
};

export default HotelPage;