export async function getFavourites() {
    const token = readToken();
    const response = await fetch('/api/user/favourites', {
      headers: {
        'Authorization': `Bearer ${token?.accessToken}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch favourites');
    }
  
    return response.json();
  }
  
  export async function addToFavourites(objectID) {
    const token = readToken();
    const response = await fetch('/api/user/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.accessToken}`
      },
      body: JSON.stringify({ objectID }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add favourite');
    }
  
    return response.json();
  }
  
  export async function removeFromFavourites(objectID) {
    const token = readToken();
    const response = await fetch(`/api/user/favourites/${objectID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token?.accessToken}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove favourite');
    }
  
    return response.json();
  }
  
  export async function getHistory() {
    const token = readToken();
    const response = await fetch('/api/user/history', {
      headers: {
        'Authorization': `Bearer ${token?.accessToken}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }
  
    return response.json();
  }
  
  export async function addToHistory(query) {
    const token = readToken();
    const response = await fetch('/api/user/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.accessToken}`
      },
      body: JSON.stringify({ query }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add history');
    }
  
    return response.json();
  }
  
  export async function removeFromHistory(query) {
    const token = readToken();
    const response = await fetch(`/api/user/history`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.accessToken}`
      },
      body: JSON.stringify({ query }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove history');
    }
  
    return response.json();
  }