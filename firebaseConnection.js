import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBOyD65uiH1YVp7MEsfslMEN8jF0fsbr_s',
  authDomain: 'alzhelp-471d0.firebaseapp.com',
  projectId: 'alzhelp-471d0',
  storageBucket: 'alzhelp-471d0.appspot.com',
  messagingSenderId: '603688747694',
  appId: '1:603688747694:android:f600a28b5f96d37acee33f',
};

// Inicializa o app apenas se ainda não foi inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);