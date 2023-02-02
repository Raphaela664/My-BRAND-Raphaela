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
function UserRegistration(){
    
    let showData = JSON.parse(localStorage.getItem('SignupFormData'));
    let showDataLastObject = showData.length -1;
    for(let i =0; i<showData.length; i++){
        let div = document.createElement('div');
        div.classList.add('user');
        let containerDiv = document.querySelector('.users-list');
        containerDiv.appendChild(div);
        let html =`<h2>User</h2> 
        <p>${showData[i].username} <br>
        <p>${showData[i].email}<br>
        <p>${showData[i].password}</P>
        <button class="hero-btn delete-btn data">Delete</button>`
        div.insertAdjacentHTML('afterbegin',html);
    }
    
}

function retrieveQueries(){
    
    let showData = JSON.parse(localStorage.getItem('contactFormData'));
    for(let i =0; i<showData.length; i++){
        let div = document.createElement('div');
        div.classList.add('query');
        let containerDiv = document.querySelector('.queries-list');
        containerDiv.appendChild(div);
        let html =`<h2>Query</h2> 
        <p><b>Username:</b> ${showData[i].Name} <br>
        <p><b>Email: </b>${showData[i].Email}<br>
        <p><b>Message: </b>${showData[i].Message}</P>
        <button class="hero-btn delete-btn data">Delete</button>
        `
        div.insertAdjacentHTML('afterbegin',html)
        ;
    }
    
}
function retrieveBlogs(){
    let showData = JSON.parse(localStorage.getItem('blogFormData'));
    

    for(let i =0; i<showData.length; i++){
        let div = document.createElement('div');
        div.classList.add('query');
        let containerDiv = document.querySelector('.tableData');
        containerDiv.appendChild(div);
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        let html = `<tr>
                    <td class="data">${showData[i].title}</td>

                    <td class="data">${currentDate}</td>
                    <td><button class="hero-btn delete-btn data">Delete</button></td>
                    </tr>`;
        div.insertAdjacentHTML('afterbegin',html);
       

        
    }
}
const tableEl = document.querySelector('tbody');
tableEl.addEventListener('click',deleteRow);
const userDiv = document.querySelector('.users-list');
userDiv.addEventListener('click', deleteUserList);
const queryDiv = document.querySelector('.queries-list');
queryDiv.addEventListener('click', deleteRow);

function deleteUserList(){
    if(e.target.classList.contains('delete-btn')){
        const btn = e.target;
        btn.parentNode.parentNode.remove();
        
    }  
}

 function deleteRow(e){
  if(e.target.classList.contains('delete-btn')){
            const btn = e.target;
            btn.parentNode.remove();
            
        }
        
        
    }
