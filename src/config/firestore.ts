import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
