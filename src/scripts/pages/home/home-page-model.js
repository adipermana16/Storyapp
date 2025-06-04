import * as StoriesAPI from "../../data/api";

export default class HomeModel {
  async getAllStories() {
    try {
      return await StoriesAPI.getAllStories();
    } catch (error) {
      console.error("HomeModel.getAllStories error:", error);
      throw error;
    }
  }
}
