import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const EditarPerfil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    foto: ''
  });

  // Cargar datos desde localStorage
  useEffect(() => {
    if (user?.email) {
      const datosGuardados = localStorage.getItem(`perfil_${user.email}`);
      if (datosGuardados) {
        setPerfil(JSON.parse(datosGuardados));
      }
    }
  }, [user]);

  // Cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar carga de imagen
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPerfil((prev) => ({ ...prev, foto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const eliminarFoto = () => {
    setPerfil((prev) => ({ ...prev, foto: '' }));
  };

  // Guardar perfil
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.email) {
      localStorage.setItem(`perfil_${user.email}`, JSON.stringify(perfil));
      alert('Perfil actualizado correctamente');
      navigate('/perfil');
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h4">Editar Perfil</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              {perfil.foto ? (
                <Image
                  src={perfil.foto}
                  roundedCircle
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover', border: '2px solid #ccc' }}
                />
              ) : (
                <Image
                  src="https://via.placeholder.com/120x120.png?text=Foto"
                  roundedCircle
                  width={120}
                  height={120}
                />
              )}
              <div className="mt-2">
                <Form.Control type="file" onChange={handleFotoChange} accept="image/*" />
                {perfil.foto && (
                  <Button variant="outline-danger" size="sm" className="mt-2" onClick={eliminarFoto}>
                    Eliminar Foto
                  </Button>
                )}
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={perfil.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={perfil.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
              <Button variant="secondary" onClick={() => navigate('/perfil')}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarPerfil;
