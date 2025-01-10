import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Araba ikonu
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled"; // Dolu araba ikonu
import axios from "axios";

export const PastTravels = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]); // Geçmiş gezilen yerler
  const [filteredPlaces, setFilteredPlaces] = useState([]); // Arama sonucu filtrelenmiş yerler
  const [error, setError] = useState("");
  const [tempVisitedPlaces, setTempVisitedPlaces] = useState([]); // Geçici ziyaret edilen yerler (ikon durumu için)
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi

  const user = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgisi

  useEffect(() => {
    fetchVisitedPlaces();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPlaces(tempVisitedPlaces); // Eğer arama terimi boşsa, tüm yerleri göster
    } else {
      setFilteredPlaces(
        tempVisitedPlaces.filter((place) =>
          place.placeName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, tempVisitedPlaces]);

  const fetchVisitedPlaces = async () => {
    setError("");
    if (!user || !user.token) {
      setError("Gezilen yerlere erişmek için giriş yapmanız gerekiyor.");
      return;
    }

    try {
      const response = await axios.get(
        `https://localhost:7130/api/UserFavorites/visited`,
        {
          params: { email: user.email },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Gelen Gezilen Yerler:", response.data);
      setVisitedPlaces(response.data || []);
      setTempVisitedPlaces(
        response.data.map((place) => ({
          ...place,
          hasVisited: place.hasVisited, // Geçici durum
        }))
      );
    } catch (err) {
      console.error("Gezilen yerler alınırken hata oluştu:", err);
      setError(
        "Gezilen yerler alınırken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  const handleToggleVisited = async (place) => {
    if (!user || !user.token) {
      setError("Gezilen yerlere erişmek için giriş yapmanız gerekiyor.");
      return;
    }

    // Ikon değişikliği için yerin geçici durumunu güncelle
    const updatedPlaces = tempVisitedPlaces.map((item) =>
      item.placeGoogleId === place.placeGoogleId
        ? { ...item, hasVisited: !item.hasVisited }
        : item
    );
    setTempVisitedPlaces(updatedPlaces);

    // Sayfa yenilendiğinde sunucuya güncelleme gönderilebilir
    try {
      await axios.post(
        `https://localhost:7130/api/UserFavorites/toggle-visited/${place.placeGoogleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.error("Gezilen yerden çıkarılırken hata oluştu:", err);
      setError("Gezilen yerden çıkarılırken bir hata oluştu.");
    }
  };

  const renderVisitedPlaces = () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        justifyContent: "center",
        maxWidth: "90%",
        margin: "0 auto",
      }}
    >
      {filteredPlaces.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            onClick={() => handleToggleVisited(item)} // Iconu değiştirecek
          >
            {item.hasVisited ? (
              <DirectionsCarFilledIcon sx={{ color: "#FFB300" }} /> // Dolu araba ikonu
            ) : (
              <DirectionsCarIcon sx={{ color: "" }} /> // Boş araba ikonu
            )}
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
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {item.placeName}
            </Typography>
            <Typography variant="body2">
              {item.address || "Adres Bilgisi Yok"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ minHeight: "720px", p: 3, backgroundColor: "#f9f9f9" }}>
      <Typography
        variant="h4"
        align="center" // Başlık ortalandı
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#2E3B4E",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        Geçmiş Yolculuklarım
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Arama çubuğu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Yer ara"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: "400px" }} // Küçük bir genişlik sınırı
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {visitedPlaces.length > 0 ? (
        renderVisitedPlaces()
      ) : (
        <Typography
          variant="h6"
          align="center" // Başlık ortalandı
          sx={{
            mt: 5,
            fontWeight: "bold",
            color: "#2E3B4E",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Henüz gezdiğiniz bir yer kaydedilmemiş!
        </Typography>
      )}
    </Box>
  );
};

export default PastTravels;
