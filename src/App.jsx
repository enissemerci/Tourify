import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import { HomePage } from "./pages/HomePage";
import { CityPage } from "./pages/CityPage";
import { RestaurantPage } from "./pages/RestaurantPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactPage } from "./pages/ContactPage";
import { PastTravelsPage } from "./pages/PastTravelsPage";
import { ExplorePage } from "./pages/ExplorePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Cities } from "./pages/Cities";
import { Events } from "./pages/Events";
import { Footer } from "./components/homepage/Footer";
import { MainHeader } from "./components/MainHeader";
import Restaurants from "./pages/Restaurants";


function MainLayout() {
  const location = useLocation();

  return (
    <div>
      {/* Ana sayfa dışında MainHeader'ı göster */}
      {location.pathname !== "/" && <MainHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/city/:cityName" element={<CityPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:restaurantName"  element={<RestaurantPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/past-travels" element={<PastTravelsPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;