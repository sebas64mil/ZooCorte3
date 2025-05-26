const express = require("express");
const { getFirestore } = require("firebase-admin/firestore");
const firebaseApp = require("../firebase/firebase");
const router = express.Router();

const db = getFirestore(firebaseApp);

// GET all enclosures
router.get("/enclosures", async (req, res) => {
  try {
    const snapshot = await db.collection("Zoo/zooid/Enclosure").get();
    const enclosures = [];
    snapshot.forEach(doc => {
      enclosures.push({ id: doc.id, ...doc.data() });
    });
    res.json(enclosures);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener los enclosures");
  }
});

// POST: Generar enclosures con animales
router.post("/generate", async (req, res) => {
  const { enclosureCount, animalCount } = req.body;
  const zooId = "zooid";

  const nameOptions = ["Desierto", "Pradera", "Templado", "Taiga", "Tundra"];
  const weatherOptions = ["tropical", "seco", "templado", "continental", "polar"];
  const inhabitOptions = ["terrestrial", "acuatico"];
  const genderOptions = ["male", "fem"];
  const animalNameOptions = [
    "Jaguar", "Nutria", "Tortuga", "Tucán", "Iguana",
    "Flamenco", "Capibara", "Anaconda", "Delfín", "Zorro"
  ];

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomDate2022() {
    const start = new Date("2022-01-01").getTime();
    const end = new Date("2022-12-31").getTime();
    return new Date(start + Math.random() * (end - start));
  }

  try {
    const existingSnap = await db.collection(`Zoo/${zooId}/Enclosure`).get();
    let enclosureCounter = existingSnap.size + 1;

    for (let i = 0; i < enclosureCount; i++) {
      const enclosureId = `idEnclosure_${enclosureCounter++}`;
      const enclosureData = {
        inhabit: randomItem(inhabitOptions),
        name: randomItem(nameOptions),
        size: Math.floor(Math.random() * (32 - 18 + 1)) + 18,
        weather: randomItem(weatherOptions)
      };

      await db.doc(`Zoo/${zooId}/Enclosure/${enclosureId}`).set(enclosureData);

      for (let j = 1; j <= animalCount; j++) {
        const animalId = `idAnimal_${j}`;
        const animalData = {
          name: randomItem(animalNameOptions),
          gender: randomItem(genderOptions),
          date_of_birth: randomDate2022(),
          enclosureId: enclosureId
        };
        await db.doc(`Zoo/${zooId}/Enclosure/${enclosureId}/animal/${animalId}`).set(animalData);
      }
    }

    res.status(200).send("Enclosures y animales generados exitosamente.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar enclosures.");
  }
});

module.exports = router;
