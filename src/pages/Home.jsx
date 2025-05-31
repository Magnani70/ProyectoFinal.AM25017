import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Carousel, Spinner,} from "react-bootstrap";
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

  const renderCarrusel = (productosCarrusel) => {
    return (
      <Carousel fade interval={4000} className="mb-4">
        {productosCarrusel.map((producto, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={producto.image}
              alt={producto.title}
              style={{
                height: "50vh",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
              }}
            />
            <Carousel.Caption>
              <h5
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: "5px",
                  borderRadius: "8px",
                }}
              >
                {producto.title}
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  const renderTarjetas = (productosTarjetas) => {
    return (
      <Row className="mb-5">
        {productosTarjetas.map((producto) => (
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
                  padding: "5px",
                }}
                onClick={() => handleToggleFavorito(producto)}
              >
                {favoritos.find((p) => p.id === producto.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: "16px" }}>
                  {producto.title}
                </Card.Title>
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
    );
  };

  const renderSeccionCategoria = (titulo, categoria) => {
    const productosCategoria = productos.filter(
      (p) => p.category === categoria
    );
    if (productosCategoria.length < 3) return null;

    const tresParaCarrusel = productosCategoria.slice(0, 3);
    const tresParaTarjetas = productosCategoria.slice(0, 3);

    return (
      <div className="mb-5" key={categoria}>
        {renderCarrusel(tresParaCarrusel)}
        {renderTarjetas(tresParaTarjetas)}
      </div>
    );
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-5 text-center">Bienvenido a AMventas</h1>

      {!productos || productos.length === 0 ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      ) : (
        <>
          {renderSeccionCategoria("Ropa de Hombre", "men's clothing")}
          {renderSeccionCategoria("Ropa de Mujer", "women's clothing")}
          {renderSeccionCategoria("Joyas", "jewelery")}
          {renderSeccionCategoria("Tecnología", "electronics")}
        </>
      )}

      {/* Modal de login */}
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
