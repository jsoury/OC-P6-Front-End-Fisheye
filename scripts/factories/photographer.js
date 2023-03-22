function photographerFactory(data) {
  const { id, portrait, name, city, country, tagline, price, totalLikes } =
    data;

  function createPhotographerCard() {
    const $article = document.createElement("article");
    $article.setAttribute("id", id);
    const photographerCard = `
      <a href=${window.location.href}photographer.html?id=${id}>
          <img 
              alt="" 
              src="./assets/photographers/${portrait}"
          />
          <h2>${name}</h2>
      </a>
      <span>${city}, ${country}</span><br/>
      <strong>${tagline}</strong><br/>
      ${price}€/jour
  `;
    $article.innerHTML = photographerCard;
    return $article;
  }

  function createPhotographerHeader() {
    const $wrapper = document.createElement("article");
    $wrapper.classList.add("wrapper");

    const photographerHeader = `
      <div class="text">
        <h1>${name}</h1>
        <p>
          <span>
            ${city}, ${country}
          </span>
          <br/>
          ${tagline}
        </p>
      </div>
        <button class= "contact_button" onclick= "displayModal()" id= "btn_open_modal">
          Contactez-moi
        </button>
        <img src="/assets/photographers/${portrait}" 
          alt=""
        />
      `;

    $wrapper.innerHTML = photographerHeader;
    return $wrapper;
  }

  function createStickyTotalLikes() {
    const $wrapper = document.createElement("aside");
    $wrapper.classList.add("cost-card");
    const stickyTotalLikes = `
      <p>
        <span>
          <span class="total-likes">
            ${totalLikes.toString()}
          </span> 
          <i class="fa-solid fa-heart" aria-hidden="true"></i> 
        </span>
        ${price}€ / jour
      </p>
    `;
    $wrapper.innerHTML = stickyTotalLikes;
    return $wrapper;
  }
  return {
    createPhotographerHeader,
    createPhotographerCard,
    createStickyTotalLikes,
  };
}
