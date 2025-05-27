import React from 'react';
import { Container } from 'react-bootstrap';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container className="text-center">
        <div className="mb-3">
          {/* Iconos de redes sociales */}
          <a href="https://www.instagram.com/tuinstagram" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-white mx-2 fs-4">
            <FaInstagram />
          </a>
          <a href="https://wa.me/tunumerodewhatsapp" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-white mx-2 fs-4">
            <FaWhatsapp />
          </a>
          <a href="https://www.facebook.com/tupaginafacebook" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="text-white mx-2 fs-4">
            <FaFacebook />
          </a>
        </div>
        <p className="mb-0">© 2025 AMventas Argentina</p>
      </Container>
    </footer>
  );
}

export default Footer;