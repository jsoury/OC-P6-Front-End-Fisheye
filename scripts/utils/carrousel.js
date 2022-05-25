const $prevBtn = document.querySelectorAll(".prev-image");
const $nextBtn = document.querySelectorAll(".next-image");
const $carrouselItems = document.querySelectorAll(".carrousel-item");
const $carrouselPauseBtn = document.querySelector(".carrousel-pause-btn");
const $closeBtn = document.querySelector(".carrousel-photographer");

let currentItemPosition = 0;
let carrouselInterval;

// Funcs

function displayCarrousel(index) {
  const carrousel = document.querySelector(".carrousel-photographer");
  currentItemPosition = index;
  let lastItem = null;
  if (currentItemPosition === 0) {
    lastItem = `.item-${$carrouselItems.length - 1}`;
  } else {
    lastItem = `.item-${currentItemPosition - 1}`;
  }
  const currentItem = `.item-${currentItemPosition}`;
  setNodeAttributes(lastItem, currentItem);
  carrousel.style.display = "block";
}

const closeCarrousel = () => {
  document.querySelector(".carrousel-photographer").style.display = "none";
  currentItemPosition = 0;
  document.querySelectorAll(".carrousel-item").forEach((item) => {
    item.style.display = "none";
  });
};
const goToNextSlide = () => {
  if (currentItemPosition + 1 >= $carrouselItems.length) {
    const lastItem = `.item-${currentItemPosition}`;

    currentItemPosition = 0;
    const currentItem = `.item-${currentItemPosition}`;

    setNodeAttributes(lastItem, currentItem);
  } else {
    currentItemPosition += 1;
    const lastItem = `.item-${currentItemPosition - 1}`;
    const currentItem = `.item-${currentItemPosition}`;

    setNodeAttributes(lastItem, currentItem);
  }
};

const goToPreviousSlide = () => {
  if (currentItemPosition - 1 >= 0) {
    currentItemPosition -= 1;
    const currentItem = `.item-${currentItemPosition}`;
    const lastItem = `.item-${currentItemPosition + 1}`;

    setNodeAttributes(lastItem, currentItem);
  } else {
    const lastItem = `.item-${currentItemPosition}`;

    currentItemPosition = $carrouselItems.length - 1;
    const currentItem = `.item-${currentItemPosition}`;

    setNodeAttributes(lastItem, currentItem);
  }
};

const setNodeAttributes = (lastItem, currentItem) => {
  lastItem = document.querySelector(lastItem);
  currentItem = document.querySelector(currentItem);
  lastItem.style.display = "none";
  currentItem.style.display = "block";
  lastItem.setAttribute("aria-hidden", "true");
  currentItem.setAttribute("aria-hidden", "false");
};

const createEventListenerModal = () => {
  const $prevBtn = document.querySelectorAll(".prev-image");
  const $nextBtn = document.querySelectorAll(".next-image");
  $prevBtn.forEach((element) => {
    element.addEventListener("click", goToPreviousSlide);
  }),
    $nextBtn.forEach((element) => {
      element.addEventListener("click", goToNextSlide);
    }),
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        goToNextSlide();
      } else if (event.key === "ArrowLeft") {
        goToPreviousSlide();
      }
    });
};

$prevBtn.forEach((element) => {
  element.addEventListener("click", goToPreviousSlide);
}),
  $nextBtn.forEach((element) => {
    element.addEventListener("click", goToNextSlide);
  }),
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      goToNextSlide();
    } else if (event.key === "ArrowLeft") {
      goToPreviousSlide();
    }
  });

//document.addEventListener("DOMContentLoaded", createEventListenerModal);

// $carrouselPauseBtn.on("click", function () {
//   clearInterval(carrouselInterval);
// });

// $(document).ready(function () {
//   carrouselInterval = setInterval(() => goToNextSlide(), 5000);
// });
