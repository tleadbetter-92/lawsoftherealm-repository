interface Law {
  id: string;
  shortTitle: string;
  longTitle: string;
  pdfLink: string;
  description: string;
  votes: { yes: number; no: number };
  comments: { id: string; text: string; author: string }[];
  mpComment: string;
}

interface MP {
  name: string;
  constituency: string;
  agreedWithConstituents: number;
  disagreedWithConstituents: number;
  noVote: number;
}

async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getLaws() {
  try {
    // Use absolute URL with origin for server components
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/laws`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch laws');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching laws:', error);
    throw error;
  }
}

export async function getLaw(id: string): Promise<Law> {
  return fetchWithErrorHandling(`/api/laws/${id}`);
}

export async function updateVotes(id: string, vote: 'yes' | 'no') {
  return fetchWithErrorHandling(`/api/laws/${id}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vote }),
  });
}

export async function addComment(id: string, comment: { text: string; author: string }) {
  return fetchWithErrorHandling(`/api/laws/${id}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
}

export async function getMP(): Promise<MP> {
  return fetchWithErrorHandling('/api/mp');
} 