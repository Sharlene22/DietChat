import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA06U157JYytLcd9T2I5LVE7paejHTmVzw",
    authDomain: "dietdialogue.firebaseapp.com",
    projectId: "dietdialogue",
    storageBucket: "dietdialogue.appspot.com",
    messagingSenderId: "879842124840",
    appId: "1:879842124840:web:d235e65b749d873823011d"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
