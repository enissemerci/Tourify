import React from "react";
import görsel from "../images/categoryEvents.webp";
import { Typography, Container, Box } from "@mui/material";
import { EventCard } from "../components/events/EventCard";
import "../components/events/EventCard.css";
export const Events = () => {
  const events = [
    {
      name: "Etkinlik 1",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-01",
      endDate: "2024-12-05",
      city: "İstanbul",
    },
    {
      name: "Etkinlik 2",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      city: "Ankara",
    },
    {
      name: "Etkinlik 3",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      city: "İzmir",
    },
    {
      name: "Etkinlik 4",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-25",
      endDate: "2024-12-30",
      city: "Bursa",
    },
    {
      name: "Etkinlik 1",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-01",
      endDate: "2024-12-05",
      city: "İstanbul",
    },
    {
      name: "Etkinlik 2",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      city: "Ankara",
    },
    {
      name: "Etkinlik 3",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      city: "İzmir",
    },
    {
      name: "Etkinlik 4",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-25",
      endDate: "2024-12-30",
      city: "Bursa",
    },
    {
      name: "Etkinlik 1",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-01",
      endDate: "2024-12-05",
      city: "İstanbul",
    },
    {
      name: "Etkinlik 2",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      city: "Ankara",
    },
    {
      name: "Etkinlik 3",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-15",
      endDate: "2024-12-20",
      city: "İzmir",
    },
    {
      name: "Etkinlik 4",
      image: görsel,
      description: "Bu etkinlik hakkında detaylı açıklama.",
      startDate: "2024-12-25",
      endDate: "2024-12-30",
      city: "Bursa",
    },
  ];

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
