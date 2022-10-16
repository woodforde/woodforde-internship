import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    duration: 800,
    once: true
  });


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorID" element={<Author />} />
        <Route path="/item-details/:itemID" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
