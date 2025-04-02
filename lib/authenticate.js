import { v4 as uuidv4 } from 'uuid';

export async function registerUser(user, password, password2) {
  const response = await fetch('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, password, password2 }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}

export async function authenticateUser(user, password) {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed');
  }

  // Store token in localStorage
  localStorage.setItem('token', JSON.stringify({
    accessToken: data.token,
    id: uuidv4(),
    userName: user,
  }));

  return data;
}

// Token management
export function readToken() {
  try {
    return JSON.parse(localStorage.getItem('token'));
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('token');
}