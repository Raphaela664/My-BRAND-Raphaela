const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn= document.querySelector("#close-btn");
const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
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
    fetch (baseUrl+'user/login/admin/listOfUsers',{
        headers:{
            'bearer-token':adminToken
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        for(let i =0; i<data.length; i++){
            let div = document.createElement('div');
            div.classList.add('user');
            let containerDiv = document.querySelector('.users-list');
            containerDiv.appendChild(div);
            let html =`<h2>User</h2> 
            <p>${data[i].username} <br>
            <p>${data[i].email}<br>
            <p>${data[i].password}</P>
            <button class="hero-btn delete-btn data">Delete</button>`
            div.insertAdjacentHTML('afterbegin',html);
        }
    })
       
}
const adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmN2VjYjgxY2UwN2JmNjY5OGMyZGUiLCJpYXQiOjE2NzY4Njg1ODh9.VoXkQ7F9XhXOgKq54y5fUqyQ14N8W3mvdEVA8jL1X4k"

async function retrieveQueries(){
    
    fetch (baseUrl+'queries/queriesList',{
        headers:{
            'bearer-token':adminToken
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        for(let i =0; i<data.length; i++){
            let div = document.createElement('div');
            div.classList.add('query');
            let containerDiv = document.querySelector('.queries-list');
            containerDiv.appendChild(div);
            let html =`<h2>Query</h2> 
            <p><b>Username:</b> ${data[i].name} <br>
            <p><b>Email: </b>${data[i].email}<br>
            <p><b>Message: </b>${data[i].message}</P>
            <button class="hero-btn delete-btn data">Delete</button>
            `
            div.insertAdjacentHTML('afterbegin',html)
            ;
        }
    })
    
    
}
function retrieveBlogs(){

    fetch (baseUrl+'blogs/All',{
        headers:{
            'bearer-token':adminToken
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        console.log(data);
        for(let i =0; i<data.length; i++){
            let div = document.createElement('div');
            div.classList.add('query');
            let containerDiv = document.querySelector('.tableData');
            containerDiv.appendChild(div);
            let html = `<tr>
                        <td class="data">${data[i].title}</td>
                        <td class="data">${data[i].createdAt}</td>
                        <td><button class="hero-btn delete-btn data">Delete</button></td>
                        </tr>`;
            div.insertAdjacentHTML('afterbegin',html);
           
    
            
        }
    })

    let showData = JSON.parse(localStorage.getItem('blogFormData'));
    

   
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
