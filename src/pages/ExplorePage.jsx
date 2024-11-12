import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, Typography, Container } from "@mui/material";
import explore from "../images/explore/explore.webp";
import beaches from "../images/explore/beaches.webp";
import destinations from "../images/explore/destinations.webp";
import events from "../images/explore/events.webp";
import otels from "../images/explore/otels.webp";
import restaurants from "../images/explore/restaurants.webp";

const categories = [
  {
    title: "Konumlar",
    image: destinations,
    path: "/beaches",
    description: "Eşsiz manzaralara sahip popüler konumlarını keşfedin.",
  },
  {
    title: "Plajlar",
    image: beaches,
    path: "/historical",
    description: "Göz alıcı kumsallarda huzur dolu bir gün geçirin.",
  },
  {
    title: "Oteller",
    image: otels,
    path: "/nature",
    description: "Konforlu ve unutulmaz bir konaklama deneyimi yaşayın.",
  },
  {
    title: "Yapılacak Şeyler",
    image: events,
    path: "/events",
    description: "Şehrin sunduğu eğlenceli etkinlikleri kaçırmayın.",
  },
  {
    title: "Restoranlar",
    image: restaurants,
    path: "/historical",
    description: "Şehrin en iyi lezzet duraklarında yeni tatlar keşfedin.",
  },
  // Diğer kategoriler...
];

export const ExplorePage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      style={{
        padding: "0 16px",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "720px",
      }}
    >
      {/* Görsel */}
      <img
        src={explore}
        alt="Tourify Discover"
        style={{
          maxWidth: "1200px",
          height: "650px",
          marginBottom: "50px",
          marginTop: "50px",
          display: "block",
          marginTop: "51px",

        }}
      />

      {/* Başlık ve açıklama kısmı */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Tourify ile Dünyayı Keşfet
        </Typography>
        <Typography variant="subtitle1">
          Plajlardan tarihi eserlere, doğa harikalarına kadar birçok güzelliği
          keşfedin. Size uygun yeri seçin ve gezmeye başlayın!
        </Typography>
      </div>

      {/* Kategori Kartları */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          paddingBottom: "50px",
          width: "720px",
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.title}
            onClick={() => navigate(category.path)}
            style={{
              cursor: "pointer",
              height: "300px",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={category.image}
              alt={category.title}
              style={{
                filter: "brightness(50%)",
                borderRadius: "20px",
              }}
            />
            <Typography
              variant="h5"
              component="div"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontWeight: "bold",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              {category.title}
            </Typography>
          </Card>
        ))}
      </div>
    </Container>
  );
};
