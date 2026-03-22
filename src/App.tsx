import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingModalProvider } from "./context/BookingModalContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";

export default function App() {
  return (
    <BookingModalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="team" element={<Home />} />
            <Route path="contact" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingModalProvider>
  );
}
