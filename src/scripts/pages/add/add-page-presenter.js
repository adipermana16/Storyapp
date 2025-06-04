export default class AddPagePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showLoadingMap();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showNewFormMap: error:", error);
    } finally {
      this.#view.hideLoadingMap();
    }
  }

  async postNewStory({ image, description, lat, lon }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.addStory({
        image: image,
        description: description,
        latitude: lat,
        longitude: lon,
      });

      if (!response.ok) {
        console.error("postStory error:", response);
        this.#view.storeFailed(response.message);
        return;
      }

      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("postStory error:", error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
