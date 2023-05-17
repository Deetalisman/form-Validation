/*let type = document.querySelector('#type');
let show = document.querySelector('.show');
type.addEventListener('click', () =>{
    console.log(show)
    show.classList.toggle('hidden');
});

show.addEventListener('click', () =>{
    console.log(show)
    show.classList.toggle('hidden');
});*/

let emailEl = document.querySelector('#email');
let nameEl = document.querySelector('#name');
let passEl = document.querySelector('#password');
let form = document.querySelector('form');

//  creating utility funstions
const checkEmail  = () => {
       let valid = false;
       const email = emailEl.value.trim();

       if(!isRequired(email)){
        showError(emailEl , 'Email cannot be blank');
       } else if(!isEmailValid(email)){
        showError(emailEl , "Email is not valid");
       } else{
        showSuccess(emailEl)
        valid = true;
       }
       return valid;
   };

   const checkName = () => {
    let valid = false;
    const min = 3,
          max = 25;
    const name = nameEl.value.trim();

    if(!isRequired(name)) {
        showError(nameEl , "Name cannot be blank");
    } else if(!isBetween(name.length,min,max)) {
        showError(nameEl , "Name must be between" + " " + min + " "+"and "  + max + " " + "characters");
    } else{
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
   };

   const checkPassword = () => {
    let valid = false;
    const password = passEl.value.trim();

    if(!isRequired(password)){
        showError(passEl , "Password cannot be blank");
    } else if(!isPasswordSecure(password)){
        showError(passEl,"Password must have 1 uppercase, 1 lowercase,1 number, 1 special character  and must have at least 8 character");
    } else{
        showSuccess(passEl);
        valid = true;
    }
    return valid;
   };


//isRequired amd between
   const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
     };

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
    };

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// function error and success
     const  showError = (input , message) => {
        let formClass = input.parentElement;
      formClass.classList.remove('success');
      formClass.classList.add('error');

      let error = formClass.querySelector("small");
      error.innerHTML = message;

      };

      const showSuccess = (input) => {
        let formClass = input.parentElement;
         formClass.classList.remove('error');
         formClass.classList.add('success')

         let error = formClass.querySelector("small");
         error.innerHTML = "";
      };


form.addEventListener('submit', function(e){
        e.preventDefault();    
      let isEmailValid = checkEmail(),
           isNameValid = checkName(),
           isPasswordValid =  checkPassword();

      let isFormValid = isEmailValid &&
            isNameValid &&
            isPasswordValid;    
            
            if(isFormValid){

            }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
