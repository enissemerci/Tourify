import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Divider, IconButton } from '@mui/material';
import BackgroundImage from '../assets/bg2.jpeg'; // Görsel dosyanızın yolu
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Araba ikonu
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'; // Dolu araba ikonu
import axios from 'axios';

const HotelPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Kullanıcı bilgisi

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchVisited();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7130/api/UserFavorites/favorites`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const favoritePlaceIds = response.data.map((fav) => fav.placeGoogleId);
      setFavorites(favoritePlaceIds); // Favoriler listesini güncelle
    } catch (err) {
      console.error('Favoriler alınırken hata oluştu:', err);
    }
  };

  const fetchVisited = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7130/api/UserFavorites/visited`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const visitedPlaceIds = response.data.map((visited) => visited.placeGoogleId);
      setVisited(visitedPlaceIds); // Gezilen yerler listesini güncelle
    } catch (err) {
      console.error('Gezilen yerler alınırken hata oluştu:', err);
    }
  };

  const handleFavorite = async (googlePlaceId) => {
    if (!user || !user.token) {
      setError('Favorilere eklemek için giriş yapmanız gerekiyor.');
      return;
    }

    try {
      await axios.post(
        `https://localhost:7130/api/UserFavorites/toggle-favorite/${googlePlaceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setFavorites((prev) =>
        prev.includes(googlePlaceId)
          ? prev.filter((id) => id !== googlePlaceId)
          : [...prev, googlePlaceId]
      );
    } catch (err) {
      console.error('Favorilere eklenirken hata oluştu:', err);
    }
  };

  const handleVisited = async (googlePlaceId) => {
    if (!user || !user.token) {
      setError('Gezilen yerlere eklemek için giriş yapmanız gerekiyor.');
      return;
    }

    try {
      await axios.post(
        `https://localhost:7130/api/UserFavorites/toggle-visited/${googlePlaceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setVisited((prev) =>
        prev.includes(googlePlaceId)
          ? prev.filter((id) => id !== googlePlaceId)
          : [...prev, googlePlaceId]
      );
    } catch (err) {
      console.error('Gezilen yer eklenirken hata oluştu:', err);
    }
  };

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
        backgroundImage: `url(${BackgroundImage})`,
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
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          p: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
          <img
            alt={hotel.name}
            src={hotel.imageUrl || 'https://via.placeholder.com/300'}
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

          {/* Favori ve Gezilen Yer Butonları */}
          <Box display="flex" gap={2} mt={2}>
            <IconButton onClick={() => handleFavorite(hotel.googlePlaceId)}>
              {favorites.includes(hotel.googlePlaceId) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton onClick={() => handleVisited(hotel.googlePlaceId)}>
              {visited.includes(hotel.googlePlaceId) ? (
                <DirectionsCarIcon sx={{ color: '#FFB300' }} />
              ) : (
                <DirectionsCarFilledIcon />
              )}
            </IconButton>
          </Box>
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