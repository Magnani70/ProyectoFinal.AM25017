import React, { useContext } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { AuthContext } from '../components/AuthContext';

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);
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
    </Container>
  );
};

export default Perfil;