function carrouselFactory(data) {
  const { title, video } = data;

  function createItemCarrousel(numItem) {
    const $item = document.createElement("li");
    $item.className = `carrousel-item item-${numItem}`;
    $item.setAttribute("aria-hidden", numItem === 0 ? false : true);
    $item.innerHTML = `
      <div role="button" class="controls controls-left">
        <span class="img prev-image">
          <i aria-hidden="true" class="fa-solid fa-chevron-left"></i>
        </span>
        <p class="sr-only">Previous</p>
      </div>
      <div role="button" class="controls controls-right">
        <span class="img next-image">
          <i aria-hidden="true" class="fa-solid fa-chevron-right"></i>
        </span>
        <p class="sr-only">Next</p>
      </div>`;
    $item.appendChild(createMediaCarrousel());
    return $item;
  }

  function createMediaCarrousel() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "carrousel-content";
    const $media = createMedia(data);
    $media.className = "carrousel-media";
    video && $media.setAttribute("controls", true);
    const $mediaText = document.createElement("p");
    $mediaText.className = "carrousel-title";
    $mediaText.textContent = title;
    $wrapper.appendChild($media);
    $wrapper.appendChild($mediaText);
    return $wrapper;
  }
  return { createItemCarrousel };
}
