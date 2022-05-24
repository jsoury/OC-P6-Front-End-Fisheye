class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get(data) {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res[data])
      .catch((err) => console.log("an error occurs", err));
  }
  async getById(data, id) {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res[data].find((item) => item.id === parseInt(id)))
      .catch((err) => console.log("an error occurs", err));
  }
}

class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getAllPhotographers() {
    return await this.get("photographers");
  }

  async getPhotographerById(id) {
    return await this.getById("photographers", id);
  }
}

class MediaApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getMedia() {
    return await this.get("media");
  }
}
