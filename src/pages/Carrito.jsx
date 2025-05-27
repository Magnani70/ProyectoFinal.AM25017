import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Carrito = ({ carrito, agregarAlCarrito, setCarrito }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario logueado, mostramos un mensaje
  if (!user) {
    return (
      <Container className="mt-4 text-center">
        <h1>Carrito de Compras</h1>
        <p>Debes <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>iniciar sesión</span> para ver los productos en tu carrito.</p>
      </Container>
    );
  }

  // Agrupar productos por ID y contar cantidad
  const productosAgrupados = carrito.reduce((acc, producto) => {
    const existente = acc.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ ...producto, cantidad: 1 });
    }
    return acc;
  }, []);

  const total = productosAgrupados.reduce(
    (sum, producto) => sum + producto.price * producto.cantidad,
    0
  );

  const handleEliminar = (producto) => {
    setCarrito((prev) => prev.filter((p) => p.id !== producto.id));
  };

  return (
    <Container className="mt-4">
      <h1>Carrito de Compras</h1>

      {productosAgrupados.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <Row>
            {productosAgrupados.map((producto) => (
              <Col key={producto.id} md={6} lg={4} className="mb-4">
                <Card className="h-100">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={producto.image}
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminar(producto)}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      ❌
                    </Button>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: '16px' }}>{producto.title}</Card.Title>
                    <Card.Text>Precio unitario: ${producto.price.toFixed(2)}</Card.Text>
                    <Card.Text>Cantidad: {producto.cantidad}</Card.Text>
                    <Card.Text>
                      Subtotal: ${(producto.price * producto.cantidad).toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="success"
                      className="mt-auto"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      + Agregar uno más
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h3>Total a pagar: ${total.toFixed(2)}</h3>
        </>
      )}
    </Container>
  );
};

export default Carrito;
