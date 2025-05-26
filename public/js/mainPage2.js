const getBtn = document.getElementById("getBtn");
if (getBtn) {
  getBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/firebase/enclosures");
      const enclosures = await res.json();

      const output = document.getElementById("output");
      output.innerHTML = ""; // Limpiar contenido anterior

      if (enclosures.length === 0) {
        output.innerHTML = "<p>No hay enclosures disponibles.</p>";
        return;
      }

      // Crear tabla
      const table = document.createElement("table");
      table.border = "1";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "10px";

      // Encabezado
      const header = table.insertRow();
      ["ID", "Habitantes", "Nombre", "Tamaño", "Clima"].forEach((text) => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        header.appendChild(th);
      });

      // Filas con datos
      enclosures.forEach((enc) => {
        const row = table.insertRow();
        row.insertCell().textContent = enc.id || "N/A";
        row.insertCell().textContent = enc.inhabit || "N/A";
        row.insertCell().textContent = enc.name || "N/A";
        row.insertCell().textContent = enc.size || "N/A";
        row.insertCell().textContent = enc.weather || "N/A";
      });

      output.appendChild(table);
    } catch (err) {
      console.error(err);
      alert("Error al obtener los enclosures.");
    }
  });
}


const getByIdBtn = document.getElementById("getByIdBtn");
if (getByIdBtn) {
  getByIdBtn.addEventListener("click", async () => {
    const id = document.getElementById("enclosureIdInput").value.trim();
    const outputById = document.getElementById("outputById");

    if (!id) {
      alert("Por favor ingresa una ID");
      return;
    }

    try {
      const res = await fetch(`/api/firebase/enclosures/${id}`);
      if (!res.ok) {
        outputById.innerHTML = `<p>No se encontró la enclosure con ID "${id}".</p>`;
        return;
      }
      const enclosure = await res.json();

      outputById.innerHTML = `
        <h3>Resultado:</h3>
        <ul>
          <li><strong>ID:</strong> ${enclosure.id}</li>
          <li><strong>Habitantes:</strong> ${enclosure.inhabit}</li>
          <li><strong>Nombre:</strong> ${enclosure.name}</li>
          <li><strong>Tamaño:</strong> ${enclosure.size}</li>
          <li><strong>Clima:</strong> ${enclosure.weather}</li>
        </ul>
      `;
    } catch (err) {
      console.error(err);
      alert("Error al obtener la enclosure.");
    }
  });
}
