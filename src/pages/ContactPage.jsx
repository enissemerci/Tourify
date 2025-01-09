import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

export const ContactPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9", // Beyaz ağırlıklı bir arka plan
        minHeight: "100vh",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: 5,
          maxWidth: "900px",
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#2F4F4F",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          İletişim
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 4,
            color: "#666",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          Bizimle iletişime geçmek için aşağıdaki formu doldurun veya iletişim
          bilgilerimizi kullanarak bize ulaşın.
        </Typography>
        <Grid container spacing={4}>
          {/* Form Alanı */}
          <Grid item xs={12} md={6}>
            <Box component="form">
              <TextField
                fullWidth
                label="Adınız"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: "#f7f7f7",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                label="E-posta Adresiniz"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: "#f7f7f7",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                label="Mesajınız"
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
                sx={{
                  backgroundColor: "#f7f7f7",
                  borderRadius: "4px",
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: "#2F4F4F",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3a5a5a",
                  },
                }}
              >
                Gönder
              </Button>
            </Box>
          </Grid>
          {/* İletişim Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "#2F4F4F",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              İletişim Bilgileri
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#444",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              <strong>Adres:</strong> Ahmet Karadeniz Yerleşkesi, Trakya Üniversitesi, 22020 Merkez/Edirne Merkez/Edirne
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#444",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              <strong>Telefon:</strong> +90 537 741 72 18
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#444",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              <strong>E-posta:</strong> info@tourify.com
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage;