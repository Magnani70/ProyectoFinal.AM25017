import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from '../components/AuthContext';

const Home = ({ productos, agregarAlCarrito, favoritos, toggleFavorito }) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [modalPurpose, setModalPurpose] = useState(null);
  const navigate = useNavigate();
  const {user  } = useAuth();


  const handleAgregarAlCarrito = (producto) => {
    if (!user) {
      setModalPurpose('cart');
      setShowModalLogin(true);
    } else {
      agregarAlCarrito(producto);
    }
  };

  const handleToggleFavorito = (producto) => {
    if (!user) {
      setModalPurpose('favorites');
      setShowModalLogin(true);
    } else {
      toggleFavorito(producto);
    }
  };

  const getModalMessage = () => {
    switch(modalPurpose) {
      case 'cart': return "Para agregar productos al carrito necesitas iniciar sesión";
      case 'favorites': return "Para guardar favoritos necesitas iniciar sesión";
      default: return "Necesitas iniciar sesión para esta acción";
    }
  };

  return (
    <Container className="mt-4">
      <h1>Bienvenido AMventas </h1>
      <Row>
        {productos.map((producto) => (
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
                <Card.Text>{producto.description.substring(0, 60)}...</Card.Text>
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
          <Button variant="primary" onClick={() => navigate("/login")}>
            Ir a login
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;