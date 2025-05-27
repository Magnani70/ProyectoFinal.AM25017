import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../components/AuthContext"; 

const Novedades = ({ productos, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const novedades = [...productos].sort((a, b) => b.id - a.id).slice(0, 6);
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // para saber si está logueado

  const handleAgregarAlCarrito = (producto) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setProductoSeleccionado(producto);
    setShowModal(true);
    agregarAlCarrito(producto);
  };

  const handleToggleFavorito = (producto) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    toggleFavorito(producto);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleVerCarrito = () => {
    setShowModal(false);
    navigate("/carrito");
  };
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleGoToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  return (
    <Container className="mt-4">
      <h1>Novedades</h1>
      <Row>
        {novedades.map((producto) => (
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

      {/* Modal confirmación */}
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

      {/* Modal login requerido */}
      <Modal show={showLoginModal} onHide={handleCloseLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Debes iniciar sesión para realizar esta acción.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGoToLogin}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Novedades;
