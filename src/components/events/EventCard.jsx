import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';

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
      <Card onClick={handleClickOpen} style={{ cursor: 'pointer', width: 300, margin: 16 }}>
        <CardMedia
          component="img"
          height="200"
          image={event.image}
          alt={event.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {event.name}
          </Typography>
        </CardContent>
      </Card>

      {/* Detaylar için Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{event.name}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height="200"
            image={event.image}
            alt={event.name}
            style={{ marginBottom: 16 }}
          />
          <Typography gutterBottom>{event.description}</Typography>
          <Typography gutterBottom>Başlama Tarihi: {event.startDate}</Typography>
          <Typography gutterBottom>Bitiş Tarihi: {event.endDate}</Typography>
          <Typography gutterBottom>Şehir: {event.city}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};