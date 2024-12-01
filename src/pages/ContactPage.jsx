import React from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

export const ContactPage = ({ bgImage }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        p: 4,
        color: "white",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Şeffaf bir arka plan
          borderRadius: "8px",
          padding: 4,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
          İletişim
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Bizimle iletişime geçmek için aşağıdaki formu doldurun veya iletişim
          bilgilerimizi kullanarak bize ulaşın.
        </Typography>
        <Grid container spacing={3}>
          {/* Form Alanı */}
          <Grid item xs={12} md={6}>
            <Box component="form">
              <TextField
                fullWidth
                label="Adınız"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                label="E-posta Adresiniz"
                variant="outlined"
                margin="normal"
                sx={{
                  backgroundColor: "white",
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
                  backgroundColor: "white",
                  borderRadius: "4px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                }}
              >
                Gönder
              </Button>
            </Box>
          </Grid>
          {/* İletişim Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              İletişim Bilgileri
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Adres: Örnek Mahallesi, Sokak No: 123, İstanbul
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Telefon: +90 555 555 55 55
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              E-posta: info@ornekdomain.com
            </Typography>
            <Typography variant="body1">
              Çalışma Saatleri: Hafta içi 09:00 - 18:00
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage; 