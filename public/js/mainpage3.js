document.getElementById("loadEnclosuresBtn").addEventListener("click", async () => {
  const container = document.getElementById("enclosuresContainer");
  try {
    container.innerHTML = "Cargando datos...";
    const res = await fetch("/api/sql/enclosuresGet");
    if (!res.ok) throw new Error("Error al obtener los enclosures");

    const enclosures = await res.json();

    if (enclosures.length === 0) {
      container.innerHTML = "<p>No hay enclosures registrados.</p>";
      return;
    }

    let html = `<table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Habitat</th>
          <th>Tamaño (sqm)</th>
          <th>Clima</th>
        </tr>
      </thead>
      <tbody>`;

    enclosures.forEach((enc) => {
      html += `<tr>
        <td>${enc.idenclosures}</td>
        <td>${enc.name}</td>
        <td>${enc.habitat_typ}</td>
        <td>${enc.size_sqm}</td>
        <td>${enc.weather}</td>
      </tr>`;
    });

    html += "</tbody></table>";
    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = `<p style="color: red;">${error.message}</p>`;
    console.error(error);
  }
});