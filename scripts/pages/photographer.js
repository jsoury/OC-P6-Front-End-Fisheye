async function getDataPhotographer() {
  const data = api("/data/photographers.json");
  const photographer = await data.getPhotograper(getParamId());
  return photographer;
}

async function getMedia() {
  const data = api("/data/photographers.json");
  const media = await data.getMedia(getParamId());
  return media;
}

function getTotalLike(media) {
  let totalLikes = 0;
  media.forEach((element) => {
    totalLikes += element.likes;
  });
  return { totalLikes: totalLikes };
}

function mergePhotograperData(photograper, totalLike) {
  return { ...totalLike, ...photograper };
}

function makePortfolioHeader(photograper) {
  const $wrapper = document.querySelector(".photograph-header");
  const factoryPhotographer = photographerFactory(photograper);
  const headerPhotographer = factoryPhotographer.createPhotographerHeader();
  $wrapper.appendChild(headerPhotographer);
}

function mergeMedia(photograper, media) {
  const name = { name: photograper.name.split(" ")[0] };
  let mediaMerge = [];
  media.forEach((element) => {
    mediaMerge.push({ ...name, ...element });
  });
  return mediaMerge;
}

function makePortfolioCards(media) {
  const $wrapper = document.querySelector(".achievements_section");
  media.forEach((element, index) => {
    const factoryPortfolio = portfolioFactory(element);
    const portfolioCard = factoryPortfolio.createPortfolioCard(index);
    $wrapper.appendChild(portfolioCard);
  });
}

function reMakePortfolioCard(media, idCard) {
  const $wrapper = document.getElementById(idCard);
  const index = $wrapper.dataset.index;
  const factoryPortfolio = portfolioFactory(media);
  const portfolioCard = factoryPortfolio.createPortfolioCard(index);
  $wrapper.parentNode.replaceChild(portfolioCard, $wrapper);
  addListenerEventKey();
}

function makecarousel(media) {
  const $wrapper = document.querySelector("#carousel-list");
  media.forEach((element, index) => {
    const factorycarousel = carouselFactory(element);
    const $item = factorycarousel.createItemcarousel(index);
    $wrapper.appendChild($item);
  });
}

function initcarouselManager() {
  let script = document.createElement("script");
  script.src = "scripts/utils/carousel.js";
  document.head.appendChild(script);
}

function setNameContact(photograper) {
  const modal = document.getElementById("contact_modal");
  modal.setAttribute("aria-describedby", `contactez ${photograper.name}`);
  const modalTitle = document.querySelector(".modal header h2");
  modalTitle.setAttribute("id", `contactez ${photograper.name}`);
  modalTitle.innerHTML = `Contactez-moi<br/> ${photograper.name}`;
}

function makeSticky(photograper) {
  const $wrapper = document.body;
  const factoryPhotographer = photographerFactory(photograper);
  const sticky = factoryPhotographer.createStickyTotalLikes();
  $wrapper.appendChild(sticky);
}

async function makeStickyAfterLike() {
  let photograper = await getDataPhotographer();
  const $card = document.querySelectorAll(".achievements_section article");
  const $sticky = document.querySelector(".cost-card");
  let totalLikes = 0;

  $card.forEach((element) => {
    totalLikes += parseInt(element.dataset.likes);
  });
  photograper = { ...photograper, ...{ totalLikes: totalLikes } };

  $sticky.parentNode.removeChild($sticky);
  makeSticky(photograper);
}

function toggleLike(idCard) {
  let article = document.getElementById(idCard);
  let heart = article.querySelector(".fa-heart");
  heart.classList.toggle("fa-solid");

  if (heart.classList.contains("fa-regular")) {
    likeCard(idCard, (add = true));
  } else {
    likeCard(idCard, (add = false));
  }
}

function likeCard(idCard, add) {
  const $card = document.getElementById(idCard);
  const object = $card.dataset;
  let data = {};
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      data = { ...data, ...{ [key]: object[key] } };
    }
  }
  if (add) {
    data.likes = parseInt(data.likes) + 1;
    data = { ...data, ...{ liked: true } };
  } else {
    data.likes = parseInt(data.likes) - 1;
    data = { ...data, ...{ liked: false } };
  }
  reMakePortfolioCard(data, idCard);
  makeStickyAfterLike();
}

function makePortfolioCardsBySort(data) {
  let newData = [];
  //remove child
  const achievementsSection = document.querySelector(".achievements_section");
  achievementsSection.textContent = "";
  const carouselList = document.querySelector("#carousel-list");
  carouselList.textContent = "";

  data.forEach((achievement, index) => {
    achievement.dataset.index = index;
    newData.push({
      id: achievement.getAttribute("id"),
      index: achievement.dataset.index,
      date: achievement.dataset.date,
      name: achievement.dataset.name,
      title: achievement.dataset.title,
      image: achievement.dataset.image,
      video: achievement.dataset.video,
      likes: achievement.dataset.likes,
      liked: achievement.dataset.liked,
    });
  });
  makePortfolioCards(newData);
  makecarousel(newData);
  createEventListenerModal();
  addListenerEventKey();
}

async function init() {
  const dataPhotographer = await getDataPhotographer();
  const dataMedia = await getMedia();
  const totalLikes = getTotalLike(dataMedia);
  const mergeDataPhotograper = mergePhotograperData(
    dataPhotographer,
    totalLikes
  );
  const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);

  makePortfolioHeader(mergeDataPhotograper);
  makePortfolioCards(mergeDataMedia);
  makecarousel(mergeDataMedia);
  initcarouselManager();
  setNameContact(dataPhotographer);
  makeSticky(mergeDataPhotograper);
}

function addListenerEventKey() {
  const $article = document.querySelectorAll(".achievements_section article a");
  const $heartLike = document.querySelectorAll(
    ".achievements_section article .fa-heart"
  );
  const $carousel = document.querySelector(".carousel-photographer");
  const carouselIsClose = $carousel.getAttribute("aria-hidden");
  $article.forEach((card) => {
    card.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter" && carouselIsClose) event.target.click();
      },
      { once: true }
    );
  });
  $heartLike.forEach((heart) => {
    heart.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.target.click();
    });
  });
}

document.addEventListener("readystatechange", async (event) => {
  if (event.target.readyState === "interactive") {
    await init();
    addListenerEventKey();
  }
});
