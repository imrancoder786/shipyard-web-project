let loginEmailInput = document.getElementById("loginEmail");
let loginPasswordInput = document.getElementById("loginPassword");
let loginBtn = document.getElementById("loginBtn");
let signupAnchor = document.getElementById("signupAnchor");

let users = [];

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

function signIn() {
  let loginEmail = loginEmailInput.value;
  let loginPassword = loginPasswordInput.value;

  if (loginEmail === "" || loginPassword === "") {
    swal({
      text: "Please fill in all fields",
    });
    return;
  }

  let user = isCorrectEmailAndPassword(loginEmail, loginPassword);
  
  if (user) {
    localStorage.setItem("userName", user.name);  
    window.location.href = "index.html"; 
  } else {
    swal({
      text: "Incorrect email or password",
    });
  }
}

function isCorrectEmailAndPassword(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      return users[i]; 
    }
  }
  return null;
}

loginBtn.addEventListener("click", signIn);

signupAnchor.addEventListener("click", function () {
  window.location.href = "signup.html";
});
