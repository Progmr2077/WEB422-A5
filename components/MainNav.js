import { Navbar, Nav, Form, Button, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData'; // ADD IMPORT
import { readToken, removeToken } from '../lib/authenticate'; // ADD IMPORTS

export default function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken(); // ADD TOKEN CHECK

    // ADD LOGOUT FUNCTION
    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    };

    // UPDATE SEARCH HANDLER TO USE API
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        const queryString = `title=true&q=${search}`;
        try {
            setSearchHistory(await addToHistory(queryString));
        } catch (err) {
            // Handle error
        }
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
                        {token && ( // SHOW ADVANCED SEARCH ONLY WHEN LOGGED IN
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                            </Link>
                        )}
                    </Nav>
                    {token && ( // SHOW SEARCH FORM ONLY WHEN LOGGED IN
                        <>
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
                        </>
                    )}
                    <Nav>
                        {token ? ( // LOGGED IN UI
                            <NavDropdown title={token.userName} id="user-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                                        Favourites
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>
                                        Search History
                                    </NavDropdown.Item>
                                </Link>
                                <NavDropdown.Item onClick={logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : ( // NOT LOGGED IN UI
                            <>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}