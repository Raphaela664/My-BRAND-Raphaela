const blogId = localStorage.getItem('blogid')
let image;
document.querySelector('#imageF').addEventListener('change', function(){
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.addEventListener('load',()=>{
        image = reader.result;
    })

})
/*async function blogSubmit(e){
    event.preventDefault();
    //console.log('working')
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    
    
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
            'bearer-token':token,
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
*/
window.addEventListener('load', updateblogContent);
async function updateblogContent(){
    if(blogId){
        await fetch(baseUrl+`blogs/viewblog/${blogId}`,{
            method: 'GET',
            headers: {
                'bearer-token': token
            },
            
        })
        .then(res=>{
            return res.json();
        })
        .then(data =>{
            console.log(data);
            console.log(data.title);
            document.getElementById('title').value= data.title;
            document.getElementById('imageF').src = data.image
            console.log(data.image);
            
            document.getElementById('message').textContent= data.blogContent;
        })
        .catch(error => console.log(error));
    }
}
async function blogSubmit(e){
    event.preventDefault();
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    const token = JSON.parse(localStorage.getItem('bearer-token'))

    let blogFormData = JSON.parse(localStorage.getItem('blogFormData')) || [];
    let blogData = {
        title : document.getElementById('title').value,
        image: image,
        messageContent: document.getElementById('message').value
    }
    blogFormData.push(blogData);
    localStorage.setItem('blogFormData', JSON.stringify(blogFormData));
    
    const formData = {
        title: document.getElementById('title').value,
        image: image,
        blogContent: document.getElementById('message').value
    }

  // get the blog id from the row element
    if (blogId) {
        // Update existing blog
        
        await fetch(baseUrl + `blogs/updateBlog/${blogId}`, {
            method: 'PUT',
            headers: {
                'bearer-token': token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
    } else {
        // Create new blog
        await fetch(baseUrl+'blogs/newblog',{
            method: "POST",
            headers:{
                'bearer-token':token,
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
    }
}


async function blogComment(){
    event.preventDefault()
    const token = JSON.parse(localStorage.getItem('bearer-token'))
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
  
    //let getCommentData = JSON.parse(localStorage.getItem('getCommentData')) 
    const date = new Date();
    if(!token){
        window.location.href = "login/login.html"
    }else{
        let decodedToken = JSON.parse(atob(token.split(".")[1]));
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
        console.log(blogId,decodedToken);
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
   }

    
    
}



async function bloglike(){
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('bearer-token'));
    const baseUrl = "https://my-brand-raphaela-production.up.railway.app/";
    const blogdata= JSON.parse(localStorage.getItem('blogData'));
    const blogId = blogdata._id
    await fetch(baseUrl+'blogs/viewblog/like/'+blogId,{
        method: "POST",
        headers:{
            'bearer-token':token,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
       
    })
}


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

