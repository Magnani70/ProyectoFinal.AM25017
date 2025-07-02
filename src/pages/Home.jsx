import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Carousel,
  Form,
} from "react-bootstrap";
import {
  FaHeart,
  FaRegHeart,
  FaTruck,
  FaTag,
  FaBolt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../components/AuthContext";
import ProductCardReusable from "../components/ProductCardReusable";


const Home = ({
  productos,
  agregarAlCarrito,
  favoritos,
  toggleFavorito,
}) => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalPurpose, setModalPurpose] = useState(null);
  const [showPostalModal, setShowPostalModal] = useState(false);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [mensajeEnvio, setMensajeEnvio] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAgregarAlCarrito = (producto) => {
    if (!user) {
      setModalPurpose("cart");
      setShowModalLogin(true);
    } else {
      agregarAlCarrito(producto);
      setProductoSeleccionado(producto);
      setShowCartModal(true);
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

  const handlePostalSubmit = () => {
    if (codigoPostal.trim() === "") return;
    setMensajeEnvio(`Tu pedido llegaría en 3 a 5 días hábiles a ${codigoPostal}`);
  };

  const destacados = productos.slice(0, 4);
  const recomendados = productos.slice(4, 8);
  const tecnologia = productos.filter(p => p.category === "technology").slice(0, 4);

  return (
    <div className="bg-light">
      {/* Banner principal */}
      <div className="bg-dark text-white text-center py-5 shadow-lg">
        <h1 className="display-5 fw-bold">¡Bienvenido AMventas!</h1>
        <p className="lead">Las mejores ofertas, productos únicos y envíos rápidos</p>
        <Button variant="warning" size="lg" onClick={() => navigate("/ofertas")}>
          Ver ofertas exclusivas →
        </Button>
      </div>

      {/* Iconos de accesos rápidos */}
      <Container className="py-4 text-center">
        <Row className="text-muted">
          <FeatureIcon icon={<FaTruck />} label="Envío Gratis" onClick={() => setShowPostalModal(true)} />
          <FeatureIcon icon={<FaTag />} label="Ofertas" onClick={() => navigate("/ofertas")} />
          <FeatureIcon icon={<FaBolt />} label="Novedades" onClick={() => navigate("/novedades")} />
          <FeatureIcon icon={<FaUser />} label="Mi Cuenta" onClick={() => navigate("/perfil")} />
        </Row>
      </Container>

      {/* Sección destacada */}
      <SectionTitle title="🔥 Productos Destacados" />
      <ProductGrid
        productos={destacados}
        handleAgregarAlCarrito={handleAgregarAlCarrito}
        handleToggleFavorito={handleToggleFavorito}
        favoritos={favoritos}
      />

      {/* Recomendados */}
      <SectionTitle title="✨ Recomendados para ti" />
      <ProductGrid
        productos={recomendados}
        handleAgregarAlCarrito={handleAgregarAlCarrito}
        handleToggleFavorito={handleToggleFavorito}
        favoritos={favoritos}
      />

      {/* Tecnología */}
      {tecnologia.length > 0 && (
        <>
          <SectionTitle title="💻 Tecnología en oferta" />
          <ProductGrid
            productos={tecnologia}
            handleAgregarAlCarrito={handleAgregarAlCarrito}
            handleToggleFavorito={handleToggleFavorito}
            favoritos={favoritos}
          />
        </>
      )}

      {/* Modal: Iniciar sesión */}
      <Modal show={showModalLogin} onHide={() => setShowModalLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {modalPurpose === "cart"
              ? "Para agregar productos al carrito necesitas iniciar sesión"
              : "Para guardar favoritos necesitas iniciar sesión"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalLogin(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => navigate("/login")}>
            Ir a login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal: Producto agregado */}
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {productoSeleccionado && (
            <>
              <p><strong>{productoSeleccionado.title}</strong> fue agregado al carrito.</p>
              <img
                src={productoSeleccionado.image}
                alt={productoSeleccionado.title}
                style={{ height: "100px", objectFit: "contain" }}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Seguir comprando
          </Button>
          <Button variant="success" onClick={() => navigate("/carrito")}>
            Ver carrito
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal: Código Postal */}
      <Modal show={showPostalModal} onHide={() => setShowPostalModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Consulta de Envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Introduce tu código postal</Form.Label>
            <Form.Control
              type="text"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              placeholder="Ej: 1000"
            />
          </Form.Group>
          {mensajeEnvio && <p className="text-success">{mensajeEnvio}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostalModal(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handlePostalSubmit}>
            Consultar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// COMPONENTES AUXILIARES

const FeatureIcon = ({ icon, label, onClick }) => (
  <Col xs={6} md={3} className="pointer mb-3" onClick={onClick}>
    <div className="bg-white p-3 rounded shadow-sm h-100">
      <div className="text-primary fs-3">{icon}</div>
      <p className="mb-0 fw-semibold">{label}</p>
    </div>
  </Col>
);

const SectionTitle = ({ title }) => (
  <Container className="pt-4">
    <h4 className="fw-bold border-bottom pb-2 mb-4">{title}</h4>
  </Container>
);

const ProductGrid = ({
  productos,
  handleAgregarAlCarrito,
  handleToggleFavorito,
  favoritos,
}) => (
  <Container className="pb-4">
    <Row xs={1} sm={2} md={4} className="g-4">
      {productos.map((producto) => (
        <Col key={producto.id}>
        <ProductCardReusable
  producto={producto}
  handleAgregarAlCarrito={handleAgregarAlCarrito}
  handleToggleFavorito={handleToggleFavorito}
  favoritos={favoritos}
/>
        </Col>
      ))}
    </Row>
  </Container>
);

const ProductCard = ({
  producto,
  handleAgregarAlCarrito,
  handleToggleFavorito,
  favoritos,
}) => (
  <Card className="h-100 shadow-sm">
    <div className="position-relative">
      <Card.Img
        variant="top"
        src={producto.image}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div
        className="position-absolute top-0 end-0 p-2 text-danger"
        style={{ cursor: "pointer" }}
        onClick={() => handleToggleFavorito(producto)}
      >
        {favoritos.some((fav) => fav.id === producto.id) ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </div>
    </div>
    <Card.Body className="d-flex flex-column">
      <Card.Title style={{ fontSize: "1rem" }}>{producto.title}</Card.Title>
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
);

export default Home;
