import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC9LIGm-L2Fo8Dn0PG205LDONRFu8STUGs",
    authDomain: "anonymous-feedback-app.firebaseapp.com",
    projectId: "anonymous-feedback-app",
    storageBucket: "anonymous-feedback-app.appspot.com",
    messagingSenderId: "224387855068",
    appId: "1:224387855068:web:1e54a68460c31e9eb47a19"
};

firebase.initializeApp(firebaseConfig)

export default firebase;