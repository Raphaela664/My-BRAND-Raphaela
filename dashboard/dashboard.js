const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn= document.querySelector("#close-btn");

menuBtn.addEventListener('click', () =>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display='none';
})

var btnContainer = document.getElementById("sidebar");
var btns = btnContainer.getElementsByClassName("link");

for(var i=0; i<btns.length; i++){
    btns[i].addEventListener('click',function (){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active");
        this.className += " active";

    })
}