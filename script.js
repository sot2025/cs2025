document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

  // Handle form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successfully signed in
        console.log("User signed in:", userCredential.user);
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        alert("Error: " + "incorrect email or password");
      });
  });

  // Handle forgot password
  forgotPasswordBtn.addEventListener('click', function() {
    const email = document.getElementById('email').value;
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
});