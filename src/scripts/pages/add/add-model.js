import * as StoriesAPI from "../../data/api";

export default class AddModel {
  async addStory(data) {
    return StoriesAPI.addStory(data);
  }
}
