import React, { useState } from 'react';
import { Dialog, DialogContent, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./OtherPlaces.css"
import tokyo from "../../images/cities/tokyo.webp"
import paris from "../../images/cities/paris.webp"
import newyork from "../../images/cities/newyork.webp"
import istanbul from "../../images/cities/istanbul.webp"
import dubai from "../../images/cities/dubai.webp"


const places = [
  { title: "Paris", image: paris, description: "Işık Şehri Paris! Eyfel Kulesi, Louvre Müzesi ve Seine Nehri kıyısındaki kafeleriyle ünlü, aşk ve sanat dolu bir şehir." },
  { title: "Tokyo", image: tokyo, description: "Tokyo, gelenekle geleceğin buluştuğu şehir. Tapınaklar ve gökdelenlerin bir araya geldiği bu şehir, Japon kültürü ve teknolojiyi bir arada sunar." },
  { title: "New York", image: newyork, description: "Büyük Elma sizi bekliyor! Özgürlük Heykeli, Central Park ve Broadway ile New York, farklı kültürlerin buluşma noktasıdır." },
  { title: "İstanbul", image: istanbul, description: "Tarihi İstanbul. Boğaziçi kıyısında yer alan, Asya ve Avrupa’yı birleştiren bu şehir, Ayasofya, Sultanahmet Camii ve Kapalıçarşı gibi tarihi yapılarıyla ünlüdür." },
  { title: "Dubai", image: dubai, description: "Lüksün şehri Dubai. Çölde yükselen gökdelenler, lüks alışveriş merkezleri ve Burj Khalifa gibi simgeleriyle modernizmin ve gösterişin merkezi." },
  { title: "Sidney", image: paris, description: "Opera Binası’nın evi Sidney! Avustralya’nın gözde şehri, geniş plajları, sıcak iklimi ve simgesel yapılarıyla her yıl turistleri kendine çeker." },
  { title: "Rio de Janeiro", image: tokyo, description: "Samba ve karnavalın merkezi Rio! Brezilya’nın göz kamaştırıcı şehri, Kurtarıcı İsa Heykeli, plajları ve dünyaca ünlü karnavalıyla bilinir." },
  { title: "Roma", image: newyork, description: "Batı uygarlığının beşiği Roma! Kolezyum, Pantheon ve Vatikan gibi tarihi anıtlarıyla İtalya’nın başkenti, kültür ve tarih hazinesi sunar." },
  { title: "Cape Town", image: istanbul, description: "Masa Dağı’nın şehri Cape Town. Güney Afrika'nın göz alıcı doğası, plajları ve üzüm bağlarıyla ünlüdür." },
  { title: "Bangkok", image: dubai, description: "Tayland’ın renkli başkenti Bangkok. Tapınakları, hareketli sokak pazarı ve zengin mutfağıyla egzotik bir atmosfer sunar." },
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