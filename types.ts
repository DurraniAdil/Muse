
export interface Collection {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  language?: string;
  poemCount?: number;
  hidden?: boolean;
  background: string;
  text: string;
  primary: string;
  fontClass?: string;
}

export interface SavedQuote {
  id: string;
  content: string;
  collectionId: string;
  createdAt: string;
  imageUrl?: string;
}

export type AppView = 'home' | 'create' | 'settings' | 'detail';
