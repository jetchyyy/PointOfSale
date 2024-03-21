import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Helmets from "./components/Helmets";
import Shoes from "./components/Shoes";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/helmets" element={<Helmets/>} />
          <Route path="/shoes" element={<Shoes/>} />
        </Routes>
      </Container>
      
    </ShoppingCartProvider>
    
  );
}

export default App;
