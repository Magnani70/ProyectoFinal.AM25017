import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container, Modal, Button, ListGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

const NavBar = ({ carrito }) => {
  const [showCarrito, setShowCarrito] = useState(false);
  const [expanded, setExpanded] = useState(false); // ← para controlar el menú móvil
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMostrarCarrito = () => setShowCarrito(true);
  const handleCerrarCarrito = () => setShowCarrito(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLinkClick = () => {
    setExpanded(false); // ← cerrar menú al hacer clic
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}>
            AMventas
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/hombre" onClick={handleLinkClick}>Hombre</Nav.Link>
              <Nav.Link as={Link} to="/mujer" onClick={handleLinkClick}>Mujer</Nav.Link>
              <Nav.Link as={Link} to="/joyeria" onClick={handleLinkClick}>Joyeria</Nav.Link>
              <Nav.Link as={Link} to="/tecnologia" onClick={handleLinkClick}>Tecnología</Nav.Link>
              <Nav.Link as={Link} to="/novedades" onClick={handleLinkClick}>Novedades</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>Contacto</Nav.Link>
            </Nav>

            <Nav className="ms-auto d-flex align-items-center gap-3">
              <Nav.Link as={Link} to="/favoritos" onClick={handleLinkClick} title="Favoritos">
                <FaHeart size={20} />
              </Nav.Link>

              <Nav.Link onClick={() => { handleMostrarCarrito(); setExpanded(false); }} title="Carrito">
                <FaShoppingCart size={20} />
                {carrito.length > 0 && (
                  <span style={{ color: "white", marginLeft: "5px" }}>
                    ({carrito.length})
                  </span>
                )}
              </Nav.Link>

              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="dark" id="dropdown-user">
                    <FaUser className="me-1" />
                    {user.email.split('@')[0]}
                  </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/perfil" onClick={handleLinkClick}>
                        Mi Perfil
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/mis-productos" onClick={handleLinkClick}>
                        Mis Productos
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => { handleLogout(); setExpanded(false); }}>
                      <FaSignOutAlt className="me-2" />
                      Cerrar sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>   
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/login" onClick={handleLinkClick} className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  Iniciar sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showCarrito} onHide={handleCerrarCarrito} centered>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ListGroup>
              {carrito.map((producto, index) => (
                <ListGroup.Item key={index}>
                  <strong>{producto.title}</strong>
                  <div>Precio: ${producto.price}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarCarrito}>
            Cerrar
          </Button>
          <Button variant="success" as={Link} to="/carrito" onClick={() => {
            handleCerrarCarrito();
            setExpanded(false); // cierra el menú móvil si está abierto
          }}>
            Ver carrito completo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
