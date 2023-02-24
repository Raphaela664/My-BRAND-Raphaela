
let image;
document.querySelector('#imageF').addEventListener('change', function(){
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.addEventListener('load',()=>{
        image = reader.result;
    })

})
async function blogSubmit(e){
    event.preventDefault();
    //console.log('working')
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    const adminToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VmN2VjYjgxY2UwN2JmNjY5OGMyZGUiLCJpYXQiOjE2NzY4Njg1ODh9.VoXkQ7F9XhXOgKq54y5fUqyQ14N8W3mvdEVA8jL1X4k"
    
    let blogFormData = JSON.parse(localStorage.getItem('blogFormData')) || [];
    let blogData = {
        title : document.getElementById('title').value,
        //date : document.getElementById('date').value,
        image: image,
        messageContent: document.getElementById('message').value
    }
    blogFormData.push(blogData);
        
    localStorage.setItem('blogFormData', JSON.stringify(blogFormData));
    
    await fetch(baseUrl+'blogs/newblog',{
        method: "POST",
        headers:{
            'bearer-token':adminToken,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title : document.getElementById('title').value,
            //date : document.getElementById('date').value,
            image: image,
            blogContent: document.getElementById('message').value
        })
    })

}



async function blogComment(){
    
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    let username;
    let getCommentData = JSON.parse(localStorage.getItem('getCommentData')) 
    const date = new Date();
    if(!token){
        window.location.href = "login/login.html"
    }else{
    decodedToken = JSON.parse(atob(token.split(".")[1]));
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    var comments = {
        comment:document.getElementById('message').value
        //date : currentDate,
        //user_id: getLoginInfo[lastItem].user_id
    } 
    
    localStorage.setItem('getCommentData',JSON.stringify(comments));
    const blogdata= JSON.parse(localStorage.getItem('blogData'));
    const blogId = blogdata._id
    console.log(blogId);
    await fetch(baseUrl+'blogs/comments/create/'+blogId,{
        method: "POST",
        headers:{
            'bearer-token':token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: decodedToken._id,
            comment: document.getElementById('message').value,
            blog_id:blogId
        })
    })
    

    /*
    let div = document.createElement('div');
    div.classList.add('comments');
    let containerDiv = document.querySelector('#comments-post');
    containerDiv.appendChild(div);
    let showComment = JSON.parse(localStorage.getItem('getCommentData'))
    let html =`<p><b>${decodedToken._id} </b><p>
                <p>${showComment.comment}</P> <br>
               <span>${comments.date}</span>`;

    div.insertAdjacentHTML("beforeend", html);
    localStorage.setItem('getCommentData', JSON.stringify(comments));
    */
    }

    
}



/*async function bloglike(){
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    await fetch(baseUrl+'blogs/comments/create/'+blogId,{
        method: "POST",
        headers:{
            'bearer-token':token,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: decodedToken._id,
            comment: document.getElementById('message').value,
            blog_id:blogId
        })
    })
// }*/


function retrieveData(){
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
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
                    const url = "blog.html"
                    localStorage.setItem('blogData', JSON.stringify(data));
                    // Redirect to the other page
                    window.location.href = url;
    
    
                })
    
}

