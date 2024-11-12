import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "./OurChoices.css";
import secim1 from "../../images/cities/switzerland.jpg"
import secim2 from "../../images/cities/france.jpg"
import secim3 from "../../images/cities/bali.jpg"

export const OurChoices = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Mekanların bilgileri
  const places = [
    {
      name: "İsviçre",
      description: "Muhteşem dağları ve gölleri ile ünlü.",
      details: "İsviçre, Avrupa’nın kalbinde yer alan, zengin doğal güzellikleri ve yüksek yaşam standartları ile ünlü bir ülkedir. Alpler ve Jura dağları arasında yer alan İsviçre, kayak ve doğa sporları tutkunlarının vazgeçilmez adresidir. Ayrıca, büyüleyici göller, temiz havası ve düzenli şehir yapısıyla dikkat çeker. Zürih, Cenevre ve Basel gibi şehirler sanat, kültür ve tarih açısından zengindir. İsviçre, aynı zamanda saatçilik, çikolata ve bankacılık sektörlerindeki başarısıyla dünya çapında tanınır.",
      image: secim1,
    },
    {
      name: "Fransa",
      description: "Sanat, moda ve lezzetli yemeklerin ülkesi.",
      details: "Fransa, tarih boyunca Avrupa’nın kültür, moda ve gastronomi merkezi olarak anılmış bir ülkedir. Başkenti Paris, ‘Aşk Şehri’ olarak bilinir ve Eyfel Kulesi, Louvre Müzesi, Notre Dame Katedrali gibi dünya mirası yerleriyle ünlüdür. Fransa, şarapçılığı, peynir çeşitleri ve mutfak sanatıyla öne çıkar. Provence’in lavanta tarlaları, Alsace’in pitoresk köyleri ve Cote d’Azur’un sahilleri gibi farklı bölgesel güzelliklere de ev sahipliği yapar. Fransız Rivierası, Cannes Film Festivali ile dünyanın dört bir yanından turistleri kendine çeker.",
      image: secim2,
    },
    {
      name: "Bali",
      description: "Tropikal güzellikler ve kültürel çeşitlilik adası.",
      details: "Bali, Endonezya’nın en popüler turistik adalarından biridir ve tropikal iklimi, eşsiz plajları, mistik tapınakları ve zengin kültürel çeşitliliği ile bilinir. Bali, sadece güneş ve deniz tatilcileri için değil, aynı zamanda ruhsal arayış içinde olanlar için de bir cennettir. Ubud’daki pirinç terasları, yoga ve meditasyon merkezleri, Bali’yi bir yenilenme ve huzur noktası haline getirir. Sanat ve el sanatları ile ünlü olan bu ada, Bali halkının kendine özgü yaşam tarzını ve geleneklerini yansıtan festival ve ritüellerle doludur. Ayrıca, dalış ve şnorkelle keşfedilebilecek mercan resifleri ve egzotik su altı yaşamıyla da dikkat çeker.",
      image: secim3,
    },
];

  // Dialog'u açma
  const handleOpen = (place) => {
    setSelectedPlace(place);
    setOpen(true);
  };

  // Dialog'u kapama
  const handleClose = () => {
    setOpen(false);
    setSelectedPlace(null);
  };

  return (
    <div className="our-choices">
      <h1>Bizim seçimlerimiz</h1>
      <div className="our-choices-container">
        {places.map((place, index) => (
          <Card
            key={place.name}
            className="place-card"
            onClick={() => handleOpen(place)}
          >
            <CardMedia
              component="img"
              alt={place.name}
              image={place.image}
              style={{ height: 300, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {place.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {place.description}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Dialog (Popup) */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedPlace?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{selectedPlace?.details}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Kapat
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
