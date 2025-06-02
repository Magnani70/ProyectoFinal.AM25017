// src/components/ProductoCard.jsx
import { Card, Button, Badge } from "react-bootstrap";

const ProductoCard = ({ producto, agregarAlCarrito, esOferta }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={producto.image}
        alt={producto.title}
        style={{ height: "200px", objectFit: "contain", padding: "10px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 fw-bold">{producto.title}</Card.Title>
          <Card.Text className="text-primary fw-bold">${producto.price}</Card.Text>
          {esOferta && <Badge bg="danger">Oferta</Badge>}
        </div>
        <Button
          variant="success"
          size="sm"
          className="mt-2"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
