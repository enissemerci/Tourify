import React from 'react';
import { Box, Typography } from '@mui/material';
import WhoWeAreImage from '../assets/citiesbanner.webp'; // Görselinizin doğru yolunu yazın

export const WhoWeAre = () => {
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
        Biz Kimiz?
      </Typography>

      {/* Açıklama */}
      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: '#555555',
          maxWidth: '700px',
          fontSize: '18px',
          lineHeight: '1.6',
        }}
      >
        Tourify, seyahat etmek isteyenlerin dünyayı keşfetmesini kolaylaştıran bir platformdur. 
        Tutkumuz, kullanıcılarımıza benzersiz seyahat deneyimleri yaşatmak ve ihtiyaç duydukları her 
        konuda onlara rehberlik etmektir. 
        <br />
        <br />
        Modern teknolojiyi ve yaratıcı fikirleri bir araya getirerek, gezginlere ilham veren ve 
        keşfetmenin keyfini artıran çözümler sunuyoruz. Her adımımızda, kullanıcılarımızın 
        ihtiyaçlarını göz önünde bulundurarak, onların güvenini ve mutluluğunu öncelik haline getiriyoruz.
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
          src={WhoWeAreImage}
          alt="Biz Kimiz"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        />
      </Box>

      {/* Ek Yazı */}
      <Typography
        variant="h6"
        sx={{
          mt: 5,
          fontWeight: '500',
          color: '#777777',
          fontFamily: 'Roboto, sans-serif',
          fontStyle: 'italic',
        }}
      >
        "Keşfetmek bizim işimiz. Seyahat etmek, sizin."
      </Typography>
    </Box>
  );
};

export default WhoWeAre;