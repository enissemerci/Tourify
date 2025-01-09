import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Yönlendirme için
import "./CategoryCards.css";

import kategorişehir from "../../images/categoryCities.webp";
import kategorihotel from "../../images/categoryHotels.webp";
import kategorietkinlik from "../../images/categoryEvents.webp";
import kategorisahil from "../../images/categoryBeach.webp";

export const CategoryCards = () => {
  const navigate = useNavigate();

  // Kart tıklama fonksiyonu
  const handleCardClick = (index) => {
    if (index === 1) {
      navigate("/cities");
    } else if (index === 2) {
      navigate("/events");
    } else if (index === 3) {
      navigate("/restaurants");
    } else if (index === 4) {
      navigate("/beaches");
    }
  };

  const categories = [
    {
      name: "Şehirler",
      description: "Güzel şehirleri keşfedin",
      image: kategorişehir,
    },
    {
      name: "Etkinlikler",
      description: "Heyecan verici etkinlikler bulun",
      image: kategorietkinlik,
    },
    {
      name: "Restoranlar",
      description: "En iyi restoranları keşfedin",
      image: kategorihotel,
    },
    {
      name: "Sahiller",
      description: "Harika sahillerin tadını çıkarın",
      image: kategorisahil,
    },
  ];

  return (
    <>
      <h1 className="title">Kategorilerimiz</h1>
      <div className="category-cards-container">
        {categories.map((category, index) => (
          <Card
            className="category-card"
            onClick={() => handleCardClick(index + 1)}
            key={category.name}
          >
            <CardMedia
              component="img"
              alt={category.name}
              className="category-card-image"
              image={category.image}
            />
            <CardContent className="cardContent">
              <Typography
                variant="h6"
                component="div"
                align="center" // Başlığı ortalama
              >
                {category.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center" // Açıklamayı ortalama
              >
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};