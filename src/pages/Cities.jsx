import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import MuseumIcon from "@mui/icons-material/Museum";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Banner from "../assets/deneme.jpg";

export const Cities = () => {
  const location = useLocation();
  const [city, setCity] = useState(location.state?.city || ""); // Props ile gelen şehir adı
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  useEffect(() => {
    // Eğer şehir adı doluysa, otomatik olarak arama yapılır
    if (city) {
      fetchCityData();
    }
  }, [city]);

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
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
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

  return (
    <Box sx={{ minHeight: "720px", p: 3 }}>
      {/* Başlık Görseli */}
      <Box
        sx={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: "contain", // Orijinal boyutta tutar
          backgroundRepeat: "no-repeat", // Tekrar etmez
          backgroundPosition: "center",
          height: "450px", // Yükseklik resmin doğal oranına göre ayarlanır
          width: "100%", // Genişlik konteynerin tamamını kaplar
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          color="white"
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            fontWeight: "bold",
          }}
        >
        
        </Typography>
      </Box>

      {/* Şehir Arama */}
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 2 }}
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

      {/* Kategori Filtreleri */}
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

      {/* Kategoriler veya Bilgilendirme */}
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