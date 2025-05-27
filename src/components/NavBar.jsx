import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container, Modal, Button, ListGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from './AuthContext';


const NavBar = ({ carrito }) => {
  const [showCarrito, setShowCarrito] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMostrarCarrito = () => setShowCarrito(true);
  const handleCerrarCarrito = () => setShowCarrito(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Mi Sitio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {/* Menú principal */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/hombre">Hombre</Nav.Link>
              <Nav.Link as={Link} to="/mujer">Mujer</Nav.Link>
              <Nav.Link as={Link} to="/joyeria">Joyeria</Nav.Link>
              <Nav.Link as={Link} to="/tecnologia">Tecnología</Nav.Link>
              <Nav.Link as={Link} to="/novedades">Novedades</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            </Nav>

            {/* Íconos a la derecha */}
            <Nav className="ms-auto d-flex align-items-center gap-3">
              <Nav.Link as={Link} to="/favoritos" title="Favoritos">
                <FaHeart size={20} />
              </Nav.Link>

              <Nav.Link onClick={handleMostrarCarrito} title="Carrito">
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
                    <Dropdown.Item as={Link} to="/perfil">
                      Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Cerrar sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  Iniciar sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal del carrito */}
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
          <Button variant="primary" as={Link} to="/carrito" onClick={handleCerrarCarrito}>
            Ver carrito completo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;