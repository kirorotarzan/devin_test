export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  urls: string[];
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}
