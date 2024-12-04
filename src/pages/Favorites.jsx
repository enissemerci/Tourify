import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Favoriler
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgisi

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setError("");
    if (!user || !user.token) {
      setError("Favorilere erişmek için giriş yapmanız gerekiyor.");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7130/api/UserFavorites/favorites`,
        {
          params: { email: user.email },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Gelen Favoriler:", response.data); // Gelen yanıtı kontrol edin
      setFavorites(response.data || []);
    } catch (err) {
      console.error("Favoriler alınırken hata oluştu:", err);
      setError("Favoriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleToggleFavorite = async (place) => {
    if (!user || !user.token) {
      setError("Favorilere erişmek için giriş yapmanız gerekiyor.");
      return;
    }

    if (!place.placeGoogleId) { // Alan doğru alınıyor mu kontrol edin
      console.error("Hata: placeGoogleId eksik.", place);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }

    try {
      await axios.post(
        `https://localhost:7130/api/UserFavorites/toggle-favorite/${place.placeGoogleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Favoriler listesini güncelle
      setFavorites((prevFavorites) =>
        prevFavorites.map((item) =>
          item.placeGoogleId === place.placeGoogleId
            ? { ...item, isFavorite: !item.isFavorite }
            : item
        )
      );
    } catch (err) {
      console.error("Favori durumunu değiştirirken hata oluştu:", err);
      setError("Favori durumunu değiştirirken bir hata oluştu.");
    }
  };

  const renderFavorites = () => (
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
      {favorites.map((item, index) => (
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
          <IconButton
            onClick={() => handleToggleFavorite(item)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <FavoriteIcon color={item.isFavorite ? "error" : "disabled"} />
          </IconButton>
          <img
            src={item.imageUrl || "https://via.placeholder.com/300"}
            alt={item.placeName}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <Box p={2}>
            <Typography variant="h6" align="center">
              {item.placeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {item.address || "Adres Bilgisi Yok"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ minHeight: "720px", p: 3 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#2F4F4F",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Favorilerim
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {favorites.length > 0 ? (
        renderFavorites()
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{
            mt: 5,
            fontWeight: "bold",
            color: "#2F4F4F",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Henüz favorilere bir yer eklemediniz!
        </Typography>
      )}
    </Box>
  );
};

export default Favorites;