import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Yönlendirme için
import "./CategoryCards.css";

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
      navigate("/");
    }
  };

  const categories = [
    {
      name: "Şehirler",
      description: "Explore beautiful cities",
      image: "/images/denemeG.png",
    },
    {
      name: "Etkinlikler",
      description: "Find exciting events",
      image: "/images/denemeG.png",
    },
    {
      name: "Restoranlar",
      description: "Discover top restaurants",
      image: "/images/denemeG.png",
    },
    {
      name: "Ev",
      description: "Back to the homepage",
      image: "/images/denemeG.png",
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
              <Typography variant="h6" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
