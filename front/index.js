//Fonction pour récupérer les thèmes et leurs compétences
async function fetchThemes() {
  try {
    //Effectuer une requête pour récupérer tous les thèmes depuis la route/thèmes
    const response = await fetch("http://localhost:4242/themes");
    const themes = await response.json();

    //Si aucun thème n'est trouvé
    if (themes.length === 0) {
      document.getElementById("themes-list").innerHTML = "Aucun thème trouvé";
      return;
    }

    //Boucle pour chaque thème
    themes.forEach(async (theme) => {
      //Sélectionner l'élément UL spécifique pour ce thème
      const skillslist = document.getElementById(`skills-list-${theme.id}`);

      //Faire un fetch pour récupérer les compétences du thème
      const skillsresponse = await fetch(
        `http://localhost:4242/themes/skills/${theme.id}`,
      );
      const skills = await skillsresponse.json();

      //Si skillslist existe
      if (skillslist) {
        //Boucle pour ajouter les compétences de ce thème
        skills.forEach((skill) => {
          //Créer un élément <li> pour chaque compétence
          const li = document.createElement("li");
          li.innerHTML = `${skill.libelle} <label><progress value="${skill.niveau}" max="100">${skill.niveau}%</progress></label>`;

          //Ajouter l'élément <li> dans UL du thème
          skillslist.appendChild(li);
        });
      }
    });
  } catch (error) {
    console.error(error);
    document.getElementById("themes-list").innerHTML =
      "erreur de récupération des données";
  }
}

//Appeler la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", fetchThemes);
