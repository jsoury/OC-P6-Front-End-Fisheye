/* exported achievementsFactory*/
function achievementsFactory(data) {
  const { date, id, name, title, image, video, likes, liked } = data;
  function getMedia() {
    if (image && image != "undefined") {
      const img = document.createElement("img");
      img.setAttribute("src", `assets/images/${name}/${image}`);
      img.setAttribute("alt", title);
      return img;
    } else {
      const elementVideo = document.createElement("video");
      elementVideo.setAttribute("src", `assets/images/${name}/${video}#t=5`);
      elementVideo.setAttribute("title", title);
      return elementVideo;
    }
  }

  function getAchievementCardDOM(index) {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const text = document.createElement("p");
    article.setAttribute("id", id);
    article.dataset.index = index;
    article.dataset.date = date;
    article.dataset.name = name;
    article.dataset.title = title;
    article.dataset.image = image;
    article.dataset.video = video;
    article.dataset.likes = likes;

    link.setAttribute("onclick", `displayCarrousel(${index})`);

    text.innerHTML = `${title} <span>${likes} <i class="${
      liked ? "fa-solid fa-heart" : "fa-regular fa-heart"
    } fa-regular fa-heart" aria-label="likes" onclick="toggleLike(${id}, ${likes})"></i></span>`;

    article.appendChild(link);
    link.appendChild(getMedia());
    article.appendChild(text);
    return article;
  }

  function getMediacarrousel() {
    const div = document.createElement("div");
    div.className = "carrousel-content";
    const media = getMedia();
    media.className = "carrousel-media";
    video && media.setAttribute("controls", true);
    const text = document.createElement("p");
    text.className = "carrousel-title";
    text.textContent = title;
    div.appendChild(media);
    div.appendChild(text);
    return div;
  }

  return {
    getAchievementCardDOM,
    getMediacarrousel,
  };
}
