import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const Favoritos = ({ favoritos, setFavoritos }) => {
  const [showModal, setShowModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const handleMostrarModal = (producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const handleEliminar = () => {
    setFavoritos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
    setShowModal(false);
  };

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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar favorito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que querés eliminar este producto de favoritos?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Favoritos;