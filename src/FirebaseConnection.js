import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAgVrmeu3IcZIRHoT4lAdFfrq-1d-gj0GA",
    authDomain: "projeto-teste-bcbff.firebaseapp.com",
    databaseURL: "https://projeto-teste-bcbff.firebaseio.com",
    projectId: "projeto-teste-bcbff",
    storageBucket: "projeto-teste-bcbff.appspot.com",
    messagingSenderId: "1052268495824"
  };
  firebase.initializeApp(config);

  export default firebase;