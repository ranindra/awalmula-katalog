import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Row, Col } from "react-bootstrap";
import './Navbar.scss'

function NavBar(props) {
    const [dropActive, setDrop] = useState(false);
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        setKategori(props.data_kategori);
        // console.log(props.data_kategori);
    });

    return (
        <>
            <Navbar className="nav-white" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Katalog Produk</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => setDrop(!dropActive)}>Kategori</Nav.Link>                            
                        </Nav>
                        <Form className="search-form">
                            <FormControl
                                type="search"
                                placeholder="Cari Produk"
                                className="me-2"
                                aria-label="Search"
                                onChange={props.onSearch}
                            />
                            <Button className="search-btn" onClick={props.onSearchBtn}>Cari</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>                
            </Navbar>
            {
                    dropActive ?
                        <Container fluid>
                            <div className="drop-nav">
                                {kategori !== null && kategori !== undefined && kategori.length !== 0 ?
                                    kategori.map((kat, i) => {
                                        return (
                                            <div id={i} onClick={(i) => props.selectKat(i)}>{kat.name}</div>
                                        )
                                    }) : null
                                }
                            </div>
                        </Container> :
                        null
                }
        </>
    )

}

export default NavBar;