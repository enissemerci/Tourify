// Hotels.jsx
import React from 'react';
import { Box, Typography, Container, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const hotelData = [
  {
    name: "Grand İstanbul Otel",
    address: "Taksim Meydanı, Beyoğlu, İstanbul",
    image: "https://via.placeholder.com/100",
    description: "İstanbul'un kalbinde yer alan lüks bir otel.",
    amenities: "Spa, havuz, şehir manzaralı odalar",
    phone: "0212 555 00 00",
    rating: "4.7 / 5"
  },
  {
    name: "Ege Denizi Tatil Köyü",
    address: "Çeşme, İzmir",
    image: "https://via.placeholder.com/100",
    description: "Deniz kenarında yer alan, doğa ile iç içe bir tatil köyü.",
    amenities: "Özel plaj, yüzme havuzu, restoran",
    phone: "0232 456 78 90",
    rating: "4.8 / 5"
  },
  {
    name: "Kapadokya Mağara Oteli",
    address: "Göreme, Nevşehir",
    image: "https://via.placeholder.com/100",
    description: "Kapadokya'nın eşsiz manzarasında, mağara odalar sunan otantik bir otel.",
    amenities: "Balon turu, teras, spa",
    phone: "0384 321 45 67",
    rating: "4.9 / 5"
  },
  {
    name: "Antalya Resort Otel",
    address: "Lara, Antalya",
    image: "https://via.placeholder.com/100",
    description: "Deniz kenarında lüks bir tatil deneyimi sunan otel.",
    amenities: "Aquapark, gece eğlenceleri, restoranlar",
    phone: "0242 789 65 43",
    rating: "4.6 / 5"
  }
];

function Hotels() {
  const navigate = useNavigate();

  const handleClick = (hotel) => {
    navigate(`/hotel/${encodeURIComponent(hotel.name)}`, { state: { hotel } });
  };

  return (
    <Container  style={{minHeight:"720px"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Oteller
      </Typography>
      <List>
        {hotelData.map((hotel, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start" component="div" onClick={() => handleClick(hotel)} style={{ cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar
                  alt={hotel.name}
                  src={hotel.image}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" component="span">{hotel.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {hotel.address}
                    </Typography>
                    <Typography variant="body2" component="span">
                      {hotel.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < hotelData.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Container>
  );
}

export default Hotels;