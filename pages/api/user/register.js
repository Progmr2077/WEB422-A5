import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { user: username, password, password2 } = req.body;
  
  // Validation
  if (password !== password2) return res.status(400).json({ message: 'Passwords do not match' });
  
  try {
    const client = await connectToDatabase();
    const db = client.db();
    
    // Check existing user
    if (await db.collection('users').findOne({ username })) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    // Create user
    await db.collection('users').insertOne({
      username,
      password: await hashPassword(password),
      favourites: [],
      history: []
    });
    
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  }
}