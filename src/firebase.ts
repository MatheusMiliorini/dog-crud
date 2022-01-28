import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: cert({
    privateKey: process.env.FIREBASE_KEY,
    clientEmail: process.env.FIREBASE_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID
  })
});

console.log('Firebase configured.');

export const db = getFirestore();
