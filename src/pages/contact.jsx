import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';

function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    // Por ahora solo mostramos el modal de confirmación
    setShowModal(true);
    // Limpiar el formulario
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h2 className="mb-4">Contacto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            name="nombre"
            placeholder="Tu nombre" 
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="tu@email.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control 
            as="textarea" 
            name="mensaje"
            rows={3} 
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje enviado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Tu mensaje ha sido enviado con éxito!</p>
          <p>Nos pondremos en contacto contigo a la brevedad.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;