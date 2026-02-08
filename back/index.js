require("dotenv").config();

const express = require("express");
const { neon } = require("@neondatabase/serverless");

const app = express();
const PORT = process.env.PORT || 4242;
//Connexion à la base de données
const sql = neon(`${process.env.DATABASE_URL}`);

//Route pour vérifier la connexion à la base de données
app.get("/", async (_, res) => {
  try {
    const response = await sql`SELECT version()`;
    const { version } = response[0];
    res.json({ version }); //affiche la version de PostgreSQL
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
});

//Route pour récupérer tous les thèmes
app.get("/themes", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM themes ORDER BY id`;
    res.json(response); // Renvoie tous les thèmes
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch themes" });
  }
});

//Route pour récupérer les skills associés à un thème
app.get("/themes/skills/:themeId", async (req, res) => {
  const { themeId } = req.params;
  try {
    const response = await sql`
SELECT id, libelle, niveau
FROM skills
WHERE themes_id = ${themeId}
`;
    res.json(response); // renvoie les skills associés au thème
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch skills for theme" });
  }
});

//Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
