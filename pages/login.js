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
    <>
      <Card bg="light" style={{ marginTop: '80px' }}>
        <Card.Body>
          <h2>Login</h2>
          Login to your account:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </>
  );
}