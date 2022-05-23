async function fetchDataPhotographers() {
  try {
    const response = await fetch("../../data/photographers.json");
    const photographers = await response.json();
    return photographers;
  } catch (error) {
    console.log("Fetch error: ", error);
  }
}
