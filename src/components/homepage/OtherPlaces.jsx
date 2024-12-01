import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OtherPlaces.css";

export const OtherPlaces = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularCities = async () => {
      try {
        const response = await axios.get("https://localhost:7130/api/Places/popular-cities");
        console.log("API'den Gelen Veriler:", response.data);
        setPlaces(response.data);
      } catch (err) {
        console.error("Popüler şehirler alınırken hata oluştu:", err);
      }
    };
    fetchPopularCities();
  }, []);

  const handleCardClick = (place) => {
    navigate("/cities", { state: { city: place.name } }); // Şehir adını state olarak gönder
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
                image={place.imageUrl || "https://via.placeholder.com/300"}
                alt={place.name}
                className="carousel-image"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {place.name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};