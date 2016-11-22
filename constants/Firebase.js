import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBjQULDIUKZfXxcYb08_l6Iffb3HAfd7FU',
  authDomain: 'rmotr-tic-tac-toe.firebaseapp.com',
  databaseURL: 'https://rmotr-tic-tac-toe.firebaseio.com',
  storageBucket: 'rmotr-tic-tac-toe.appspot.com',
  messagingSenderId: '1014621293016'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
