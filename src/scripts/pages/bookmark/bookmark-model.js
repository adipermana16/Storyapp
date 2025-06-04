import { storyMapper } from "../../data/api-mapper";
import Database from "../../data/database";

export default class BookmarkModel {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async getAllBookmarkedStories() {
    const rawStories = await this.#db.getAllStories();
    return Promise.all(rawStories.map(storyMapper));
  }

  async getBookmarkedStoryById(id) {
    const story = await this.#db.getStoryById(id);
    return story ? storyMapper(story) : null;
  }
}
