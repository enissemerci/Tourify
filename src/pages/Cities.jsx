import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Boş kalp
import FavoriteIcon from "@mui/icons-material/Favorite"; // Dolu kalp
import MuseumIcon from "@mui/icons-material/Museum";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Banner from "../assets/video.mp4";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Araba ikonu
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled"; // Dolu araba ikonu


export const Cities = () => {
  const location = useLocation();
  const [city, setCity] = useState(location.state?.city || ""); // Şehir adı
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [favorites, setFavorites] = useState([]); // Favoriler state
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [visited, setVisited] = useState([]); // Gezilen yerler state


  const user = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgisi

  useEffect(() => {
    if (city) {
      fetchCityData();
    }
    if (user) {
      fetchFavorites(); // Kullanıcı giriş yaptıysa favorileri çek
    }
  }, [city]);

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
      setFavorites(favoritePlaceIds); // Sadece placeGoogleId değerlerini sakla
    } catch (err) {
      console.error("Favoriler alınırken hata oluştu:", err);
    }
  };

  const fetchCityData = async () => {
    setError("");
    try {
      const [restaurantRes, hotelRes, museumRes, attractionRes] =
        await Promise.all([
          axios.get(`https://localhost:7130/api/Places/google/restaurants`, {
            params: { city, sortBy: "rating" },
          }),
          axios.get(`https://localhost:7130/api/Places/google/hotels`, {
            params: { city, sortBy: "rating" },
          }),
          axios.get(`https://localhost:7130/api/Places/museums`, {
            params: { city, sortBy: "rating" },
          }),
          axios.get(
            `https://localhost:7130/api/Places/google/attractions/${city}`,
            { params: {} }
          ),
        ]);

      setRestaurants(restaurantRes.data.restaurants || []);
      setHotels(hotelRes.data.hotels || []);
      setMuseums(museumRes.data || []);
      setAttractions(attractionRes.data || []);
      setIsSearchPerformed(true);
    } catch (err) {
      console.error("Veriler alınırken hata oluştu:", err);
      setError("Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleFavorite = async (googlePlaceId) => {
    if (!user || !user.token) {
      setError("Favorilere eklemek için giriş yapmanız gerekiyor.");
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

      // Favoriler listesini güncelle
      if (favorites.includes(googlePlaceId)) {
        setFavorites(favorites.filter((id) => id !== googlePlaceId)); // Favoriden çıkar
      } else {
        setFavorites([...favorites, googlePlaceId]); // Favorilere ekle
      }
    } catch (err) {
      console.error("Favorilere eklenirken hata oluştu:", err);
      setError("Favorilere ekleme sırasında bir hata oluştu.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Lütfen bir şehir adı girin.");
      return;
    }
    fetchCityData();
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const getIconColor = (type) => {
    return filter === type ? "primary" : "default";
  };


// Gezilen yerleri API'den çek
const fetchVisited = async () => {
  if (!user || !user.token) return;
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
    setVisited(visitedPlaceIds); // Sadece placeGoogleId değerlerini sakla
  } catch (err) {
    console.error("Gezilen yerler alınırken hata oluştu:", err);
  }
};

// Gezilen yer ekleme/çıkarma işlemi
const handleVisited = async (googlePlaceId) => {
  if (!user || !user.token) {
    setError("Gezilen yerlere eklemek için giriş yapmanız gerekiyor.");
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

    // Gezilen yerler listesini güncelle
    if (visited.includes(googlePlaceId)) {
      setVisited(visited.filter((id) => id !== googlePlaceId)); // Listeden çıkar
    } else {
      setVisited([...visited, googlePlaceId]); // Listeye ekle
    }
  } catch (err) {
    console.error("Gezilen yer eklenirken hata oluştu:", err);
    setError("Gezilen yer ekleme sırasında bir hata oluştu.");
  }
};


const renderCategory = (title, data) => (
  <Box sx={{ mt: 3 }}>
    <Typography
      variant="h4"
      align="center"
      sx={{
        mb: 2,
        fontWeight: "bold",
        color: "#2F4F4F",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        justifyContent: "center",
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            background: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Favori İkonu */}
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 40,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            onClick={() => handleFavorite(item.googlePlaceId)}
          >
            {favorites.includes(item.googlePlaceId) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          {/* Gezilen Yer İkonu */}
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 0,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            onClick={() => handleVisited(item.googlePlaceId)}
          >
            {visited.includes(item.googlePlaceId) ? (
              <DirectionsCarIcon  sx={{ color: "#FFB300" }} />
            ) : (
              <DirectionsCarFilledIcon sx={{ color: "" }} />
            )}
          </IconButton>

          <img
            src={item.imageUrl || "https://via.placeholder.com/300"}
            alt={item.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <Box p={2}>
            <Typography variant="h6" align="center">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {item.address || "Adres Bilgisi Yok"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);
useEffect(() => {
  if (user) {
    fetchVisited();
  }
}, [user]);

  return (
    <Box sx={{ minHeight: "720px", p: 3 }}>
      {/* Başlık Görseli */}
      <Box
        sx={{
          position: "relative",
          height: "400px",
          overflow: "hidden",
        }}
      >
        <video
          src={Banner}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Typography
          variant="h4"
          color="white"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            fontWeight: "bold",
          }}
        >
        </Typography>
      </Box>

      {/* Şehir Arama */}
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 2, pt: 4 }}
        component="form"
        onSubmit={handleSearch}
      >
        <TextField
          label="Şehir Girin"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Ara
        </Button>
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <IconButton onClick={() => handleFilter("all")} color={getIconColor("all")}>
          <PlaceIcon />
          <Typography variant="body2">Hepsi</Typography>
        </IconButton>
        <IconButton onClick={() => handleFilter("restaurants")} color={getIconColor("restaurants")}>
          <RestaurantIcon />
          <Typography variant="body2">Restoranlar</Typography>
        </IconButton>
        <IconButton onClick={() => handleFilter("hotels")} color={getIconColor("hotels")}>
          <HotelIcon />
          <Typography variant="body2">Oteller</Typography>
        </IconButton>
        <IconButton onClick={() => handleFilter("museums")} color={getIconColor("museums")}>
          <MuseumIcon />
          <Typography variant="body2">Müzeler</Typography>
        </IconButton>
        <IconButton onClick={() => handleFilter("attractions")} color={getIconColor("attractions")}>
          <PlaceIcon />
          <Typography variant="body2">Gezilecek Yerler</Typography>
        </IconButton>
      </Box>

      {!isSearchPerformed ? (
        <Typography
          variant="h4"
          align="center"
          sx={{
            mt: 5,
            fontWeight: "bold",
            color: "#2F4F4F",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Aramak istediğiniz şehri girin ve keşfedin!
        </Typography>
      ) : (
        <Box>
          {(filter === "all" || filter === "restaurants") &&
            renderCategory(
              "Restoranlar",
              filter === "all" ? restaurants.slice(0, 6) : restaurants
            )}
          {(filter === "all" || filter === "hotels") &&
            renderCategory(
              "Oteller",
              filter === "all" ? hotels.slice(0, 6) : hotels
            )}
          {(filter === "all" || filter === "museums") &&
            renderCategory(
              "Müzeler",
              filter === "all" ? museums.slice(0, 6) : museums
            )}
          {(filter === "all" || filter === "attractions") &&
            renderCategory(
              "Gezilecek Yerler",
              filter === "all" ? attractions.slice(0, 6) : attractions
            )}
        </Box>
      )}
    </Box>
  );
};

export default Cities;