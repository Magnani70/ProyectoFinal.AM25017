import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';

const Carrito = ({ carrito, setCarrito }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

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

  const aumentarCantidad = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const disminuirCantidad = (producto) => {
    let eliminado = false;
    setCarrito((prev) => {
      const nuevaLista = [];
      let primeraOcurrenciaEliminada = false;
      for (const p of prev) {
        if (!primeraOcurrenciaEliminada && p.id === producto.id) {
          primeraOcurrenciaEliminada = true;
          continue;
        }
        nuevaLista.push(p);
      }
      return nuevaLista;
    });
  };

  const eliminarProducto = (producto) => {
    setCarrito((prev) => prev.filter((p) => p.id !== producto.id));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 fw-bold">TU CARRITO</h2>
      {productosAgrupados.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <Row>
          {/* Columna izquierda: productos */}
          <Col md={8}>
            <Alert variant="danger" className="text-center fw-semibold">
              🔔 TUS ARTÍCULOS DEL CARRITO NO ESTÁN RESERVADOS 🔔
              <br />
              Asegurá tus artículos antes que se agoten. 3 cuotas sin interés por compras mayores a $89.999.
            </Alert>

            {productosAgrupados.map((producto) => (
              <Card key={producto.id} className="mb-3">
                <Row className="g-0">
                  <Col md={4} className="d-flex justify-content-center align-items-center p-2">
                    <Card.Img
                      src={producto.image}
                      alt={producto.title}
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title className="mb-2">{producto.title}</Card.Title>
                          <Card.Text className="mb-1 fw-semibold">Precio: ${producto.price.toFixed(2)}</Card.Text>
                          <Card.Text>Tamaño: único</Card.Text>
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => disminuirCantidad(producto)}
                              disabled={producto.cantidad <= 1}
                            >
                              -
                            </Button>
                            <span className="fw-bold">{producto.cantidad}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => aumentarCantidad(producto)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarProducto(producto)}
                        >
                          ✖
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          {/* Columna derecha: resumen del pedido */}
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h5 className="fw-bold">RESUMEN DEL PEDIDO</h5>
              <div className="d-flex justify-content-between">
                <span>{carrito.length} producto{carrito.length > 1 && 's'}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envío estimado</span>
                <span>$8.999</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${(total + 8999).toFixed(2)}</span>
              </div>

              <Form.Group className="mt-3">
                <Form.Label className="fw-semibold">💸 Usá un código promocional</Form.Label>
                <Form.Control placeholder="Ingresá tu cupón" />
              </Form.Group>

              <Button
                variant="dark"
                size="lg"
                className="mt-4 w-100"
                onClick={() => alert('Redirigiendo a pasarela de pago...')}
              >
                IR A PAGAR →
              </Button>

              <div className="text-center mt-3">
                <small>OPCIONES DE PAGO</small>
                <div className="mt-1">💳 Mastercard | 💳 Visa</div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;
