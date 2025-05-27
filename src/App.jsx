import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Tecnologia from './pages/Tecnologia';
import Contact from './pages/contact';
import Footer from './pages/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Novedades from './pages/Novedades';
import Mujer from './pages/Mujer';
import Hombre from './pages/Hombre';
import Joyeria from './pages/Joyeria';
import Carrito from './pages/Carrito';
import Favoritos from './pages/Favoritos';
import Login from './components/Login'; 
import { AuthProvider } from './components/AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; 
import Perfil from './pages/Perfil'; 

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.filter((p) => p.id !== producto.id);
      } else {
        return [...prev, producto];
      }
    });
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error de carga de API", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
    <AuthProvider> {/* Envuelve toda la aplicación con AuthProvider */}
      <Router>
        <NavBar carrito={carrito} />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home productos={productos} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
          <Route path="/tecnologia" element={<Tecnologia productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/novedades" element={ <Novedades productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
          <Route path="/perfil" element={ <PrivateRoute><Perfil /></PrivateRoute>} />
          <Route path="/hombre" element={<Hombre productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
          <Route path="/joyeria" element={  <Joyeria productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} /> } />
          <Route path="/mujer" element={  <Mujer productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} /> } />
          <Route path="/carrito" element={ <PrivateRoute><Carrito carrito={carrito} agregarAlCarrito={agregarAlCarrito} setCarrito={setCarrito} /> </PrivateRoute> } />
          <Route path="/favoritos" element={ <PrivateRoute> <Favoritos favoritos={favoritos} setFavoritos={setFavoritos} /> </PrivateRoute> } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;