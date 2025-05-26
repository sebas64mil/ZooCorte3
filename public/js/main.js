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