import React from 'react';
import { Box, Typography, Container, Divider, Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const restaurantData = [
  {
    name: "Lezzet Durağı",
    address: "İstiklal Caddesi No:34, Beyoğlu, İstanbul",
    image: "https://via.placeholder.com/100",
    description: "Türk mutfağının eşsiz lezzetlerini sunan, tarihi bir restorandır."
  },
  {
    name: "Gurme Mutfağı",
    address: "Barbaros Bulvarı No:45, Beşiktaş, İstanbul",
    image: "https://via.placeholder.com/100",
    description: "Modern dokunuşlarla hazırlanan dünya mutfağı lezzetlerini deneyimleyin."
  },
  {
    name: "Deniz Kenarı Balıkçısı",
    address: "Kordonboyu No:12, Kadıköy, İstanbul",
    image: "https://via.placeholder.com/100",
    description: "Deniz ürünlerinin en tazelerini bulabileceğiniz keyifli bir balık restoranı."
  },
  {
    name: "Vegan Rüzgarı",
    address: "Bağdat Caddesi No:78, Kadıköy, İstanbul",
    image: "https://via.placeholder.com/100",
    description: "Vegan ve sağlıklı yaşam tarzını benimseyenler için ideal bir restoran."
  }
];

export default function Restaurants() {
  const navigate = useNavigate();

  const handleClick = (restaurantName) => {
    // Tıklanan restoranın adına göre bir yönlendirme yapılabilir
    navigate(`/restaurant/${restaurantName}`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Restoranlar
      </Typography>
      <List>
        {restaurantData.map((restaurant, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start" button onClick={() => handleClick(restaurant.name)}>
              <ListItemAvatar>
                <Avatar
                  alt={restaurant.name}
                  src={restaurant.image}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6">{restaurant.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      {restaurant.address}
                    </Typography>
                    <Typography variant="body2">
                      {restaurant.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < restaurantData.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Container>
  );
}