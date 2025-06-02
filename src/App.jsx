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
import { AuthProvider, useAuth } from './components/AuthContext'; 
import PrivateRoute from './components/PrivateRoute'; 
import Perfil from './pages/Perfil'; 

function AppContent() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { user, logout } = useAuth();

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

   // Cargar favoritos al iniciar sesión
  useEffect(() => {
    if (user) {
      const favoritosGuardados = localStorage.getItem(`favoritos_${user.email}`);
      if (favoritosGuardados) {
        setFavoritos(JSON.parse(favoritosGuardados));
      } else {
        setFavoritos([]);
      }
    } else {
      setFavoritos([]);
    }
  }, [user]);

  // Guardar favoritos al cambiar
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favoritos_${user.email}`, JSON.stringify(favoritos));
    }
  }, [favoritos, user]);

  // Cargar carrito al iniciar sesión
  useEffect(() => {
    if (user) {
      const carritoGuardado = localStorage.getItem(`carrito_${user.email}`);
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
      } else {
        setCarrito([]);
      }
    } else {
      setCarrito([]);
    }
  }, [user]);

  // Guardar carrito al cambiar
  useEffect(() => {
    if (user) {
      localStorage.setItem(`carrito_${user.email}`, JSON.stringify(carrito));
    }
  }, [carrito, user]);

  const agregarAlCarrito = (producto) => {
    if (!user) return;
    setCarrito((prev) => [...prev, producto]);
  };

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      return existe ? prev.filter((p) => p.id !== producto.id) : [...prev, producto];
    });
  };

  return (
    <>
      <NavBar carrito={carrito} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home productos={productos} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/tecnologia" element={<Tecnologia productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/novedades" element={<Novedades productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/perfil" element={<PrivateRoute> <Perfil user={user} carrito={carrito} logout={logout} /> </PrivateRoute>} />
        <Route path="/hombre" element={<Hombre productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/joyeria" element={<Joyeria productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/mujer" element={<Mujer productos={productos} loading={loading} agregarAlCarrito={agregarAlCarrito} favoritos={favoritos} toggleFavorito={toggleFavorito} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} agregarAlCarrito={agregarAlCarrito} setCarrito={setCarrito} />} />
        <Route path="/favoritos" element={<PrivateRoute><Favoritos favoritos={favoritos} setFavoritos={setFavoritos} /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
