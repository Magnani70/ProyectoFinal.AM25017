import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

const Mujer = ({ productos, loading, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const productosMujer = productos.filter(
    (producto) => producto.category === "women's clothing"
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

  return (
    <Container className="mt-4">
      <h1 className="fw-bold text-success">Ropa de Mujer</h1>
      <Row>
        {productosMujer.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={producto.image}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div
                  className="position-absolute top-0 end-0 p-2"
                  style={{ cursor: "pointer", fontSize: "1.5rem", color: "red" }}
                  onClick={() => handleToggleFavorito(producto)}
                >
                  {favoritos.find((p) => p.id === producto.id) ? <FaHeart /> : <FaRegHeart />}
                </div>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Seguir comprando
          </Button>
          <Button variant="success" onClick={() => navigate("/carrito")}>Ver carrito</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal login requerido */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Debes iniciar sesión para realizar esta acción.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>Cancelar</Button>
          <Button variant="success" onClick={() => navigate("/login")}>Iniciar sesión</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Mujer;
