var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
};
function hideMenu(){
    navLinks.style.right = "-200px";
};

var btnContainer = document.getElementById("navLinks");
var btns = btnContainer.getElementsByClassName("links");

for(var i=0; i<btns.length; i++){
    btns[i].addEventListener('click',function (){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active");
        this.className += " active";

    })
}

function sendQuery(){
    event.preventDefault();
    let contactFormData = JSON.parse(localStorage.getItem('contactFormData')) || [];
    let contactData = {
        Name : document.getElementById("name").value,
        Email : document.getElementById("email").value,
        Message: document.getElementById("message").value

    }
    contactFormData.push(contactData);
    localStorage.setItem('contactFormData', JSON.stringify(contactFormData));

    

}