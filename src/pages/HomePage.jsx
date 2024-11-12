import React from "react";
import Header from "../components/homepage/Header";
import { Video } from "../components/homepage/Video";
import { Search } from "../components/homepage/Search";
import { CategoryCards } from "../components/homepage/CategoryCards";
import { OurChoices } from "../components/homepage/OurChoices";
import { OtherPlaces } from "../components/homepage/OtherPlaces";
import { Footer } from "../components/homepage/Footer";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Video/>
      <Search/>
      <CategoryCards/>
      <OurChoices/>
      <OtherPlaces/>
      <Footer/>
    </div>
  );
};
