const orderBy = (orderBy) => {
  console.log(orderBy);
  const achievements = document.querySelectorAll(
    ".achievements_section article"
  );
  let achievementsArray = Array.from(achievements);
  console.log(achievementsArray);
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
  console.log(result);
  reMakeAchievementsSort(result);
};
