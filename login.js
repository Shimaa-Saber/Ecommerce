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
     
     nameError.style.display = "block";  
      return false;  
    } else {
         nameError.textContent = "";  
        nameError.style.display = "none";  
      return true;   
    }
  }
  
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(emailInput.value)) {
      
        emailError.style.display = "block";
      return false;
    } else {
        emailError.textContent = "";
        emailError.style.display = "none";
      return true;
    }
  }
  
  function validatePassword() {
    if (passInput.value.length < 8) {
      
        passError.style.display = "block";
      return false;
    } else {
        passError.textContent = "";
        passError.style.display = "none";
      return true;
    }
  }


  function validateConPass(){
    if(conPassInput.value!=passInput.value){
        conPassError.style.display="block" ;
        return false;
    }else{
        conPassError.textContent="";
        conPassError.style.display="none";
        return true;
    }
  }


  

nameInput.oninput = validateName;
emailInput.oninput = validateEmail;
passInput.oninput = validatePassword;
conPassInput.oninput=validateConPass;
