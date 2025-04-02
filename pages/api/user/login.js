import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user, password } = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const userData = await db.collection('users').findOne({ username: user });
    if (!userData) {
      client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await verifyPassword(password, userData.password);
    if (!isValid) {
      client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    client.close();
    res.status(200).json({ 
      token: 'generated-jwt-token', // Replace with real JWT
      user: userData.username 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}