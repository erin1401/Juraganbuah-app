function doLogin() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  const user = DataStore.getUsers().find(x => x.username === u && x.password === p);

  if (!user) {
    alert("Username atau password salah!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}
