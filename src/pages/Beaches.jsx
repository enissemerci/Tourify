import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Beaches() {
  const navigate = useNavigate();
  const [beaches, setBeaches] = useState([]);
  const [city, setCity] = useState(""); // Şehir başlangıçta boş
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API'den veri çekme
  const fetchBeaches = async (cityToSearch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://localhost:7130/api/Places/beaches`,
        {
          params: {
            city: cityToSearch || undefined, // Eğer şehir boşsa parametreyi gönderme
            sortBy: "rating",
            limit: 20,
          },
        }
      );

      if (response.data.length === 0) {
        throw new Error(
          cityToSearch
            ? `"${cityToSearch}" şehrinde plaj bulunamadı.`
            : "Hiç plaj bulunamadı."
        );
      }

      setBeaches(response.data); // Gelen veriyi state'e aktar
    } catch (err) {
      setBeaches([]); // Eğer veri yoksa listeyi temizle
      setError(err.message); // Hata mesajını kaydet
    } finally {
      setLoading(false);
    }
  };

  // İlk yüklemede rating'e göre plajları getir
  useEffect(() => {
    fetchBeaches();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBeaches(city); // Kullanıcının girdiği şehirle yeni arama yap
  };

  const handleClick = (beach) => {
    navigate(`/beach/${beach.name}`, { state: { beach } });
  };

  return (
    <Container style={{ minHeight: "720px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Plajlar
      </Typography>

      {/* Arama Çubuğu */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Şehir Ara"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mr: 2, width: "300px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ara
        </Button>
      </Box>

      {loading && <Typography align="center">Yükleniyor...</Typography>}
      {error && (
        <Alert severity="error" style={{ marginBottom: "20px", textAlign: "center" }}>
          {error}
        </Alert>
      )}

      {/* Plaj Listesi */}
      {!loading && !error && beaches.length > 0 && (
        <List>
          {beaches.map((beach, index) => (
            <Box key={index}>
              <ListItem
                alignItems="flex-start"
                component="div"
                onClick={() => handleClick(beach)}
                style={{ cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={beach.name}
                    src={beach.imageUrl} // API'den gelen görsel URL'si
                    sx={{ width: 100, height: 100 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ textAlign: "center" }} // Ortalama
                  primary={
                    <>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {beach.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "gray", mt: 1 }}
                      >
                        Puan: {beach.rating}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < beaches.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Box>
          ))}
        </List>
      )}

      {/* Eğer plaj yoksa mesaj göster */}
      {!loading && !error && beaches.length === 0 && (
        <Typography align="center" color="textSecondary" sx={{ mt: 3 }}>
          Aradığınız şehirde plaj bulunamadı.
        </Typography>
      )}
    </Container>
  );
}