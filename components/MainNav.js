import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap'; // Import NavDropdown
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false); // State to control navbar expansion

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${search}`);
        setIsExpanded(false); // Close navbar after search
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" expanded={isExpanded}>
            <Container>
                <Navbar.Brand>Jacob Rivera</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    &nbsp;
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="btn btn-success" type="submit">Search</Button>
                    </Form>
                    &nbsp;

                    {/* Added User Name Dropdown with Favourites link */}
                    <nav>
                        <NavDropdown title="User Name" id="user-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                            <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}