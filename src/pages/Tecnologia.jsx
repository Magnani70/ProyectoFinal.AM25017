import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Tecnologia = ({ productos, loading, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const productosTecnologia = productos.filter(p => p.category === "electronics");

  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Cargando tecnología...</p>
      </Container>
    );
  }

  return (
   <Container className="mt-4">
  <h1 className="mb-4 fw-bold text-success">Tecnología</h1>
  <Row>
    {productosTecnologia.map((producto) => (
      <Col key={producto.id} md={4} className="mb-4">
        <Card className="h-100 shadow-sm position-relative">
          <Card.Img
            variant="top"
            src={producto.image}
            style={{ height: "250px", objectFit: "contain" }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: "1.5rem",
              color: "red",
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleToggleFavorito(producto)}
          >
            {favoritos.find((p) => p.id === producto.id) ? <FaHeart /> : <FaRegHeart />}
          </div>
          <Card.Body className="d-flex flex-column">
            <Card.Title>{producto.title}</Card.Title>
            <Card.Text className="text-primary fw-bold">${producto.price}</Card.Text>
            <Button
              variant="success"
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

      {/* Modal de confirmación */}
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
          <Button variant="success" onClick={handleVerCarrito}>
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
          <Button variant="success" onClick={handleGoToLogin}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tecnologia;
