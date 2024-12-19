let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passInput = document.getElementById('pass');
let conPassInput = document.getElementById('conpass');
let checkInput = document.getElementById('check');


let nameError = document.getElementById('sname');
let emailError = document.getElementById('semail');
let passError = document.getElementById('spass');
let conPassError = document.getElementById('scpass');
let checkError = document.getElementById('scheck');


function validateName() {
    if (nameInput.value.length <3) {
      nameError.textContent = "Name must be at least 3 characters.";
     nameError.style.display = "block";  
      return false;  
    } else {
       
        nameError.style.display = "none";  
      return true;   
    }
  }
  
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email address.";
        emailError.style.display = "block";
      return false;
    } else {
      
        emailError.style.display = "none";
      return true;
    }
  }
  
  function validatePassword() {
    if (passInput.value.length < 8) {
      passError.textContent = "Password must be at least 8 characters.";
        passError.style.display = "block";
      return false;
    } else {
       
        passError.style.display = "none";
      return true;
    }
  }


  function validateConPass(){
    if(conPassInput.value!=passInput.value){
      conPassError.textContent = "Passwords do not match.";
        conPassError.style.display="block" ;
        return false;
    }else{
       
        conPassError.style.display="none";
        return true;
    }
  }


  

nameInput.oninput = validateName;
emailInput.oninput = validateEmail;
passInput.oninput = validatePassword;
conPassInput.oninput=validateConPass;



function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}


function saveFormDataToCookies() {
  setCookie("name", nameInput.value, 30); 
  setCookie("email", emailInput.value, 30);
  setCookie("password", passInput.value, 30);
}



const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConPassValid = validateConPass();


    if (isNameValid && isEmailValid && isPasswordValid && isConPassValid) {

      saveFormDataToCookies();
      
      const successMessage = document.createElement('div');
      successMessage.textContent = "Form submitted successfully!";
      successMessage.style.color = "green";
      form.appendChild(successMessage);

      

      
      form.submit(); 
      location.assign("./home.html")
  }

    

});