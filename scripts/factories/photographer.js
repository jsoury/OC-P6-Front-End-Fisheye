function photographerFactory(data) {
  const { id, portrait, name, city, tagline, price, totalLikes } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const text = document.createElement("p");
    const h2 = document.createElement("h2");

    article.setAttribute("id", id);
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    link.setAttribute(
      "href",
      `${window.location.href}photographer.html?id=${id}`
    );

    h2.textContent = name;
    text.innerHTML = `<span>${city}</span><br/><strong>${tagline}</strong><br/>${price}€/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(text);
    return article;
  }

  function getHeaderPhotographer() {
    const article = document.createElement("article");
    const h1 = document.createElement("h1");
    const text = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    article.setAttribute("id", id);
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    button.className = "contact_button";
    button.setAttribute("onclick", "displayModal()");

    h1.textContent = name;
    text.innerHTML = `<span>${city}</span><br/>${tagline}`;
    button.textContent = "Contactez-moi";

    article.appendChild(text);
    text.prepend(h1);
    article.appendChild(button);
    article.appendChild(img);

    return article;
  }
  function getCostCardDOM() {
    const div = document.createElement("div");
    const body = document.querySelector("body");
    div.className = "cost-card";
    div.innerHTML = `<p><span><span class="total-likes">${totalLikes.toString()}</span> <i class="fa-solid fa-heart" aria-label="count likes"></i> </span>${price}€ / jour</p>`;
    body.appendChild(div);
  }
  return { getHeaderPhotographer, getUserCardDOM, getCostCardDOM };
}
