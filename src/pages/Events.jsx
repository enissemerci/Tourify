import React, { useEffect, useState } from "react";
import axios from "axios";
import görsel from "../images/categoryEvents.webp";
import { Typography, Container, Box } from "@mui/material";
import { EventCard } from "../components/events/EventCard";
import "../components/events/EventCard.css";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://localhost:7130/api/Events/city/{Istanbul}");
        console.log("Veri başarıyla alındı:", response.data);
        setEvents(response.data.slice(0, 18)); // İlk 18 etkinliği al
      } catch (error) {
        console.error("Etkinlikleri alırken bir hata oluştu:", error.message);
        setError("Etkinlikleri alırken bir hata oluştu.");
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