import * as StoriesAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";

export default class LoginModel {
  async getLogin({ email, password }) {
    try {
      const response = await StoriesAPI.getLogin({ email, password });

      if (!response.ok) {
        console.error("getLogin: response:", response);
        return { success: false, message: response.message };
      }

      AuthModel.putAccessToken(response.loginResult.token);

      return {
        success: true,
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      console.error("getLogin: error:", error);
      return { success: false, message: error.message };
    }
  }
}
