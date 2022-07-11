 import * as firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCflhxjfW0Kf1NG-T51i2LzJd7SSC47BaI",
    authDomain: "projectexpo-fce16.firebaseapp.com",
    databaseURL: "https://projectexpo-fce16-default-rtdb.firebaseio.com",
    projectId: "projectexpo-fce16",
    storageBucket: "projectexpo-fce16.appspot.com",
    messagingSenderId: "513477020718",
    appId: "1:513477020718:web:bee1c1ad733e7b9dbb23bf",
    measurementId: "G-QR3TBQN02D"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;