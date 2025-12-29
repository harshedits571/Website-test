import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { ResourceItem } from '../types';
import { INITIAL_ITEMS } from '../constants';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "aescript-auth.firebaseapp.com",
  databaseURL: "https://aescript-auth-default-rtdb.firebaseio.com",
  projectId: "aescript-auth",
  storageBucket: "aescript-auth.firebasestorage.app",
  messagingSenderId: "306998568094",
  appId: "1:306998568094:web:fe2a4feb75c92d6027078f",
  measurementId: "G-63EV6KQLDF"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const itemsRef = ref(db, 'items');

export interface FetchResult {
  items: ResourceItem[];
  error?: string;
}

export const getItems = async (): Promise<FetchResult> => {
  try {
    const snapshot = await get(itemsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return { items: Array.isArray(data) ? data : Object.values(data) };
    } else {
      // Seed initial data if DB is empty - this might fail if write rules are restricted
      try {
        await set(itemsRef, INITIAL_ITEMS);
        return { items: INITIAL_ITEMS };
      } catch (writeError: any) {
        console.warn("Could not seed initial data to Cloud. Using local copies.", writeError);
        return { items: INITIAL_ITEMS };
      }
    }
  } catch (error: any) {
    console.error("Firebase fetch error:", error);
    let errorMessage = "Connection failed.";
    
    // Check if it's a permission error
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("permission_denied") || msg.includes("permission denied")) {
      errorMessage = "PERMISSION_DENIED: Your Firebase Realtime Database rules are likely set to private. Go to the Firebase Console > Realtime Database > Rules and set '.read' and '.write' to true for testing.";
      return { items: INITIAL_ITEMS, error: errorMessage };
    }
    
    return { items: INITIAL_ITEMS, error: errorMessage };
  }
};

export const saveItem = async (item: ResourceItem) => {
  try {
    const itemPath = `items/${item.id}`;
    await set(ref(db, itemPath), item);
  } catch (error: any) {
    console.error("Firebase save error:", error);
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("permission_denied") || msg.includes("permission denied")) {
      throw new Error("CLOUD_SYNC_DISABLED: Firebase Database is currently in locked mode. To enable editing, set your Database Rules to public ('.read': true, '.write': true).");
    }
    throw error;
  }
};

export const removeItem = async (id: string) => {
  try {
    const itemPath = `items/${id}`;
    await remove(ref(db, itemPath));
  } catch (error: any) {
    console.error("Firebase remove error:", error);
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("permission_denied") || msg.includes("permission denied")) {
      throw new Error("CLOUD_SYNC_DISABLED: Firebase Rules prohibit deletions.");
    }
    throw error;
  }
};