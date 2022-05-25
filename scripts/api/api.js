function api(url) {
  //const url = url;
  async function get(type) {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res[type])
      .catch((err) => console.log("an error occurs", err));
  }

  async function findById(type, id) {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res[type].find((item) => item.id === parseInt(id)))
      .catch((err) => console.log("an error occurs", err));
  }
  async function filderById(type, id) {
    return fetch(url)
      .then((res) => res.json())
      .then((res) =>
        res[type].filter((item) => item.photographerId === parseInt(id))
      )
      .catch((err) => console.log("an error occurs", err));
  }

  function getPhotographers() {
    return get("photographers");
  }
  function getPhotograper(id) {
    return findById("photographers", id);
  }

  function getMedia(id) {
    return filderById("media", id);
  }

  return {
    getPhotographers,
    getPhotograper,
    getMedia,
  };
}
