document.getElementById("generateBtn").addEventListener("click", async () => {
  const enclosureCount = parseInt(document.getElementById("enclosureCount").value);
  const animalCount = parseInt(document.getElementById("animalCount").value);

  const res = await fetch("/api/firebase/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enclosureCount, animalCount })
  });

  const text = await res.text();
  alert(text);
});

document.getElementById("getBtn").addEventListener("click", async () => {
  const res = await fetch("/api/firebase/enclosures");
  const enclosures = await res.json();
  document.getElementById("output").textContent = JSON.stringify(enclosures, null, 2);
});

////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("RegisterButtonEnclosure").addEventListener("click", async () => {
    const zooId = "Zoo"; // Cambia por el ID real o hazlo dinámico
    const enclosureId = document.getElementById("enclosureId").value.trim();
    const inhabit = document.getElementById("inhabit").value.trim();
    const name = document.getElementById("name").value.trim();
    const size = document.getElementById("size").value.trim();
    const weather = document.getElementById("weather").value.trim();

    if (!enclosureId || !inhabit || !name || !size || !weather) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const data = {
        zooId,
        enclosureId,
        inhabit,
        name,
        size: parseInt(size, 10),
        weather
    };

    try {
        const res = await fetch("/api/firebase/manual-register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert("¡Enclosure registrado exitosamente!");
        } else {
            alert("Error al registrar: " + result.error);
        }
    } catch (error) {
        console.error("Error al registrar enclosure:", error);
        alert("Ocurrió un error al registrar el enclosure.");
    }
});

