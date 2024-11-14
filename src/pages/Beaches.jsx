// Beaches.jsx
import React from 'react';
import { Box, Typography, Container, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const beachData = [
  {
    name: "Altınkum Plajı",
    address: "Alaçatı, Çeşme, İzmir",
    image: "https://via.placeholder.com/100",
    description: "Ege'nin en güzel plajlarından biri olan Altınkum, altın sarısı kumları ile ünlüdür.",
    naturalBeauty: "Altın sarısı kumlar ve berrak deniz",
    phone: "0232 123 45 67",
    rating: "4.8 / 5"
  },
  {
    name: "Kaputaş Plajı",
    address: "Kaş, Antalya",
    image: "https://via.placeholder.com/100",
    description: "Turkuaz rengi denizi ve doğal güzellikleri ile ünlü olan bu plaj, doğa harikası olarak bilinir.",
    naturalBeauty: "Turkuaz deniz ve kayalık çevre",
    phone: "0242 987 65 43",
    rating: "4.9 / 5"
  },
  {
    name: "Patara Plajı",
    address: "Patara, Kaş, Antalya",
    image: "https://via.placeholder.com/100",
    description: "Uzun kumsalı ve antik kalıntıları ile ünlü, Türkiye'nin en uzun plajlarından biridir.",
    naturalBeauty: "Tarihi kalıntılar ve uzun kumsal",
    phone: "0242 456 78 90",
    rating: "4.7 / 5"
  },
  {
    name: "İztuzu Plajı",
    address: "Dalyan, Muğla",
    image: "https://via.placeholder.com/100",
    description: "Caretta caretta kaplumbağalarının koruma alanı olarak bilinen bir doğa harikasıdır.",
    naturalBeauty: "Koruma alanı ve doğa harikası",
    phone: "0252 654 32 10",
    rating: "4.6 / 5"
  }
];

export default function Beaches() {
  const navigate = useNavigate();

  const handleClick = (beach) => {
    navigate(`/beach/${beach.name}`, { state: { beach } });
  };

  return (
    <Container style={{minHeight:"720px"}}>
      <Typography variant="h4" align="center" gutterBottom>
        Plajlar
      </Typography>
      <List>
        {beachData.map((beach, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start" component="div" onClick={() => handleClick(beach)} style={{ cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar
                  alt={beach.name}
                  src={beach.image}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" component="span">{beach.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {beach.address}
                    </Typography>
                    <Typography variant="body2" component="span">
                      {beach.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < beachData.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Container>
  );
}