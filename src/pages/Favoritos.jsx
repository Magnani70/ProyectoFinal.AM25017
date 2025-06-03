import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';

const Favoritos = ({ favoritos, setFavoritos, agregarAlCarrito }) => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!user);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const toastRef = useRef(null);

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

  const calcularPrecioConDescuento = (producto) => {
    if (producto.descuento && producto.descuento > 0) {
      return (producto.price * (1 - producto.descuento / 100)).toFixed(2);
    }
    return producto.price.toFixed(2);
  };

  const handleAgregarAlCarritoClick = (producto) => {
    agregarAlCarrito(producto);
    if (toastRef.current) {
      const toast = new window.bootstrap.Toast(toastRef.current);
      toast.show();
    }
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
    <Container className="mt-4 position-relative">
      <h1>Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No hay productos en la lista de favoritos.</p>
      ) : (
        <Row>
          {favoritos.map((producto) => {
            const tieneDescuento = producto.descuento && producto.descuento > 0;
            const precioConDescuento = calcularPrecioConDescuento(producto);

            return (
              <Col key={producto.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm position-relative">
                  <div className="position-relative">
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
                    {tieneDescuento && (
                      <div className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-danger text-white rounded">
                        {producto.descuento}% OFF
                      </div>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{producto.title}</Card.Title>
                    {tieneDescuento ? (
                      <div>
                        <div className="text-muted text-decoration-line-through">${producto.price.toFixed(2)}</div>
                        <div className="text-danger fw-bold">${precioConDescuento}</div>
                      </div>
                    ) : (
                      <div className="text-primary fw-bold">${producto.price.toFixed(2)}</div>
                    )}
                    <Button
                      variant="success"
                      className="mt-auto"
                      onClick={() => handleAgregarAlCarritoClick(producto)}
                    >
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Modal eliminar favorito */}
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

      {/* Toast */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className="toast align-items-center text-white bg-success border-0"
          role="alert"
          ref={toastRef}
        >
          <div className="d-flex">
            <div className="toast-body">Producto agregado al carrito 🎉</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Favoritos;

