async function login() {
  const email = document.getElementById("loginCorreoInput").value;
  const password = document.getElementById("loginContrasenaInput").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correo, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
      window.location.href = "/pages/index.html";
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Error:", error);
  }
}