import React, { useEffect, useState } from 'react';
import { Container, Card, Button, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Perfil = ({ user, carrito, logout }) => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    foto: ''
  });

  // Cargar datos del perfil desde localStorage
  useEffect(() => {
    if (user?.email) {
      const datosGuardados = localStorage.getItem(`perfil_${user.email}`);
      if (datosGuardados) {
        setPerfil(JSON.parse(datosGuardados));
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return 'No especificado';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString();
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">Mi Perfil</Card.Header>
        <Card.Body>
          <div className="text-center mb-3">
            {perfil.foto ? (
              <Image
                src={perfil.foto}
                roundedCircle
                width={120}
                height={120}
                style={{ objectFit: 'cover', border: '2px solid #ddd' }}
              />
            ) : (
              <Image
                src="https://via.placeholder.com/120x120.png?text=Foto"
                roundedCircle
                width={120}
                height={120}
              />
            )}
          </div>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Nombre:</strong> {perfil.nombre || 'No especificado'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Apellido:</strong> {perfil.apellido || 'No especificado'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Fecha de Nacimiento:</strong> {formatFecha(perfil.fechaNacimiento)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {user?.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Miembro desde:</strong> {new Date().toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>

          <div className="d-grid gap-2 mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/editar-perfil')}
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-pencil-square"></i>
              Editar perfil
            </Button>

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
                    <Image
                      src={producto.image}
                      alt={producto.title}
                      fluid
                      className="p-3"
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <Card.Body>
                      <Card.Title>{producto.title}</Card.Title>
                      <Card.Text>
                        <strong>${producto.price}</strong>
                      </Card.Text>
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
