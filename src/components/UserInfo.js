export default class UserInfo {
  constructor({ profileUsername, profileJob}) {
    this._profileUsername = document.querySelector(profileUsername);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      user: this._profileUsername.textContent,
      job: this._profileJob.textContent,
    }
  }

  setUserInfo(userInfo) {
    this._profileUsername.textContent = userInfo.user;
    this._profileJob.textContent = userInfo.job;
  }
}