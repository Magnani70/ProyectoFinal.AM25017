import React from "react";
import { useAuth } from "../components/AuthContext";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Form, ListGroup, Image,} from "react-bootstrap";

const Carrito = ({ carrito, setCarrito }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

const productosAgrupados = carrito;

  const total = productosAgrupados.reduce(
    (sum, producto) => sum + producto.price * producto.cantidad,
    0
  );

 const aumentarCantidad = (producto) => {
  setCarrito((prev) =>
    prev.map((p) =>
      p.id === producto.id
        ? { ...p, cantidad: p.cantidad + 1 }
        : p
    )
  );
};

const disminuirCantidad = (producto) => {
  setCarrito((prev) =>
    prev
      .map((p) =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
      .filter((p) => p.cantidad > 0)
  );
};


  const eliminarProducto = (producto) => {
    setCarrito((prev) => prev.filter((p) => p.id !== producto.id));
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold text-center mb-4">🛒 Tu Carrito</h2>

      {productosAgrupados.length === 0 ? (
        <Alert variant="info" className="text-center fw-semibold">
          Tu carrito está vacío.
        </Alert>
      ) : (
        <Row>
          {/* Lista de productos */}
          <Col md={8}>
            <Alert variant="danger" className="text-center fw-semibold">
              🔔 TUS ARTÍCULOS NO ESTÁN RESERVADOS
              <br />
              ¡Apurate antes de que se agoten! 3 cuotas sin interés a partir de
              $89.999.
            </Alert>

            <ListGroup variant="flush">
              {productosAgrupados.map((producto) => (
                <ListGroup.Item key={producto.id} className="mb-3 border rounded shadow-sm">
                  <Row className="align-items-center">
                    <Col md={3} className="text-center">
                      <Image
                        src={producto.image}
                        alt={producto.title}
                        fluid
                        style={{ maxHeight: "150px", objectFit: "contain" }}
                      />
                    </Col>
                    <Col md={6}>
                      <h5>{producto.title}</h5>
                      <p className="mb-1 text-muted">Tamaño: Único</p>
                      <p className="mb-2 fw-semibold text-success">
                        ${producto.price.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => disminuirCantidad(producto)}
                          disabled={producto.cantidad <= 1}
                        >
                          −
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
                    </Col>
                    <Col md={12} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarProducto(producto)}
                      >
                        Quitar ✖
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Resumen del pedido */}
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <h5 className="fw-bold mb-3">Resumen del Pedido</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos:</span>
                <span>{carrito.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío estimado:</span>
                <span>$8999</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span>${(total + 8999).toFixed(2)}</span>
              </div>

              <Form.Group className="mt-4">
                <Form.Label className="fw-semibold">
                  💸 Código Promocional
                </Form.Label>
                <Form.Control placeholder="Ingresá tu cupón" />
              </Form.Group>

              <Button
                variant="dark"
                size="lg"
                className="mt-4 w-100"
                onClick={() => alert("Redirigiendo a pasarela de pago...")}
              >
                Finalizar Compra →
              </Button>

              <div className="text-center mt-3 text-muted">
                <small>Formas de Pago</small>
                <div className="mt-1">💳 Mastercard | 💳 Visa | 💳 Mercado Pago</div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;
