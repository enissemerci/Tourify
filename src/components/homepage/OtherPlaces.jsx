import React, { useState } from 'react';
import { Dialog, DialogContent, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./OtherPlaces.css"
import gorsel from "../../images/images.jpeg"
const places = [
  { title: "Paris", image: gorsel, description: "Paris, City of Light!" },
  { title: "Tokyo", image: gorsel, description: "Tokyo, blend of tradition and future." },
  { title: "New York", image: gorsel, description: "The Big Apple awaits!" },
  { title: "Istanbul", image: gorsel, description: "Historic Istanbul." },
  { title: "Dubai", image: gorsel, description: "Dubai, city of luxury." },
  // Diğer mekanlar burada devam edebilir
];

export const OtherPlaces = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleCardClick = (place) => {
    setSelectedPlace(place);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div className="other-places-container">
      <h1>Bir sonraki tatiliniz için en iyi konumlar</h1>
      <p>İşte diğer gezginlerin gittiği yerler</p>
      <Carousel
        infiniteLoop
        showThumbs={false}
        autoPlay
        interval={6000}
        transitionTime={1200}
        centerMode
        centerSlidePercentage={40} 
        showStatus={false}
        swipeable 
        axis="horizontal"
      >
        {places.map((place, index) => (
          <div key={index} onClick={() => handleCardClick(place)} className="carousel-card">
            <Card className="place-card">
              <CardMedia
                component="img"
                image={place.image}
                alt={place.title}
                className="carousel-image"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {place.title}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>

      {/* Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {selectedPlace && (
            <>
              <Typography variant="h4">{selectedPlace.title}</Typography>
              <img src={selectedPlace.image} alt={selectedPlace.title} style={{ width: "100%", marginBottom: "20px" }} />
              <Typography variant="body1">{selectedPlace.description}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};