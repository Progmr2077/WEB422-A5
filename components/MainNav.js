import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

export default function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return; // Prevent searching if the query is empty
        const queryString = `title=true&q=${search}`;
        setSearchHistory(current => [...current, queryString]); // Add to search history
        router.push(`/artwork?${queryString}`);
        setIsExpanded(false);
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" expanded={isExpanded}>
            <Container>
                <Navbar.Brand>Jacob Rivera</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
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
                        <Button variant="success" type="submit">Search</Button>
                    </Form>
                    &nbsp;
                    <Nav>
                        <NavDropdown title="User Name" id="user-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>
                                    Favourites
                                </NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>
                                    Search History
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}