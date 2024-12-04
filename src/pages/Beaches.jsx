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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/bg1.jpeg";

export default function Beaches() {
  const navigate = useNavigate();
  const [beaches, setBeaches] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBeaches = async (cityToSearch) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://localhost:7130/api/Places/beaches`,
        {
          params: {
            city: cityToSearch || undefined,
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

      setBeaches(response.data);
    } catch (err) {
      setBeaches([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeaches();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBeaches(city);
  };

  const handleClick = (beach) => {
    navigate(`/beach/${beach.name}`, { state: { beach } });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <Container
        style={{
          minHeight: "720px",
          background: "rgba(255, 255, 255, 0.9)", // Arka planı açık bir renk yap
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Plajlar
        </Typography>

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
          <Alert
            severity="error"
            style={{ marginBottom: "20px", textAlign: "center" }}
          >
            {error}
          </Alert>
        )}

        {!loading && !error && beaches.length > 0 && (
          <List>
            {beaches.map((beach, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  mb: 2,
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "rgba(240, 240, 240, 1)",
                }}
              >
                <ListItem
                  alignItems="flex-start"
                  component="div"
                  onClick={() => handleClick(beach)}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={beach.name}
                      src={beach.imageUrl}
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "10px",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            color: "#333",
                          }}
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
                    secondary={
                      beach.city && (
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", mt: 0.5 }}
                        >
                          {beach.city}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}

        {!loading && !error && beaches.length === 0 && (
          <Typography align="center" color="textSecondary" sx={{ mt: 3 }}>
            Aradığınız şehirde plaj bulunamadı.
          </Typography>
        )}
      </Container>
    </Box>
  );
}