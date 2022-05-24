class App {
  constructor() {
    this.$photograperWrapper = document.querySelector(".photographer_wrapper");
    this.$loader = document.querySelector(".lds-dual-ring");
    this.$main = document.querySelector("main");
    this.photographerApi = new PhotographersApi("/data/photographers.json");
    this.mediaApi = new MediaApi("./data/photographers.json");
  }

  displayMain = function () {
    this.$main.style.display = "block";
    this.$loader.style.display = "none";
  };

  async main() {
    const photographersData = await this.photographerApi.getAllPhotographers();
    const mediaData = await this.mediaApi.getMedia();

    const photographers = await photographersData.map(
      (photographer) => new PhotographerModel(photographer)
    );
    await photographers.forEach((photographer) => {
      const template = new PhotographerTemplate(photographer);
      this.$photograperWrapper.appendChild(template.createPhotographerCard());
    });
  }
}

const app = new App();
app.main();
setTimeout(app.displayMain(), 3000);
