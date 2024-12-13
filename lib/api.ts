export interface Voter {
  email: string;
  name: string;
  vote: 'yes' | 'no';
  timestamp: Date;
}

export interface Law {
  id: string;
  shortTitle: string;
  longTitle: string;
  pdfLink: string | null;
  description: string;
  votes: {
    yes: number;
    no: number;
    voters: Voter[];
  };
  comments: { id: string; text: string; author: string }[];
  mpComment: string;
}

export interface MP {
  name: string;
  constituency: string;
  agreedWithConstituents: number;
  disagreedWithConstituents: number;
  noVote: number;
}

export async function getLaws() {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error('API base URL is not defined');
    }

    const response = await fetch(`${baseUrl}/api/laws`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching laws:', error);
    throw error;
  }
}

export async function getLaw(id: string): Promise<Law> {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}/api/laws/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching law:', error);
    throw new Error('Failed to fetch law details');
  }
}

export async function updateVotes(id: string, vote: 'yes' | 'no') {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseUrl}/api/laws/${id}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vote }),
  });

  if (!response.ok) {
    throw new Error('Failed to update vote');
  }

  return response.json();
}

export async function addComment(id: string, comment: { text: string; author: string }) {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${baseUrl}/api/laws/${id}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error('Failed to add comment');
  }

  return response.json();
}

export async function getMP(): Promise<MP> {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}/api/mp`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching MP:', error);
    throw new Error('Failed to fetch MP data');
  }
} 