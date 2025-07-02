import React, { useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const ProductCardReusable = ({
  producto,
  handleAgregarAlCarrito,
  handleToggleFavorito,
  favoritos,
}) => {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAgregar = () => {
    handleAgregarAlCarrito({ ...producto, cantidad });
    setCantidad(1); // Reinicia el contador tras agregar
  };

  return (
    <Card className="h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={producto.image}
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div
          className="position-absolute top-0 end-0 p-2 text-danger"
          style={{ cursor: "pointer" }}
          onClick={() => handleToggleFavorito(producto)}
        >
          {favoritos.some((fav) => fav.id === producto.id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "1rem" }}>{producto.title}</Card.Title>
        <Card.Text className="text-primary fw-bold">${producto.price}</Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <ButtonGroup size="sm">
            <Button variant="outline-secondary" onClick={disminuir}>−</Button>
            <Button variant="light" disabled>{cantidad}</Button>
            <Button variant="outline-secondary" onClick={aumentar}>+</Button>
          </ButtonGroup>
          <Button variant="success" onClick={handleAgregar}>
            <FaShoppingCart />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCardReusable;
