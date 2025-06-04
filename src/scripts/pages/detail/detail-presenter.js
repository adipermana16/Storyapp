export default class DetailPresenter {
  #storyId;
  #view;
  #model;

  constructor(storyId, { view, model }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#model = model;
  }

  async showStoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showDetailMap error", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showStoryDetail() {
    this.#view.showStoryDetailLoading();
    try {
      const story = await this.#model.getStory(this.#storyId);
      this.#view.populateStoryDetailAndInitialMap(story);
    } catch (error) {
      console.error("showStoryDetailAndMapError", error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
    }
  }

  async saveStory() {
    try {
      await this.#model.saveStory(this.#storyId);
      this.#view.saveToBookmarkSuccessfully("Success to save to bookmark");
    } catch (error) {
      console.error("saveStory: error", error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#model.removeStory(this.#storyId);
      this.#view.removeFromBookmarkSuccessfully(
        "Success to remove from bookmark"
      );
    } catch (error) {
      console.error("removeStory: error", error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  async showSaveButton() {
    if (await this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }

  async #isStorySaved() {
    return await this.#model.isStorySaved(this.#storyId);
  }
}
