document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert("Login successful!");
    window.location.href = "products.html";
  } else {
    document.getElementById("errorMessage").textContent = "Invalid email or password!";
  }
});


document.querySelector("a[href='index.html']").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});
