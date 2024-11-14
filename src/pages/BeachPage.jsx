// BeachPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Divider } from '@mui/material';

const BeachPage = () => {
  const location = useLocation();
  const beach = location.state?.beach;

  if (!beach) {
    return <Typography variant="h5">Plaj bulunamadı</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#F8F8F8', p: 3, mt: 5, borderRadius: 2, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}  style={{minHeight:"720px",marginBottom:"20px"}}>
      <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
        <Avatar
          alt={beach.name}
          src={beach.image}
          sx={{ width: 120, height: 120, mb: 2, border: '2px solid #D3D3D3' }}
        />
        <Typography variant="h4" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          {beach.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 1 }}>
          {beach.address}
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: '#E0E0E0', mb: 3 }} />
      <Typography variant="body1" sx={{ color: '#333333', mb: 2 }}>
        {beach.description}
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
        Doğal Güzellik: <span style={{ color: '#4A4A4A' }}>{beach.naturalBeauty}</span>
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
        Telefon: <span style={{ color: '#4A4A4A' }}>{beach.phone}</span>
      </Typography>
      <Typography variant="body2" sx={{ color: '#9E9E9E', mt: 1 }}>
        Puan: <span style={{ color: '#4A4A4A' }}>{beach.rating}</span>
      </Typography>
    </Container>
  );
};

export default BeachPage;