import React, { useEffect, useState } from "react";
import axios from "axios";
import görsel from "../images/categoryEvents.webp";
import { Typography, Container, Box } from "@mui/material";
import { EventCard } from "../components/events/EventCard";
import "../components/events/EventCard.css";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // Hata durumunu tutmak için

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://localhost:5000/api/Events/upcoming"); // API URL'nizi buraya yazın
        console.log("Veri başarıyla alındı:", response.data); // Başarılı veri döndüğünde logla
        setEvents(response.data);
      } catch (error) {
        console.error("Etkinlikleri alırken bir hata oluştu:", error.message); // Hata mesajını logla
        setError("Etkinlikleri alırken bir hata oluştu."); // Kullanıcıya gösterilecek hata mesajı
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        className="events-title"
      >
        Şehrin Ritmini Yakala! 🥁🎉
      </Typography>

      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        className="event-cards"
      >
        {events.map((event, index) => (
          <Box key={index} className="event-card-container">
            <EventCard event={event} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};