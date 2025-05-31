import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';

const Favoritos = ({ favoritos, setFavoritos }) => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    if (!user) setShowLoginModal(true);
  }, [user]);

  const handleMostrarModal = (producto) => {
    setProductoAEliminar(producto);
    setShowEliminarModal(true);
  };

  const handleEliminar = () => {
    setFavoritos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
    setShowEliminarModal(false);
  };

  if (!user) {
    return (
      <>
        {showLoginModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Iniciar sesión requerido</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Debes iniciar sesión para ver tus favoritos.</p>
                </div>
                <div className="modal-footer">
                  <Link to="/login" className="btn btn-primary">Ir a Login</Link>
                  <button className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No hay productos en la lista de favoritos.</p>
      ) : (
        <Row>
          {favoritos.map((producto) => (
            <Col key={producto.id} md={4} className="mb-4">
              <Card className="h-100 position-relative">
                <Card.Img
                  variant="top"
                  src={producto.image}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleMostrarModal(producto)}
                  className="position-absolute top-0 end-0 m-2"
                >
                  ❌
                </Button>
                <Card.Body>
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>${producto.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal confirmación eliminar */}
      <Modal show={showEliminarModal} onHide={() => setShowEliminarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar favorito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que querés eliminar este producto de favoritos?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEliminarModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Favoritos;
