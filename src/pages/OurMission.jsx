import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const OurMission = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?travel')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Şeffaf beyaz arka plan
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#2F4F4F",
            fontFamily: "Roboto, sans-serif",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Hafif bir gölge
          }}
        >
          Misyonumuz
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#444",
            fontFamily: "Roboto, sans-serif",
            mb: 3,
          }}
        >
          Tourify ile amacımız, seyahat etmeyi herkes için daha kolay, eğlenceli ve
          erişilebilir hale getirmek. Seyahat etmeyi seven insanlar için ilham
          kaynağı olmak, yeni yerler keşfetmelerine yardımcı olmak ve unutulmaz
          anılar biriktirmelerine katkıda bulunmak öncelikli hedeflerimiz arasında.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#444",
            fontFamily: "Roboto, sans-serif",
            mb: 3,
          }}
        >
          Dünyayı keşfetmek için Tourify'ı kullanın ve seyahatinizi unutulmaz bir
          yolculuğa dönüştürün!
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/explore"
          sx={{
            mt: 3,
            backgroundColor: "#2F4F4F",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3a5a5a",
            },
          }}
        >
          Daha Fazlasını Keşfedin
        </Button>
      </Box>
    </Box>
  );
};

export default OurMission;