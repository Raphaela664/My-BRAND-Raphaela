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

function signup(){
    
    //console.log('working')
    let SignupFormData = JSON.parse(localStorage.getItem('SignupFormData')) || [];
    signupUser={
        username : document.getElementById('signupUsername').value,
        password : document.getElementById('new-password').value,
        email : document.getElementById("email").value
    }
    let userKeys = Object.keys(signupUser);
    let id = 0000;
    let users = SignupFormData;
    let info = users.filter(obj => userKeys.every(key => obj.hasOwnProperty(key) &&
    obj[key] === signupUser[key]));
    console.log(info);
    if(info.length ===0){
        
       
        SignupFormData.push(signupUser);
        SignupFormData.forEach(function(){
            id++
            let user_id = 'user'+id;
            signupUser.user_id=user_id;
        })
        localStorage.setItem('SignupFormData', JSON.stringify(SignupFormData));
        
    }
    else{
        document.getElementById('signup-form-message').innerText='User already exists';
    }
    
    


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
    var getData= localStorage.getItem('SignupFormData');
    let users = JSON.parse(getData);
    console.log(users);
    let user = {
        username :  document.getElementById('username--email').value,
        password : document.getElementById('login-password').value
    }
    let userKeys = Object.keys(user);
    let LoginFormData;
    let info = users.filter(obj => userKeys.every(key => obj.hasOwnProperty(key) &&
    obj[key] === user[key])); 
    let admin = {
        username : 'Administrator',
        password : 'Test123@'
    }
    let adminKeys = Object.keys(admin);
    let findAdmin=users.filter(obj => adminKeys.every(key => obj.hasOwnProperty(key) &&
    obj[key] === admin[key]));
    console.log(info.length);
    console.log(adminKeys.length);
    console.log(admin);
    console.log(user);
    if(info.length!==0){
        if(JSON.stringify(admin)!==JSON.stringify(user)){
            for(let i=0; i<users.length; i++){
                if(users[i].username === user.username && users[i].password === user.password){
                    user.user_id = users[i].user_id;
                    
                }
                
            }
            LoginFormData = JSON.parse(localStorage.getItem('LoginFormData')) || [];
            
            LoginFormData.push(user);
            localStorage.setItem('LoginFormData', JSON.stringify(LoginFormData));
            console.log('it works');
             location.assign('../blog.html');
         }
         else{
            LoginFormData = JSON.parse(localStorage.getItem('LoginFormData')) || [];
            LoginFormData.push(user);
            localStorage.setItem('LoginFormData', JSON.stringify(LoginFormData));
            console.log('Admin here');
            location.assign('../dashboard.html');
         }
    }
    else{
        document.getElementById('login_form_message_error').innerText='Wrong Username/Password Combination';
       
    }
     
        
        
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

const findState = ()=>{
   
    const status = document.querySelector('#Login');
    const success = (position) =>{
        console.log(position);
    }
    const error = ()=>{
        status.textContent = 'Unable to retrieve your location';
    }
    navigator.geolocation.getCurrentPosition(success,error);

}
document.querySelector('#Login-button').addEventListener('click', findState);