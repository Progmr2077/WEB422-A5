import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { authenticateUser } from '../lib/authenticate';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      router.push('/favourites');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="container mt-4">
      <Card bg="light" className="mb-4">
        <Card.Body>
          <h2>Login</h2>
          <p className="mb-0">Sign in to your account</p>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {warning && <Alert variant="danger">{warning}</Alert>}

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}