import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBG2DzpLI94uR2oBYh7760cXgA1vi3eL_k",
    authDomain: "slack-clone-abcce.firebaseapp.com",
    projectId: "slack-clone-abcce",
    storageBucket: "slack-clone-abcce.appspot.com",
    messagingSenderId: "377132914242",
    appId: "1:377132914242:web:41abb38a5ed8c730753fdb"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, db };