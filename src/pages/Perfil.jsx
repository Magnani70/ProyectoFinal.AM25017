import React from 'react';
import { Container, Card, Button, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Perfil = ({ user, carrito, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">Mi Perfil</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Email:</strong> {user?.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Miembro desde:</strong> {new Date().toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>

          <div className="d-grid gap-2 mt-3">
            <Button 
              variant="danger" 
              onClick={handleLogout}
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-box-arrow-right"></i>
              Cerrar sesión
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h5">Productos Comprados</Card.Header>
        <Card.Body>
          {carrito.length === 0 ? (
            <p>No has comprado productos aún.</p>
          ) : (
            <Row>
              {carrito.map((producto, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card>
                    <Image src={producto.image} alt={producto.title} fluid className="p-3" style={{ height: '200px', objectFit: 'contain' }} />
                    <Card.Body>
                      <Card.Title>{producto.title}</Card.Title>
                      <Card.Text><strong>${producto.price}</strong></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil;
