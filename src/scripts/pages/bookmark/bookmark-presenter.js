export default class BookmarkPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialBookmarkStories() {
    this.#view.showStoriesListLoading();

    try {
      const stories = await this.#model.getAllBookmarkedStories();
      this.#view.populateBookmarkStories(
        "Berhasil mendapatkan daftar Story yang tersimpan",
        stories
      );
    } catch (error) {
      console.error("initialBookmarkStories error", error);
      this.#view.populateBookmarkedStoriesError(error.message);
    } finally {
      this.#view.hideStoreListLoading();
    }
  }
}
