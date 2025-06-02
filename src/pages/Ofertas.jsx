// src/pages/Ofertas.jsx
import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const Ofertas = ({ productos, agregarAlCarrito }) => {
  const productosEnOferta = productos.filter((producto) => producto.price < 50); // Ajustá el criterio según tu lógica

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Ofertas especiales</h2>
      <Row>
        {productosEnOferta.map((producto) => (
          <Col key={producto.id} md={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={producto.image}
                style={{ height: "200px", objectFit: "contain", padding: "10px" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>{producto.title}</Card.Title>
                <Card.Text>
                  <strong>${producto.price}</strong>
                </Card.Text>
                <Badge bg="danger" className="mb-2">Oferta</Badge>
                <Button variant="success" size="sm" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Ofertas;
