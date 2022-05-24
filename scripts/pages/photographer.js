// let DATAPHOTOGRAPHER = [];
// let DATAACHIEVEMENTS = [];
// let TOTALLIKES = 0;

// function getPhotographer(data) {
//   let totalLikes = 0;
//   let objectPhotographer;
//   for (let photographer of data.photographers) {
//     if (photographer.id === getParam()) objectPhotographer = photographer;
//   }
//   for (let media of data.media) {
//     if (media.photographerId === getParam()) {
//       totalLikes += media.likes;
//     }
//   }
//   totalLikes = { totalLikes: totalLikes };
//   objectPhotographer = { ...totalLikes, ...objectPhotographer };
//   return objectPhotographer;
// }

// function getAchievements(data) {
//   const photographer = getPhotographer(data);
//   const achievements = [];
//   for (let media of data.media) {
//     if (media.photographerId === getParam()) {
//       const name = { name: photographer.name.split(" ")[0] };
//       media = { ...name, ...media };
//       achievements.push(media);
//     }
//   }
//   return achievements;
// }

// function makePhotographerHeader(photographerHeader, photographerModel) {
//   const headerPhotographer = photographerModel.getHeaderPhotographer();
//   photographerHeader.appendChild(headerPhotographer);
// }

// function makeAchievement(index, achievementModel, achievementsSection) {
//   const achievementCardDOM = achievementModel.getAchievementCardDOM(index);
//   achievementsSection.appendChild(achievementCardDOM);
// }

// function makeItemcarrousel(numItem, media) {
//   const item = document.createElement("li");
//   item.className = `carrousel-item item-${numItem}`;
//   item.setAttribute("aria-hidden", numItem === 0 ? false : true);
//   item.style.display = "none";
//   item.innerHTML = `
//     <div role="button" class="controls controls-left">
//       <span class="img prev-image">
//         <i aria-hidden="true" class="fa-solid fa-chevron-left"></i>
//       </span>
//       <p class="sr-only">Previous</p>
//     </div>
//     <div role="button" class="controls controls-right">
//       <span class="img next-image">
//         <i aria-hidden="true" class="fa-solid fa-chevron-right"></i>
//       </span>
//       <p class="sr-only">Next</p>
//     </div>`;
//   item.appendChild(media);
//   return item;
// }

// function makeCarrousel(index, achievementModel, carrouselList) {
//   const mediacarrousel = makeItemcarrousel(
//     index,
//     achievementModel.getMediacarrousel()
//   );
//   carrouselList.appendChild(mediacarrousel);
// }

// function displayData(dataPhotographer, dataAchievements) {
//   const photographerHeader = document.querySelector(".photograph-header");
//   const achievementsSection = document.querySelector(".achievements_section");
//   const carrouselList = document.querySelector("#carrousel-list");

//   const photographerModel = photographerFactory(dataPhotographer);
//   makePhotographerHeader(photographerHeader, photographerModel);

//   dataAchievements.forEach((achievement, index) => {
//     const achievementModel = achievementsFactory(achievement);
//     makeAchievement(index, achievementModel, achievementsSection);
//     makeCarrousel(index, achievementModel, carrouselList);
//   });
//   photographerModel.getCostCardDOM();
// }

// function setNameContact(dataPhotographer) {
//   const modalTitle = document.querySelector(".modal header h2");
//   modalTitle.innerHTML = `Contactez-moi<br/> ${dataPhotographer.name}`;
// }
// function toggleLike(id) {
//   const data = {
//     photographer: DATAPHOTOGRAPHER,
//     achievements: DATAACHIEVEMENTS,
//   };
//   let article = document.getElementById(id);
//   const index = article.dataset.index;
//   let heart = article.querySelector(".fa-heart");
//   heart.classList.toggle("fa-solid");

//   if (heart.classList.contains("fa-solid")) {
//     const achievement = addLikeAchievement(data, id);
//     reMakeAchievement(id, achievement, index);
//     article = document.getElementById(id);
//     heart = article.querySelector(".fa-heart");
//     heart.classList.toggle("fa-solid");
//     article.dataset.liked = true;
//     data.photographer = addLikePhotographer(data, (add = true));
//     reMakeCostCardDom(data.photographer);
//   } else {
//     article.dataset.liked = false;
//     const achievementData = DATAACHIEVEMENTS.find(
//       (element) => element.id === id
//     );
//     reMakeAchievement(id, achievementData, index);
//     data.photographer = addLikePhotographer(data);
//     reMakeCostCardDom(data.photographer);
//   }
// }

// function addLikeAchievement(data, id) {
//   const { achievements } = data;
//   let newAchievement;
//   achievements.forEach((achievement) => {
//     if (achievement.id === id) {
//       newAchievement = { ...achievement };
//       newAchievement.likes = newAchievement.likes + 1;
//     }
//   });
//   return newAchievement;
// }
// function addLikePhotographer(data, add) {
//   let { photographer } = data;
//   add ? (TOTALLIKES += 1) : (TOTALLIKES -= 1);
//   let totalLikes = { totalLikes: TOTALLIKES };
//   photographer = { ...photographer, ...totalLikes };
//   return photographer;
// }

// function reMakeAchievement(id, achievement, index) {
//   const achievementDom = document.getElementById(id);
//   const newAchievementDom =
//     achievementsFactory(achievement).getAchievementCardDOM(index);
//   achievementDom.parentNode.replaceChild(newAchievementDom, achievementDom);
// }

// function reMakeCostCardDom(dataPhotographer) {
//   const costCard = document.querySelector(".cost-card");
//   document.body.removeChild(costCard);
//   photographerFactory(dataPhotographer).getCostCardDOM();
// }

// function reMakeAchievementsSort(achievements) {
//   let newData = {};
//   //remove child
//   const achievementsSection = document.querySelector(".achievements_section");
//   achievementsSection.textContent = "";
//   const carrouselList = document.querySelector("#carrousel-list");
//   carrouselList.textContent = "";

//   achievements.forEach((achievement, index) => {
//     achievement.dataset.index = index;
//     newData = {
//       id: achievement.getAttribute("id"),
//       index: achievement.dataset.index,
//       date: achievement.dataset.date,
//       name: achievement.dataset.name,
//       title: achievement.dataset.title,
//       image: achievement.dataset.image,
//       video: achievement.dataset.video,
//       likes: achievement.dataset.likes,
//       liked: achievement.dataset.liked,
//     };
//     const achievementModel = achievementsFactory(newData);
//     makeAchievement(index, achievementModel, achievementsSection);
//     makeCarrousel(index, achievementModel, carrouselList);
//   });
//   const prevBtn = document.querySelectorAll(".prev-image");
//   const nextBtn = document.querySelectorAll(".next-image");
//   createEventListenerModal(prevBtn, nextBtn);
// }

// async function init() {
//   const data = await fetchDataPhotographers();
//   DATAPHOTOGRAPHER = getPhotographer(data);
//   DATAACHIEVEMENTS = getAchievements(data);
//   TOTALLIKES = DATAPHOTOGRAPHER.totalLikes;
//   displayData(DATAPHOTOGRAPHER, DATAACHIEVEMENTS);
//   setNameContact(DATAPHOTOGRAPHER);
// }

// document.addEventListener("readystatechange", (event) => {
//   if (event.target.readyState === "interactive") {
//     document.querySelector(".lds-dual-ring").style.display = "block";
//     document.body.style.display = "none";
//     init();
//   } else if (event.target.readyState === "complete") {
//     let script = document.createElement("script");
//     script.src = "scripts/utils/carrousel.js";

//     document.body.appendChild(script);
//     document.head.appendChild(script);
//     document.body.style.display = "block";
//     document.querySelector(".lds-dual-ring").style.display = "none";
//   }
// });

class pagePhotograper {
  constructor() {
    this.$haderWrapper = document.querySelector(".photograph-header");
    this.photographerApi = new PhotographersApi("/data/photographers.json");
    this.mediaApi = new MediaApi("./data/photographers.json");
    this.photographerId = window.location.search;
  }

  getId = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
  };

  async main() {
    const photographerData = await this.photographerApi.getPhotographerById(
      this.getId()
    );
    const model = new PhotographerModel(photographerData);
    const template = new PhotographerTemplate(model);
    this.$haderWrapper.appendChild(template.createPhotographerHeader());
    //const mediaData = await this.mediaApi.getMedia();
  }
}

const photographer = new pagePhotograper();
photographer.main();
