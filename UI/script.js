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

const queryBtn = document.getElementById('sendQueryBtn');
queryBtn.addEventListener("click", sendQuery);
const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";


async function sendQuery(e){
    e.preventDefault();
    
    const res = await fetch(baseUrl+"queries/SendQuery",{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name : document.getElementById("name").value,
            email : document.getElementById("email").value,
            message: document.getElementById("message").value
        })
    })
    const query = await res.json();
    console.log(query);
    let contactFormData = JSON.parse(localStorage.getItem('contactFormData')) || [];
    let contactData = {
        Name : document.getElementById("name").value,
        Email : document.getElementById("email").value,
        Message: document.getElementById("message").value

    }
    contactFormData.push(contactData);
    localStorage.setItem('contactFormData', JSON.stringify(contactFormData));

    

}
function PostCreatedBlog() {
    
    let getData = JSON.parse(localStorage.getItem('blogFormData'));

    for(let i=0; i<getData.length; i++){
        let Pardiv = document.createElement('div');
        Pardiv.classList.add('blog-row');
        let containerDiv = document.querySelector('#blog');
        containerDiv.appendChild(Pardiv);
        let childDiv1 = document.createElement('div');
        childDiv1.classList.add('blog-col');
        let childDiv2 = document.createElement('div');
        childDiv2.classList.add('blog-col');
        const img = new Image();
        img.src = getData[i].image;
        childDiv1.appendChild(img);
        Pardiv.appendChild(childDiv1);
        Pardiv.appendChild(childDiv2);
        let html =`<h3>${getData[i].title}</h3><br>
                   <p>${getData[i].messageContent}</p>
                   <p><b>Author: </b>Raphaela MAHORO</p>
                   <a href="./blog.html">Read More...</a>
                   <div class="reaction">
                   <i class="fa fa-thumbs-up"></i><p>8</p>
                   <i class="fa fa-comment"></i><p>0</p>
                   </div>

        `
        childDiv2.insertAdjacentHTML('afterbegin',html);

    
    

}
}

let popup = document.getElementById('popup')
function openPopup(){
    popup.classList.add('open-popup')
}
function closePopup(){
    popup.classList.remove('open-popup')
}