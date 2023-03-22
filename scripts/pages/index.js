async function createSectionPhotographers() {
  const photographers = await getDataPhotographers();
  const $wrapperPhotographers = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const factoryPhotographer = photographerFactory(photographer);
    const cardPhotographer = factoryPhotographer.createPhotographerCard();
    $wrapperPhotographers.appendChild(cardPhotographer);
  });
}

// Récupère les datas des photographes
async function getDataPhotographers() {
  console.log(location.pathname);
  const data = api(`${location.pathname}data/photographers.json`);
  const photographers = await data.getPhotographers();
  return photographers;
}

createSectionPhotographers();
