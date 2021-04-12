import * as firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBNXVDNklQbYhCM3gnQaqbcjnWoy6A7eH0',
   authDomain: 'mern-ecommerce-c960e.firebaseapp.com',
   projectId: 'mern-ecommerce-c960e',
   storageBucket: 'mern-ecommerce-c960e.appspot.com',
   messagingSenderId: '769451189334',
   appId: '1:769451189334:web:793c9b00aa84fd32d907f7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();