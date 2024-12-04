import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/bg1.jpeg'; // Görsel dosyanızın yolu

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState(''); // Varsayılan şehir boş
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHotels = async (cityToSearch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://localhost:7130/api/Places/google/hotels', {
        params: {
          ...(cityToSearch && { city: cityToSearch }),
          limit: 20,
          sortOrder: 'rating',
        },
      });

      const hotelsData = response.data.hotels;

      if (!hotelsData || hotelsData.length === 0) {
        throw new Error(
          cityToSearch
            ? `"${cityToSearch}" şehrinde otel bulunamadı.`
            : 'Hiç otel bulunamadı.'
        );
      }

      setHotels(hotelsData);
    } catch (err) {
      setHotels([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(); // İlk yükleme
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels(city); // Kullanıcının girdiği şehirle yeni arama yap
  };

  const handleClick = (hotel) => {
    const formattedName = encodeURIComponent(hotel.name.replace(/\s+/g, '-').toLowerCase());
    navigate(`/hotel/${formattedName}`, { state: { hotel } });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Sayfanın okunabilirliğini artırmak için arka plan opaklığı
          borderRadius: '8px',
          padding: '20px',
          mt: 5,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Oteller
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Şehir Ara"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mr: 2, width: '300px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Ara
          </Button>
        </Box>

        {loading && <Typography align="center">Yükleniyor...</Typography>}
        {error && (
          <Alert severity="error" style={{ marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </Alert>
        )}

        {!loading && !error && hotels.length > 0 && (
          <List>
            {hotels.map((hotel, index) => (
              <Box key={`${hotel.name}-${index}`}>
                <ListItem
                  alignItems="flex-start"
                  component="div"
                  onClick={() => handleClick(hotel)}
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={hotel.name}
                      src={hotel.imageUrl}
                      sx={{ width: 80, height: 80 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={
                      <>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {hotel.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: 'gray', mt: 1 }}
                        >
                          Puan: {hotel.rating}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < hotels.length - 1 && <Divider variant="inset" component="li" />}
              </Box>
            ))}
          </List>
        )}

        {!loading && !error && hotels.length === 0 && (
          <Typography align="center" color="textSecondary" sx={{ mt: 3 }}>
            Aradığınız şehirde otel bulunamadı.
          </Typography>
        )}
      </Container>
    </Box>
  );
}