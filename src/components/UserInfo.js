export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
      this.nameElement = document.querySelector(nameSelector);
      this.jobElement = document.querySelector(jobSelector);
    }
  
    getUserInfo() {
      return {
        name: this.nameElement.textContent,
        job: this.jobElement.textContent
      };
    }
  
    setUserInfo({ title, job }) {
      this.nameElement.textContent = title;
      this.jobElement.textContent = job;
    }
  }
  