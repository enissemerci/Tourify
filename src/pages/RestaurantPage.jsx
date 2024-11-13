import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Divider } from '@mui/material';

export const RestaurantPage = () => {
  const { restaurantName } = useParams();

  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#F8F8F8', p: 3, mt: 5, borderRadius: 2, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
      <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
        <Avatar
          alt={restaurantName}
          src={`https://via.placeholder.com/150?text=${restaurantName}`}
          sx={{ width: 120, height: 120, mb: 2, border: '2px solid #D3D3D3' }}
        />
        <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          {restaurantName}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          Restoranın adresi burada olacak.
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
      <Typography variant="body1" sx={{ color: '#333333', mb: 2 }}>
        Restoranın açıklaması burada yer alacak.
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
        Mutfak Türü: <span style={{ color: '#4A4A4A' }}>Türk Mutfağı</span>
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
        Telefon: <span style={{ color: '#4A4A4A' }}>0212 123 45 67</span>
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
        Puan: <span style={{ color: '#4A4A4A' }}>4.5 / 5</span>
      </Typography>
    </Container>
  );
}
