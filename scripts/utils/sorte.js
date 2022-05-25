const orderBy = (orderBy) => {
  const achievements = document.querySelectorAll(
    ".achievements_section article"
  );
  let achievementsArray = Array.from(achievements);
  var mapped = achievementsArray.map(function (e, i) {
    let value;
    if (orderBy === "likes") value = parseInt(e.dataset[orderBy]);
    else if (orderBy === "date") value = new Date(e.dataset[orderBy]);
    else value = e.dataset[orderBy];

    return { index: i, value: value };
  });
  mapped.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  var result = mapped.map(function (e) {
    return achievementsArray[e.index];
  });
  makePortfolioCardsBySort(result);
  toggleDropdown(orderBy);
};

const toggleDropdown = (orderBy) => {
  const $wrapper = document.querySelector(".dropdown");
  const icon = '<i class="fa fa-caret-down"></i>';
  let orderBtn;

  if (orderBy === "likes") {
    orderBtn = ["likes", "date", "title"];
    $wrapper.textContent = "";
    $wrapper.innerHTML = createDropDown(orderBtn);

    const $btn = document.querySelector(".dropbtn");
    const buttons = document.querySelector(".dropdown-content");

    $btn.innerHTML = `Popularité ${icon}`;
    buttons.children[0].innerText = "Date";
    buttons.children[1].innerText = "Titre";
  } else if (orderBy === "date") {
    orderBtn = ["date", "likes", "title"];
    $wrapper.textContent = "";
    $wrapper.innerHTML = createDropDown(orderBtn);

    const $btn = document.querySelector(".dropbtn");
    const buttons = document.querySelector(".dropdown-content");

    $btn.innerHTML = `Date ${icon}`;
    buttons.children[0].innerText = "Popularité";
    buttons.children[1].innerText = "Titre";
  } else {
    orderBtn = ["title", "date", "likes"];
    $wrapper.textContent = "";
    $wrapper.innerHTML = createDropDown(orderBtn);

    const $btn = document.querySelector(".dropbtn");
    const buttons = document.querySelector(".dropdown-content");

    $btn.innerHTML = `Titre ${icon}`;
    buttons.children[0].innerText = "Date";
    buttons.children[1].innerText = "Popularité";
  }
};

const createDropDown = (orderBtn) => {
  const dropdown = `
  <button class="dropbtn" onclick="orderBy('${orderBtn[0]}')">    
  </button>
  <div class="dropdown-content">
    <a onclick="orderBy('${orderBtn[1]}')"></a>
    <a onclick="orderBy('${orderBtn[2]}')"></a>
  </div>
`;
  return dropdown;
};

console.log("ta mere" + " " + "la pute");
