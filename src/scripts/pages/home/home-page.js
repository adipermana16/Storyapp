import HomePresenter from "./home-page-presenter";
import HomeModel from "./home-page-model";
import {
  generateLoaderAbsoluteTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
  generateStoryItemTemplate,
} from "../../template";

export default class HomePage {
  constructor() {
    this.storiesListContainer = null;
    this.loadingContainer = null;
    this.presenter = new HomePresenter(this, new HomeModel());
  }

  async render() {
    return `
      <section class="container">
        <h1 class="section-title">List Story</h1>
        
        <div class="stories-list__container">
            <div id="stories-list"></div>
            <div id="stories-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.storiesListContainer = document.getElementById("stories-list");
    this.loadingContainer = document.getElementById(
      "stories-list-loading-container"
    );
    await this.presenter.initialStories();
  }

  populateStoriesList(message, listStory) {
    if (listStory.length <= 0) {
      this.populateStoriesListEmpty();
      return;
    }

    const html = listStory.reduce((acc, story) => {
      return acc.concat(
        generateStoryItemTemplate({
          id: story.id,
          name: story.name,
          description: story.description,
          photoUrl: story.photoUrl,
          createdAt: story.createdAt,
          location: { latitude: story.lat, longitude: story.lon },
        })
      );
    }, "");

    this.storiesListContainer.innerHTML = `
      <div class="stories-list">${html}</div>
    `;
  }

  populateStoriesListEmpty() {
    this.storiesListContainer.innerHTML = generateStoriesListEmptyTemplate();
  }

  populateStoriesListError(message) {
    this.storiesListContainer.innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  showLoading() {
    this.loadingContainer.innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    this.loadingContainer.innerHTML = "";
  }
}
