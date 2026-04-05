import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingModalProvider } from "./context/BookingModalContext";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <LanguageProvider>
      <BookingModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="products" element={<Products />} />
              <Route path="team" element={<Team />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingModalProvider>
    </LanguageProvider>
  );
}
