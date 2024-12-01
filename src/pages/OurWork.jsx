import React from 'react';
import { Box, Typography } from '@mui/material';
import TourifyWorkImage from '../assets/calismalarimiz.webp'; // Görselinizin doğru yolunu yazın

export const OurWork = () => {
  return (
    <Box
      sx={{
        minHeight: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
        backgroundColor: '#f7f9fc', // Arka plan rengi
      }}
    >
      {/* Başlık */}
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          color: '#2F4F4F',
          fontFamily: 'Roboto, sans-serif',
          letterSpacing: '1.5px',
        }}
      >
        Çalışmalarımız
      </Typography>

      {/* Açıklama */}
      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: '#555555',
          maxWidth: '600px',
          fontSize: '18px',
          lineHeight: '1.6',
        }}
      >
        Tourify ile kullanıcılarımız için keşif deneyimini geliştirmek amacıyla modern, erişilebilir ve etkileyici çözümler sunuyoruz. 
        Misyonumuz, seyahat planlamasını keyifli ve kolay hale getirmek. İşte bu tutku ile yaptığımız çalışmalar!
      </Typography>

      {/* Görsel */}
      <Box
        sx={{
          width: '80%',
          maxWidth: '800px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={TourifyWorkImage}
          alt="Çalışmalarımız"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>
    </Box>
  );
};

export default OurWork;