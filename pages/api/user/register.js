import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { user, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ username: user });
    if (existingUser) {
      client.close();
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    await db.collection('users').insertOne({
      username: user,
      password: hashedPassword,
      favourites: [],
      history: []
    });

    client.close();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}