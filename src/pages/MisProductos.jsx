import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col, Modal, Image } from 'react-bootstrap';

const MisProductos = ({ user }) => {
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState({
    id: null,
    title: '',
    price: '',
    image: ''
  });

  // Cargar productos desde localStorage
  useEffect(() => {
    if (user?.email) {
      const data = localStorage.getItem(`mis_productos_${user.email}`);
      if (data) {
        setProductos(JSON.parse(data));
      }
    }
  }, [user]);

  // Guardar productos en localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`mis_productos_${user.email}`, JSON.stringify(productos));
    }
  }, [productos, user]);

  const handleMostrarModal = () => setMostrarModal(true);
  const handleCerrarModal = () => {
    setProductoActual({ id: null, title: '', price: '', image: '' });
    setModoEdicion(false);
    setMostrarModal(false);
  };

  const handleInputChange = (e) => {
    setProductoActual({ ...productoActual, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    if (!productoActual.title || !productoActual.price) return;

    if (modoEdicion) {
      setProductos((prev) =>
        prev.map((p) => (p.id === productoActual.id ? productoActual : p))
      );
    } else {
      const nuevoProducto = {
        ...productoActual,
        id: Date.now()
      };
      setProductos((prev) => [...prev, nuevoProducto]);
    }
    handleCerrarModal();
  };

  const handleEditar = (producto) => {
    setProductoActual(producto);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">Mis Productos</Card.Header>
        <Card.Body>
          <Button variant="primary" onClick={handleMostrarModal}>
            Agregar Producto
          </Button>

          {productos.length === 0 ? (
            <p className="mt-3">No has agregado productos aún.</p>
          ) : (
            <Row className="mt-4">
              {productos.map((producto) => (
                <Col md={4} key={producto.id} className="mb-4">
                  <Card>
                    <Image
                      src={producto.image || 'https://via.placeholder.com/300x300.png?text=Producto'}
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
                      <div className="d-flex justify-content-between">
                        <Button variant="warning" size="sm" onClick={() => handleEditar(producto)}>
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleEliminar(producto.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      <Modal show={mostrarModal} onHide={handleCerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={productoActual.title}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productoActual.price}
                onChange={handleInputChange}
                placeholder="Precio en USD"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={productoActual.image}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardar}>
            {modoEdicion ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MisProductos;
