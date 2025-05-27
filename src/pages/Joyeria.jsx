import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Modal } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../components/AuthContext"; // Asegurate que sea tu path correcto

const Joyeria = ({ productos, loading, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // para saber si está logueado

  const productosJoyeria = productos.filter(
    (producto) => producto.category === "jewelery"
  );

  const handleAgregarAlCarrito = (producto) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setProductoSeleccionado(producto);
    setShowModal(true);
    agregarAlCarrito(producto);
  };

  const handleToggleFavorito = (producto) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    toggleFavorito(producto);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseLoginPrompt = () => setShowLoginPrompt(false);
  const handleVerCarrito = () => {
    setShowModal(false);
    navigate("/carrito");
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Joyeria</h1>
      <Row>
        {productosJoyeria.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card className="h-100 position-relative">
              <Card.Img
                variant="top"
                src={producto.image}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "5px"
                }}
                onClick={() => handleToggleFavorito(producto)}
              >
                {favoritos.find((p) => p.id === producto.id) ? <FaHeart /> : <FaRegHeart />}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "16px" }}>{producto.title}</Card.Title>
                <Card.Text>${producto.price}</Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleAgregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal producto agregado */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={handleVerCarrito}>
            Ver carrito
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de aviso para iniciar sesión */}
      <Modal show={showLoginPrompt} onHide={handleCloseLoginPrompt} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Debes iniciar sesión para realizar esta acción.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginPrompt}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Joyeria;
