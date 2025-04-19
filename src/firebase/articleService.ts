import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './config';
import { Article } from '../types';

const COLLECTION_NAME = 'articles';

export async function getArticles(): Promise<Article[]> {
  const articlesQuery = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(articlesQuery);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      urls: data.urls || [],
      tags: data.tags || [],
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Article;
  });
}

export async function getArticle(id: string): Promise<Article | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    content: data.content,
    imageUrl: data.imageUrl,
    urls: data.urls || [],
    tags: data.tags || [],
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as Article;
}

export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = Timestamp.now();
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...article,
    createdAt: now,
    updatedAt: now,
  });
  
  return docRef.id;
}

export async function updateArticle(id: string, article: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  
  await updateDoc(docRef, {
    ...article,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteArticle(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
