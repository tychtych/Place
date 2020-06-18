class UserInfo {
    /*
     *@param {HTMLEl} form HTML element
     *@param {HTMLEL} user-info__data div element
     */
    constructor(userInfoForm, userInfoDiv) {
        this.userInfoForm = userInfoForm;
        this.userInfoDiv = userInfoDiv;
    }
    /*
     *@ param {}
     * sets new value info in inputs
     */
    setUserInfo(updatedName, updatedJob, avatar) {
        this.userName = updatedName;
        this.userJob = updatedJob;
        this.avatar = avatar;
    }
    /*
     *@ param {}
     * displays info on the page
     * updated name and job are assigned to inputs and divs
     */
    updateUserInfo() { 
        this.userInfoForm.querySelector('.popup__input_type_Editname').value = this.userName;
        this.userInfoForm.querySelector('.popup__input_type_Editlink-url').value = this.userJob;
        this.userInfoDiv.querySelector('.user-info__name').textContent = this.userName;
        this.userInfoDiv.querySelector('.user-info__job').textContent = this.userJob;
        this.userInfoDiv.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${this.avatar})`)
    }
}