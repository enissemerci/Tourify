import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";
import gorsel from "../../images/categoryEvents.webp";
export const EventCard = ({ event }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleClickOpen}
        style={{ cursor: "pointer", width: 300, margin: 16 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={event.imageUrl ? event.imageUrl : gorsel}
          alt={event.name}
        />
        <CardContent style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Yatayda ortalama
      textAlign: "center", // Yazı içeriği ortalama
    }}>
          <Typography variant="h6" component="div">
            {event.name}
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
          >
            <Button
              variant="contained"
              onClick={() => window.open(event.url, "_blank")}
              sx={{
                backgroundColor: "#3A6D8C", 
                color: "#ffffff", // Yazı rengi
                "&:hover": {
                  backgroundColor: "#1565c0", 
                },
              }}
            >
              Biletlere Bak
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detaylar için Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{event.name}</DialogTitle>
        <DialogContent >
          <CardMedia
            component="img"
            height="200"
            image={event.imageUrl ? event.imageUrl : gorsel}
            alt={event.name}
            style={{ marginBottom: 16 }}
          />
          <Typography gutterBottom>
            Başlama Tarihi: {new Date(event.startDate).toLocaleString()}
          </Typography>
          <Typography gutterBottom>
            Bitiş Tarihi: {new Date(event.endDate).toLocaleString()}
          </Typography>
          <Typography gutterBottom>Konum: {event.location}</Typography>
          <Typography gutterBottom>Şehir: {event.city}</Typography>
          <Typography gutterBottom>Ülke: {event.country}</Typography>
          {/* Fiyat Bilgisi */}
          {event.minPrice != null && event.maxPrice != null && (
            <Typography gutterBottom>
              Fiyat Aralığı: {event.minPrice}€ - {event.maxPrice}€
            </Typography>
          )}
          {/* Butonu Ortala */}
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3A6D8C", 
                color: "#ffffff", // Yazı rengi
                "&:hover": {
                  backgroundColor: "#1565c0", 
                },
              }}
              onClick={() => window.open(event.url, "_blank")}
            >
              Biletini Al
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
