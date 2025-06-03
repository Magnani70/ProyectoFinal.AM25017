import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

const Home = ({ productos, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [modalPurpose, setModalPurpose] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAgregarAlCarrito = (producto) => {
    if (!user) {
      setModalPurpose("cart");
      setShowModalLogin(true);
    } else {
      agregarAlCarrito(producto);
    }
  };

  const handleToggleFavorito = (producto) => {
    if (!user) {
      setModalPurpose("favorites");
      setShowModalLogin(true);
    } else {
      toggleFavorito(producto);
    }
  };

  const getModalMessage = () => {
    switch (modalPurpose) {
      case "cart":
        return "Para agregar productos al carrito necesitas iniciar sesión";
      case "favorites":
        return "Para guardar favoritos necesitas iniciar sesión";
      default:
        return "Necesitas iniciar sesión para esta acción";
    }
  };

  return (
    <div>
   {/* Hero Banner - Versión adaptable */}
<div className="bg-light py-5 px-3 d-flex flex-column flex-md-row align-items-center justify-content-center text-center text-md-start">
  <img
    src="src/img/oferta-black.png"
    alt="Banner Promocional"
    className="img-fluid rounded shadow-sm mb-4 mb-md-0 me-md-5"
    style={{ maxWidth: "25%" }}
  />
  <div>
    <h2 className="fw-bold mb-2">¡Ofertas de temporada!</h2>
    <p className="mb-3">Hasta 40% de descuento en productos seleccionados</p>
    <Button variant="danger" size="lg" onClick={() => navigate("/ofertas")}>
      Ver más
    </Button>
  </div>
</div>

      {/* Destacados */}
      <Container className="mb-5">
        <h2 className="text-center mb-4">Destacados</h2>
        {productos.length === 0 ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Cargando productos...</p>
          </div>
        ) : (
          <Row>
            {productos.slice(0, 4).map((producto) => (
              <Col key={producto.id} md={3} sm={6} xs={12} className="mb-4">
                <ProductCard
                  producto={producto}
                  handleAgregarAlCarrito={handleAgregarAlCarrito}
                  handleToggleFavorito={handleToggleFavorito}
                  favoritos={favoritos}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Todos los productos */}
      <Container className="mb-5">
        <h2 className="text-center mb-4">Todos los productos</h2>
        <Row>
          {productos.map((producto) => (
            <Col key={producto.id} md={3} sm={6} xs={12} className="mb-4">
              <ProductCard
                producto={producto}
                handleAgregarAlCarrito={handleAgregarAlCarrito}
                handleToggleFavorito={handleToggleFavorito}
                favoritos={favoritos}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal login */}
      <Modal show={showModalLogin} onHide={() => setShowModalLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{getModalMessage()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalLogin(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => navigate("/login")}>Ir a login</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

{/* Modal producto agregado */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <>
              <p>"{productoSeleccionado.title}" se ha agregado al carrito.</p>
              <div className="text-center">
                <img
                  src={productoSeleccionado.image}
                  alt={productoSeleccionado.title}
                  style={{ height: "100px", objectFit: "contain" }}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Seguir comprando</Button>
          <Button variant="primary" onClick={() => navigate("/carrito")}>Ver carrito</Button>
        </Modal.Footer>
      </Modal>

const ProductCard = ({ producto, handleAgregarAlCarrito, handleToggleFavorito, favoritos }) => (
  <Card className="h-100 shadow-sm">
    <div style={{ position: "relative" }}>
      <Card.Img
        variant="top"
        src={producto.image}
        alt={producto.title}
        style={{ height: "200px", objectFit: "contain", padding: "10px" }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "red",
          cursor: "pointer",
          fontSize: "1.3rem",
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "5px",
        }}
        onClick={() => handleToggleFavorito(producto)}
      >
        {favoritos.find((p) => p.id === producto.id) ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
    <Card.Body className="d-flex flex-column">
      <Card.Title style={{ fontSize: "1rem" }}>{producto.title}</Card.Title>
      <Card.Text>
        <strong>${producto.price}</strong>
      </Card.Text>
      <Button variant="success" className="mt-auto" onClick={() => handleAgregarAlCarrito(producto)}>
        Agregar
      </Button>
    </Card.Body>
  </Card>
);

export default Home;
