import React, { useEffect, useState } from "react";
import axios from "axios";
import görsel from "../images/categoryEvents.webp";
import { Typography, Container, Box, TextField, Button } from "@mui/material";
import { EventCard } from "../components/events/EventCard";
import "../components/events/EventCard.css";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Barcelona"); // Başlangıçta "Barcelona"
  const [searchCity, setSearchCity] = useState("Barcelona"); // Arama çubuğundaki şehir

  const fetchEvents = async (cityName) => {
    try {
      const response = await axios.get(`https://localhost:7130/api/Events/city/${cityName}`);
      console.log("Veri başarıyla alındı:", response.data);

      if (response.data.length === 0) {
        setError(`Aradığınız konumda etkinlik bulunmamakta: ${cityName}`);
        setEvents([]);
      } else {
        setEvents(response.data.slice(0, 30)); // İlk 9 etkinliği al
        setError(null); // Etkinlik bulunduysa hata mesajını temizle
      }
    } catch (error) {
      console.error("Etkinlikleri alırken bir hata oluştu:", error.message);
      setError("Aradığınız konumda etkinlik bulunmamakta");
    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde veya şehir değiştiğinde etkinlikleri getir
    fetchEvents(city);
  }, [city]);

  const handleSearch = () => {
    setCity(searchCity); // Aranan şehri güncelle
  };

  return (
    <Container className="events">
      <Typography variant="h3" align="center" gutterBottom className="events-title">
        Şehrinin Ritmini Yakala! 🥁🎉
      </Typography>

      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}

      {/* Şehir arama alanı */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <TextField
          label="Şehir Ara"
          variant="outlined"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Ara
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" className="event-cards">
        {events.map((event, index) => (
          <Box key={index} className="event-card-container">
            <EventCard event={event} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};