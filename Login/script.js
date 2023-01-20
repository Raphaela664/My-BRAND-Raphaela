/*function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`)
}*/

function setInputError(inputElement, message){
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent=message;

}
function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent="";
}

function signup(e){
    event.preventDefault();
    //console.log('working')
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    formData.push({
        username : document.getElementById('signupUsername').value,
        password : document.getElementById('new-password').value,
        email : document.getElementById("email").value
    })
        
    localStorage.setItem('formData', JSON.stringify(formData));
    


}

document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount")

    document.querySelector("#linkCreateAccount").addEventListener("click",e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

    });
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        
    });
    /*loginForm.addEventListener("submit", e =>{
        e.preventDefault();

        setFormMessage(loginForm, "error", "Invalid username/password combination")
    });*/
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e=>{
            if(e.target.id === "signupUsername" && e.target.value.length>0 && e.target.value.length<10){
                setInputError(inputElement, "Username must be at least 10 characters");
            }
        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});



function login(e){
    event.preventDefault();
    //console.log('working')
    var enterUsername =  document.getElementById('username--email').value;
    var enterPass = document.getElementById('password');

    var getData= localStorage.getItem('formData');
    
    if(JSON.parse(getData));


}
function verifyPass(){
    var upass = document.sign.password1.value;
    var cpass = document.sign.password2.value;
    
    if(upass ==cpass){
       
        document.getElementById("confirm").innerText="OK";
        
    }
    else{
        document.getElementById("confirm").innerText = "Please make sure passwords are the same"
    }
}
function validateEmail(){
    
    var email = document.getElementById('email').value;
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email.match(pattern)){
        document.getElementById('email-error').innerText = "This email Id is valid";
    }else{
        document.getElementById('email-error').innerText = "This email Id is invalid";
    }
   
    
  
}