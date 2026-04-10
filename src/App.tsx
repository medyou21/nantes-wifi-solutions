import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}