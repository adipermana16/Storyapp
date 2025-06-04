export default class LoginPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getLogin({ email, password }) {
    this.#view.showSubmitLoadingButton();

    const result = await this.#model.getLogin({ email, password });

    if (result.success) {
      this.#view.loginSuccessfully(result.message);
    } else {
      this.#view.loginFailed(result.message);
    }

    this.#view.hideSubmitLoadingButton();
  }
}
