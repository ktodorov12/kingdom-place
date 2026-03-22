import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyBookCTA from "./StickyBookCTA";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyBookCTA />
    </div>
  );
}
