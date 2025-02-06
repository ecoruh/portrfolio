// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Carousel
} from 'react-bootstrap';

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch album names on component mount
  useEffect(() => {
    fetch('http://localhost:3001/api/albums')
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  // Fetch images when an album is selected
  useEffect(() => {
    if (selectedAlbum) {
      fetch(`http://localhost:3001/api/album/${selectedAlbum}`)
        .then((res) => res.json())
        .then((data) => {
          setImages(data);
          setIndex(0);
        })
        .catch((error) => console.error('Error fetching album images:', error));
    }
  }, [selectedAlbum]);

  // Handle Carousel index change (left/right navigation)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Handle album selection from the Navbar dropdown
  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">My Portfolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Portfolio" id="basic-nav-dropdown">
                {albums.map((album, idx) => (
                  <NavDropdown.Item
                    key={idx}
                    onClick={() => handleAlbumSelect(album)}
                  >
                    {album}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        {selectedAlbum && images.length > 0 ? (
          <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {images.map((image, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:3001/api/image/${selectedAlbum}/${image}`}
                  alt={`Slide ${idx}`}
                  style={{
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    margin: '0 auto'
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div>Please select an album from the Portfolio menu.</div>
        )}
      </Container>
    </>
  );
}

export default App;
