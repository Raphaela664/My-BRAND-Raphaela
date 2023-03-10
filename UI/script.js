const token = JSON.parse(localStorage.getItem('bearer-token'))


function logoutFunc(){
  localStorage.setItem('bearer-token',null)
  token=null;
}
if(!token){
    const checklogin = document.getElementById('loginOrOut')
    checklogin.textContent = 'Login'
}
else{
    const checklogin = document.getElementById('loginOrOut')
    checklogin.textContent = 'Logout'
    const logout = document.querySelector('#loginOrOut')
    logout.addEventListener('click',logoutFunc);
}

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



async function sendQuery(e){
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
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
   
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    let getData = JSON.parse(localStorage.getItem('blogFormData'));
   
    const adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmN2VjYjgxY2UwN2JmNjY5OGMyZGUiLCJpYXQiOjE2NzY4Njg1ODh9.VoXkQ7F9XhXOgKq54y5fUqyQ14N8W3mvdEVA8jL1X4k"
    fetch (baseUrl+'blogs/All',{
        headers:{
            'bearer-token':adminToken
        }
    })
    .then(res=>{
        return res.json();
    })
    .then(data =>{
        
        let containerDiv = document.querySelector('#blog');
        for(let i=0; i<data.length; i++){
            
            let countLikes=data[i].blog_likes.length;
            let Pardiv = document.createElement('div');
            Pardiv.classList.add('blog-row');
            
            containerDiv.appendChild(Pardiv);
            let childDiv1 = document.createElement('div');
            childDiv1.classList.add('blog-col');
            let childDiv2 = document.createElement('div');
            childDiv2.classList.add('blog-col');
            const img = new Image();
            img.src = data[i].image;
            childDiv1.appendChild(img);
            Pardiv.appendChild(childDiv1);
            Pardiv.appendChild(childDiv2);

            let html =`<h3>${data[i].title}</h3><br>
                       <p>${data[i].blogContent}</p>
                       <p><b>Author: </b>Raphaela MAHORO</p>
                       <a href="" class="go-to-blog" data-blogid="${data[i]._id}">Read More...</a>
                       <div class="reaction">
                       <i class="fa fa-thumbs-up"></i><p>${data[i].blog_likes.length}</p>
                       <i class="fa fa-comment"></i><p>${data[i].blog_comments.length}</p>
                       </div>`


            
            childDiv2.insertAdjacentHTML('afterbegin',html);
    
        
        
    
        }
        containerDiv.addEventListener('click', (e)=>singleBlogPost(containerDiv,e))
           
            
                
            
        
        })
}




function singleBlogPost(containerDiv, e) {
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    if (e.target.classList.contains('go-to-blog')) {
        e.preventDefault();
        const blogId = e.target.dataset.blogid;
        let getData = JSON.parse(localStorage.getItem('blogFormData'));
        
        
        if(!token){
            window.location.href ="login/login.html"
        }else{
            fetch(baseUrl + 'blogs/viewblog/' + blogId, {
                method: "GET",
                headers: {
                    'bearer-token': token
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    
                    localStorage.setItem('blogData', JSON.stringify(data));
                    // Redirect to the other page
                    window.location.href = "blog.html";
    
    
                })
        }
        

    }
}


 function BlogPost(){
    const data= JSON.parse(localStorage.getItem('blogData'));
    const title = document.getElementById("title");
    title.textContent = data.title;
    let myImage = document.getElementById("newImage");
    myImage.src = data.image;
    let blogContent = document.getElementById("blogContent");
    blogContent.textContent = data.blogContent;
   
    let blog_comments =data.blog_comments;
    let blog_likes = data.blog_likes;
    let blog_LikesCount = blog_likes.length;
    let blog_commentsCount = blog_comments.length
    const likesCount = document.querySelector('.count');
    likesCount.textContent=blog_likes.length
    const commentsCount = document.querySelector('.commentsCount')
    commentsCount.textContent = blog_comments.length
    console.log(blog_comments)
    for(let i =0 ; i<blog_comments.length; i++){
        let div = document.createElement('div');
        div.classList.add('comments');
        let containerDiv = document.querySelector('#comments-post');
        containerDiv.appendChild(div);
        let html = `<p><b>${blog_comments[i].user_id}</b></p><br>
        <p>${blog_comments[i].comment}<p> <br>
        <span>${blog_comments[i].date}</span>`;
        div.insertAdjacentHTML('afterbegin',html);

        
    }

}






let popup = document.getElementById('popup')
function openPopup(){
    popup.classList.add('open-popup')
}
function closePopup(){
    popup.classList.remove('open-popup')
}


window.addEventListener('load', showDashboard);
function showDashboard(){
    let showDash = document.getElementById('hideDash');
    let decodedToken = JSON.parse(atob(token.split(".")[1]));
    if(decodedToken._id == '63fc3d1642046d6b9fa5212a'){
        showDash.classList.remove('hide');
    }
    else{
        showDash.classList.add('hide')
    }
    
}
