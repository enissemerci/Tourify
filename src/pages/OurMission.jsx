import React from "react";
import { Box, Typography } from "@mui/material";

const OurMission = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
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
          }}
        >
          Misyonumuz
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Tourify ile Amacımız, seyahat etmeyi herkes için daha kolay, eğlenceli ve
          erişilebilir hale getirmek. Seyahat etmeyi seven insanlar için ilham
          kaynağı olmak, yeni yerler keşfetmelerine yardımcı olmak ve unutulmaz
          anılar biriktirmelerine katkıda bulunmak öncelikli hedeflerimiz arasında.
          Gittiğiniz her yerde en iyi restoranları, otelleri ve gezi noktalarını
          sizin için bulmak ve deneyimlerinizi daha anlamlı kılmak için buradayız.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#555",
            fontFamily: "Roboto, sans-serif",
            mt: 2,
          }}
        >
          Dünyayı keşfetmek için Tourify'ı kullanın ve seyahatinizi unutulmaz bir
          yolculuğa dönüştürün!
        </Typography>
      </Box>
    </Box>
  );
};

export default OurMission;