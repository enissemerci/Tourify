import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "./OurChoices.css";
export const OurChoices = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Mekanların bilgileri
  const places = [
    {
      name: "Mekan 1",
      description: "Kısa açıklama 1",
      details: "Detaylı açıklama 1",
      image: "/images/denemeG.png",
    },
    {
      name: "Mekan 2",
      description: "Kısa açıklama 2",
      details: "Detaylı açıklama 2",
      image: "/images/denemeG.png",
    },
    {
      name: "Mekan 3",
      description: "Kısa açıklama 3",
      details: "Detaylı açıklama 3",
      image: "/images/denemeG.png",
    },
    
  ];

  // Dialog'u açma
  const handleOpen = (place) => {
    setSelectedPlace(place);
    setOpen(true);
  };

  // Dialog'u kapama
  const handleClose = () => {
    setOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div className="our-choices">
      <h1>Bizim seçimlerimiz</h1>
      <div className="our-choices-container">
        {places.map((place, index) => (
          <Card
            key={place.name}
            className="place-card"
            onClick={() => handleOpen(place)}
          >
            <CardMedia
              component="img"
              alt={place.name}
              image={place.image}
              style={{ height: 300, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {place.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {place.description}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Dialog (Popup) */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedPlace?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{selectedPlace?.details}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
