<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Physique - Trainer Registration</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

  <style>
    body {
      background-color: #121212;
      color: #D5FA05;
      font-family: 'Montserrat'
    }

    .navbar {
      background-color: #121212;
      position: fixed;
      width: 100%;
      z-index: 1000;
      /* Set a higher z-index to ensure the navbar appears above other elements */
    }

    .container {
      padding: 60px 20px 20px;
    }

    .navbar-brand,
    .navbar-nav a {
      color: #D5FA05 !important;
    }

    .navbar-nav .active {
      font-weight: bold;
      color: #D5FA05 !important;
    }

    .navbar-nav .nav-link:not(.active) {
      color: #808080 !important;
    }

    .box {
      background-color: #121212;
      color: #D5FA05;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .box h1 {
      text-align: center;
    }

    .form-control,
    .form-select {
      background-color: #383838B2;
      color: white;
      border: 1px solid #383838B2;
      border-radius: 5px;
      margin-bottom: 15px;
      height: 50px;
      width: 50%;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

    .form-control:focus,
    .form-select:focus {
      background-color: #383838B2;
      color: white;
      border: 1px solid #383838B2;
      border-radius: 5px;
      outline: none;
      box-shadow: 0 0 5px rgba(213, 250, 5, 0.7);
    }

    .btn-primary {
      background-color: #D5FA05;
      color: #121212;
      border: 1px solid #D5FA05;
      border-radius: 5px;
      padding: 12px 100px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
      font-size: 24px;
      font-weight: 500;
    }

    .btn-primary:hover {
      background-color: #B4DA04;
      color: #121212;
    }

    .form-control::placeholder,
    .form-select::placeholder {
      color: white;
      opacity: 0.7;
    }
  </style>
</head>

<body>

  <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="Dashboard.html">Dashboard</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="user-registration.html">User Registration</a>
          <a class="nav-link active" aria-current="page" href="trainer-Registration.html">Trainer Registration</a>
          <a class="nav-link" href="user-details.html">User Details</a>
          <a class="nav-link" href="trainer-details.html">Trainer Details</a>
          <a class="nav-link" href="assign-trainer.html">Assign Trainer</a>
          <a class="nav-link" href="#" onclick="signOut()">Sign out</a>
        </div>
      </div>
    </div>
  </nav>

  <main class="container">
    <div class="con">
      <div class="box">
        <h1>Trainer-Registraion</h1>
        <input type="text" id="fullName" placeholder="Full name" class="form-control">
        <input type="email" id="email" placeholder="Email address" class="form-control">
        <input type="tel" id="phoneNumber" placeholder="Phone Number" class="form-control">
        <input type="password" id="password" placeholder="Password" class="form-control">
        <input type="password" id="confirmPassword" placeholder="Confirm Password" class="form-control">
        <input type="tel" id="uniqueId" placeholder="ID" class="form-control">
        <button onclick="registerUser()" class="btn btn-primary">Register</button>
      </div>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>

  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
  <script>

    // Your Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDEM0AQkqOoBgOUJeWwk-ZbbYNYwT87beY",
      authDomain: "physiques2.firebaseapp.com",
      projectId: "physiques2",
      storageBucket: "physiques2.appspot.com",
      messagingSenderId: "174104508999",
      appId: "1:174104508999:web:8f994f2c1d52aeb53b0f62",
      measurementId: "G-VRMNPEM3XH"
    };
    firebase.initializeApp(firebaseConfig);

    var firestore = firebase.firestore();
    var auth = firebase.auth();

    // Register user function
    function registerUser() {
      var fullName = document.getElementById('fullName').value;
      var email = document.getElementById('email').value;
      var phoneNumber = document.getElementById('phoneNumber').value;
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      var uniqueId = document.getElementById('uniqueId').value;

      // Validate inputs (add more validation as needed)
      if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Add user details to Firestore
          var user = userCredential.user;
          var creationDate = new Date();
          firestore.collection('trainer').doc(user.uid).set({
            Name: fullName,
            email: email,
            phoneNumber: phoneNumber,
            uniqueID: uniqueId,
            joinDate: creationDate
          })
            .then(() => {
              alert('Trainer registered successfully!');
              // Redirect to dashboard or other page
              window.location.href = 'trainer-Registration.html';
            })
            .catch((error) => {
              console.error('Error adding user details to Firestore: ', error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    }
    function signOut() {
      auth.signOut().then(function () {
        // Sign-out successful.
        console.log("Admin signed out");
        alert("Admin signed out Successfully");
        // Redirect to the sign-in or home page if needed
        window.location.href = "index.html";
      }).catch(function (error) {
        // An error happened.
        console.error("Error signing out:", error);

      });
    }

    // Add this function to check if the user is signed in on each page load
    function checkAuthState() {
      auth.onAuthStateChanged(function (user) {
        if (!user) {
          // If the user is not signed in, redirect to the sign-in or home page
          window.location.href = "index.html";
        }
      });
    }

    // Call the checkAuthState function when the page loads
    checkAuthState();
  </script>
</body>

</html>
