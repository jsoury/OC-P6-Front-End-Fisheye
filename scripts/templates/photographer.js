class PhotographerTemplate {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const $article = document.createElement("article");
    $article.setAttribute("id", this._photographer.id);
    const photographerCard = `
        <a href=${window.location.href}photographer.html?id=${this._photographer.id}>
            <img 
                alt="${this._photographer.name}" 
                src="${this._photographer.portrait}"
            />
            <h2>${this._photographer.name}</h2>
        </a>
        <span>${this._photographer.city}, ${this._photographer.country}</span><br/>
        <strong>${this._photographer.tagline}</strong><br/>
        ${this._photographer.price}€/jour
    `;

    $article.innerHTML = photographerCard;
    return $article;
  }

  createPhotographerHeader() {
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("wrapper");

    const photographerHeader = `
      <div class="text">
        <h1>${this._photographer.name}</h1>
        <p>
          <span>
            ${this._photographer.city}, ${this._photographer.country}
          </span>
          <br/>
          ${this._photographer.tagline}
        </p>
      </div>
        <button class="contact_button" onclick="displayModal()">
          Contactez-moi
        </button>
        <img src="${this._photographer.portrait}" 
          alt="${this._photographer.name}"
        />
      `;

    $wrapper.innerHTML = photographerHeader;
    return $wrapper;
  }
}
