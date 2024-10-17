document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const gender = document.getElementById("gender").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const user = { name, dob, email, password, gender };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful! Please log in.");
  window.location.href = "login.html"; 
});
