import * as StoriesAPI from "../../../data/api";

export default class RegisterModel {
  async registerUser(data) {
    return StoriesAPI.getRegistered(data);
  }
}
