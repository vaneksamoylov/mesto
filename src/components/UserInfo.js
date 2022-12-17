export default class UserInfo {
  constructor({ profileUsername, profileJob, profileAvatar }) {
    this._profileUsername = document.querySelector(profileUsername);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      user: this._profileUsername.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserAvatar(userInfo) {
    this._profileAvatar.src = userInfo.avatar;
  }

  setUserInfo(userInfo) {
    this._profileUsername.textContent = userInfo.name;
    this._profileJob.textContent = userInfo.about;
  }
}
