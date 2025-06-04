import { storyMapper } from "../../data/api-mapper";
import * as StoriesAPI from "../../data/api";
import Database from "../../data/database";

export default class DetailModel {
  #apiModel;
  #dbModel;

  constructor(apiModel, dbModel) {
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async getStory(storyId) {
    const response = await this.#apiModel.getStoryById(storyId);
    if (!response.ok) {
      throw new Error(response.message);
    }
    return storyMapper(response.story);
  }

  async saveStory(storyId) {
    const story = await this.getStory(storyId);
    await this.#dbModel.putStory(story);
  }

  async removeStory(storyId) {
    await this.#dbModel.removeStory(storyId);
  }

  async isStorySaved(storyId) {
    const story = await this.#dbModel.getStoryById(storyId);
    return !!story;
  }
}
