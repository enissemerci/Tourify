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

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState(
    JSON.parse(sessionStorage.getItem('restaurants')) || [] 
  );
  const [city, setCity] = useState(
    sessionStorage.getItem('lastSearchedCity') || '' 
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API'den veri çekme
  const fetchRestaurants = async (cityToSearch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://localhost:7130/api/Places/google/restaurants', {
        params: {
          ...(cityToSearch && { city: cityToSearch }), 
          limit: 20,
          sortOrder: 'rating',
        },
      });

      const restaurantsData = response.data.restaurants;

      if (!restaurantsData || restaurantsData.length === 0) {
        throw new Error(
          cityToSearch
            ? `"${cityToSearch}" şehrinde restoran bulunamadı.`
            : 'Hiç restoran bulunamadı.'
        );
      }

      setRestaurants(restaurantsData);
      sessionStorage.setItem('restaurants', JSON.stringify(restaurantsData)); // Restoranları kaydet
      sessionStorage.setItem('lastSearchedCity', cityToSearch || ''); // Son şehri kaydet
    } catch (err) {
      setRestaurants([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // İlk yüklemede restoranları getir
  useEffect(() => {
    if (restaurants.length === 0) {
      fetchRestaurants(city); // İlk yükleme
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRestaurants(city); // Kullanıcının girdiği şehirle yeni arama yap
  };

  const handleClick = (restaurant) => {
    const formattedName = encodeURIComponent(restaurant.name.replace(/\s+/g, '-').toLowerCase());
    navigate(`/restaurant/${formattedName}`, { state: { restaurant } });
  };

  return (
    <Container style={{ minHeight: '720px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Restoranlar
      </Typography>

      {/* Arama Çubuğu */}
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

      {!loading && !error && restaurants.length > 0 && (
        <List>
          {restaurants.map((restaurant, index) => (
            <Box key={`${restaurant.name}-${index}`}>
              <ListItem
                alignItems="flex-start"
                component="div"
                onClick={() => handleClick(restaurant)}
                style={{ cursor: 'pointer' }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={restaurant.name}
                    src={restaurant.imageUrl}
                    sx={{ width: 100, height: 100 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary={
                    <>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {restaurant.name}
                      </Typography>
                      <Typography variant="body2" component="div" sx={{ color: 'gray', mt: 1 }}>
                        Puan: {restaurant.rating}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < restaurants.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      )}

      {!loading && !error && restaurants.length === 0 && (
        <Typography align="center" color="textSecondary" sx={{ mt: 3 }}>
          Aradığınız şehirde restoran bulunamadı.
        </Typography>
      )}
    </Container>
  );
}