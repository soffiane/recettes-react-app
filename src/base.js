import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBKTiX4vrmxB6VKjVKuM4_TOrJCJjMdzwg",
    authDomain: "recipies-react-app.firebaseapp.com",
    databaseURL: "https://recipies-react-app.firebaseio.com",
    projectId: "recipies-react-app",
    storageBucket: "recipies-react-app.appspot.com",
    messagingSenderId: "551630524528",
    appId: "1:551630524528:web:c2a77da1cf1d28866164b5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script> */

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBKTiX4vrmxB6VKjVKuM4_TOrJCJjMdzwg",
    authDomain: "recipies-react-app.firebaseapp.com",
    databaseURL: "https://recipies-react-app.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base