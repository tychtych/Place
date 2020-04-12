class FormValidator {
    /*
     *@ param {HTMLel} formElem argument is the form
     *
     */
    constructor(formElem) {
        /*
         * inputsElems - selects all inputs in the form
         * submitButton - select a button type
         */
        this.formElem = formElem;
        this.inputElems = this.formElem.querySelectorAll('input');
        this.submitButton = this.formElem.querySelector('button');
        
    }
    /*
     * shows error message if inputs are not valid// hides if inputs are valid
     *
     */
    checkInputValidity(event) {
        const inputElem = event.target;
        
        const errorElem = container.querySelector(`#error-${inputElem.id}`);
        console.log(errorElem);
        if (inputElem.validity.valueMissing) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.valueMissing;
            
        } else if (inputElem.validity.tooShort || inputElem.validity.tooLong) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.tooShort;
            
        } else if (inputElem.validity.typeMismatch) {
            errorElem.classList.remove('error-message__hidden');
            errorElem.textContent = errorMessages.typeMismatch;
        } else {
            errorElem.classList.add('error-message__hidden');
            inputElem.setCustomValidity('');
        }
        //errorElem.textContent = inputElem.validationMessage;
    }

    setSubmitButtonState() {
        if (this.formElem.checkValidity()) {
            this.submitButton.classList.remove('popup__button-disabled');
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.classList.add('popup__button-disabled');
            this.submitButton.setAttribute('disabled', true);
        }
    }

    setEventListeners() {
        
        this.inputElems.forEach(inputElem => {
          
          inputElem.addEventListener('input', this.checkInputValidity.bind(this));
          
        });

        this.formElem.addEventListener('input', this.setSubmitButtonState.bind(this));
      }
}


const editValidationForm = new FormValidator(formEdit);

editValidationForm.setEventListeners();

const addImageValidation = new FormValidator(form);

addImageValidation.setEventListeners();
