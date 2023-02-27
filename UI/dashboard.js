const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn= document.querySelector("#close-btn");
const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
let token = JSON.parse(localStorage.getItem('bearer-token'));
menuBtn.addEventListener('click', () =>{
    sideMenu.style.display='block';
})

closeBtn.addEventListener('click', ()=>{
    sideMenu.style.display='none';
})
//const adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjM2QxNjQyMDQ2ZDZiOWZhNTIxMmEiLCJpYXQiOjE2Nzc0NzUxMzN9.TNCJYFHQT_V6qCjM8IPakgRQlH44J4DchtQVMvCJG1k"
var btnContainer = document.getElementById("sidebar");
var btns = btnContainer.getElementsByClassName("link");

for(var i=0; i<btns.length; i++){
    btns[i].addEventListener('click',function (){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active");
        this.className += " active";

    })
}

function logout(){
    localStorage.setItem('bearer-token',null);
    token=null;
}

if(!token){
    const checklogin = document.getElementById('loginOrOut');
    checklogin.textContent = 'Login';
}
else{
    const checklogin = document.getElementById('loginOrOut');
    checklogin.textContent = 'Logout';
    const logoutBtn = document.querySelector('#logout');
    logoutBtn.addEventListener('click', logout);
}
function UserRegistration(){
    fetch (baseUrl+'user/login/admin/listOfUsers',{
        headers:{
            'bearer-token':token
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        for(let i =0; i<data.length; i++){
            let div = document.createElement('div');
            div.classList.add('user');
            div.setAttribute('data-userid', data[i]._id);
            let containerDiv = document.querySelector('.users-list');
            containerDiv.appendChild(div);
            let html =`<h2>User</h2> 
            <p>${data[i].username} <br>
            <p>${data[i].email}<br>
            <p>${data[i].password}</P>
            <button class="hero-btn delete-btn data">Delete</button>`
            div.insertAdjacentHTML('afterbegin',html);
        }
        
    const userDiv = document.querySelector('.users-list');
    userDiv.addEventListener('click', deleteUser);
    })
       
}

function deleteUser(e){
    if(e.target.classList.contains('delete-btn')){
      const rowElement = e.target.parentNode;
      console.log(rowElement)
      const userId = rowElement.getAttribute('data-userid'); // get the blog id from the row element
      console.log(userId)
      rowElement.remove(); // remove the row element from the DOM
  
      // make a DELETE request to your API to delete the blog from the database
      fetch(baseUrl + `user/login/admin/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'bearer-token': token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('User deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the User account:', error);
      });
        
    }  
}

async function retrieveQueries(){
    
    fetch (baseUrl+'queries/queriesList',{
        headers:{
            'bearer-token':token
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        for(let i =0; i<data.length; i++){
            let div = document.createElement('div');
            div.classList.add('query');
            div.setAttribute('data-queryid', data[i]._id);
            let containerDiv = document.querySelector('.queries-list');
            containerDiv.appendChild(div);
            let html =`<h2>Query</h2> 
            <p><b>Username:</b> ${data[i].name} <br>
            <p><b>Email: </b>${data[i].email}<br>
            <p><b>Message: </b>${data[i].message}</P>
            <button class="hero-btn delete-btn data">Delete</button>
            `
            div.insertAdjacentHTML('afterbegin',html);
        }
        const rowEl = document.querySelector('.queries-list');
        rowEl.addEventListener('click',deleteQuery);
    })
    
    
}
function deleteQuery(e){
    if(e.target.classList.contains('delete-btn')){
      const rowElement = e.target.parentNode;
      console.log(rowElement)
      const queryId = rowElement.getAttribute('data-queryid'); // get the blog id from the row element
      console.log(queryId)
      rowElement.remove(); // remove the row element from the DOM
  
      // make a DELETE request to your API to delete the blog from the database
      fetch(baseUrl + `queries/deleteQuery/${queryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'bearer-token': token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Query deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the query:', error);
      });
        
    }  
}
/*function deleteQuery(e){
    if(e.target.classList.contains('delete-btn')){
        const btn = e.target;
        btn.parentNode.parentNode.remove();
        
    }  
}*/

function retrieveBlogs(){

    fetch (baseUrl+'blogs/All',{
        headers:{
            'bearer-token':token
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        console.log(data);
        for(let i =0; i<data.length; i++){
            let containerDiv = document.querySelector('.tableData');
            let html = `<tr data-blogid="${data[i]._id}">
                        <td>${data[i].title}</td>
                        <td>${data[i].createdAt}</td>
                        <td colspan="2" class="cell-wrapper">
                        <div ><button class="hero-btn delete-btn data" class="cell">Delete</button></div>
                        <div><button class="hero-btn update-btn data" class="cell">Update</button></div>
                        </td>
                        </tr>`;
            containerDiv.insertAdjacentHTML('afterbegin',html);
           
        
        }
        const tableEl = document.querySelector('.tableEl');
        tableEl.addEventListener('click',deleteBlog);
        const updateEl = document.querySelector('.tableEl')
        updateEl.addEventListener('click',UpdateBlog);
    })

    let showData = JSON.parse(localStorage.getItem('blogFormData'));
    

   
}

   



function UpdateBlog(e) {
   
    if (e.target.classList.contains('update-btn')) {
      const rowElement = e.target.parentNode.parentNode.parentNode;
      window.location.href = "./addblog.html"
      const blogId = rowElement.getAttribute('data-blogid'); // get the blog id from the row element
      console.log(blogId)
      
      
      fetch(baseUrl + `blogs/viewblog/${blogId}`, {
        headers: {
          'bearer-token': token
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => {
        
        document.getElementById('title').value = data.title;
        document.getElementById('message').value = data.blogContent;
        document.getElementById('imageF').value = data.image
  
        // Handle the update when the user submits the form
        const formEl = document.querySelector('form');
        formEl.addEventListener('submit', event => {
          event.preventDefault();
          // Perform the update
          fetch(baseUrl + `blogs/updateBlog/${blogId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'bearer-token': token
            },
            body: JSON.stringify({
              title: document.getElementById('title').value,
              blogContent: document.getElementById('message').value,
              // ... include other input values as necessary
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log('Blog updated successfully');
            // Reload the page to see the updated data
            location.reload();
          })
          .catch(error => {
            console.error('There was an error updating the blog:', error);
          });
        });
      })
      .catch(error => {
        console.error('There was an error fetching the blog data:', error);
      });
    }
  }


function deleteBlog(e) {
    if (e.target.classList.contains('delete-btn')) {
      console.log(e.target.parentNode.parentNode); // log the row element
      const rowElement = e.target.parentNode.parentNode.parentNode;
      const blogId = rowElement.getAttribute('data-blogid'); // get the blog id from the row element
      console.log(blogId)
      rowElement.remove(); // remove the row element from the DOM
  
      // make a DELETE request to your API to delete the blog from the database
      fetch(baseUrl + `blogs/deleteBlog/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'bearer-token': token
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Blog deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the blog:', error);
      });
    }
  }
  

