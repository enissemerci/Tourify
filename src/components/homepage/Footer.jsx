import React from "react";
import "./Footer.css";
import logo from "../../images/logoB.png";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-descriptions">
        <img
          src={logo}
          alt="Tourify Logo"
          className="logo"
          height={200}
          width={200}
        />
        <div className="footer-descriptions-about-us">
          Tourify Hakkında
          <a href="/">Biz Kimiz</a>
          <a href="/target">Hedef ve Misyonumuz</a>
          <a href="/calısmalarımız">Çalışmalarımız</a>
          <a href="/contact">İletişim</a>
        </div>
        <div className="footer-descriptions-explore">
          Keşfedin
          <a href="/restaurants">Şehirler</a>
          <a href="">Oteller</a>
          <a href="/cities">Restoranlar</a>
          <a href="/events">Etkinlikler</a>
        </div>
      </div>
      <div className="footer-socials">
        <p>
          Bir sonraki seyahatinizde size rehberlik etmekten mutluluk duyarız.
          Keşfetmek istediğiniz her yerin detaylarını Tourify’da bulabilir,
          kültür, lezzet ve macera dolu bir yolculuğa bizimle çıkabilirsiniz.
          İster şehirlerin tarihi dokusunu, ister modern hayatın dinamiklerini
          deneyimlemek isteyin; Tourify her adımda yanınızda.
        </p>
        <div className="icons">
          <IconButton
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            sx={{ color: "white" }}
          >
            <Facebook fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            sx={{ color: "white" }}
          >
            <Instagram fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            sx={{ color: "white" }}
          >
            <Twitter fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            sx={{ color: "white" }}
          >
            <LinkedIn fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
