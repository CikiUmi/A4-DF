/* config de pag y eso */
async function obtenerAlimentos() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/alimento", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error("Error:", error);
  }
}