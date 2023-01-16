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