async function getPhotographers() {
  const photographers = await fetchDataPhotographers();
  return {
    photographers: [...photographers.photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes

  const { photographers } = await getPhotographers();
  displayData(photographers);
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    document.querySelector(".lds-dual-ring").style.display = "block";
    document.querySelector("body").style.display = "none";
    console.log("init");
    init();
  } else if (event.target.readyState === "complete") {
    console.log("complete");
    document.querySelector("body").style.display = "block";
    document.querySelector(".lds-dual-ring").style.display = "none";
  }
});
