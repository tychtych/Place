class UserInfo {
    /*
     *@param {string} userName stores user's name
     *@param {string} userJob stores user's job
     *@param {HTMLEl} form HTML element
     *@param {HTMLEL} user-info__data div element
     */
    constructor(userName, userJob, userInfoForm, userInfoDiv) {
        this.userName = userName;
        this.userJob = userJob;
        // TODO
        this.userInfoForm = userInfoForm;
        this.userInfoDiv = userInfoDiv;
    }
    /*
     *@ param {}
     * sets new value info in inputs
     */
    setUserInfo(updatedName, updatedJob) {
        this.userName = updatedName;
        this.userJob = updatedJob;

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
    }
}
const nameInput = popUpEditWindow.querySelector('.popup__input_type_Editname');
const jobInput = popUpEditWindow.querySelector('.popup__input_type_Editlink-url');
const userDiv = document.querySelector('.user-info__data');
const userInforName = userDiv.querySelector('.user-info__name');
const userInfoNameVal = userInforName.textContent;
const userInfoJob = userDiv.querySelector('.user-info__job');
const userInfoJobVal = userInfoJob.textContent;
const formEdit = document.forms.popupEdit;

const newEditUserInfo = new UserInfo(userInfoNameVal, userInfoJobVal, formEdit, userDiv);

newEditUserInfo.updateUserInfo();

formEdit.addEventListener('submit', function (event) {
    
    event.preventDefault();
    newEditUserInfo.setUserInfo(nameInput.value, jobInput.value);
    newEditUserInfo.updateUserInfo();
    cardEditPopup.close();
})

