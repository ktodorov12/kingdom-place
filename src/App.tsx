import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="services" element={<Home />} />
          <Route path="team" element={<Home />} />
          <Route path="contact" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
