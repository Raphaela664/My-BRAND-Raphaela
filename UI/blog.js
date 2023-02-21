
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


function blogComment(e){
    event.preventDefault();
    let getCommentData = JSON.parse(localStorage.getItem('getCommentData')) ||[];
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    let getLoginInfo = JSON.parse(localStorage.getItem('LoginFormData'));
    let lastItem = getLoginInfo.length-1;
    console.log(getLoginInfo);
    console.log(lastItem);
    var comments = {
        comment:document.getElementById('message').value,
        date : currentDate,
        user_id: getLoginInfo[lastItem].user_id
    } 
    console.log(comments);
    getCommentData.push(comments);
    localStorage.setItem('getCommentData',JSON.stringify(getCommentData));
    let div = document.createElement('div');
    div.classList.add('comments');
    let containerDiv = document.querySelector('#comments-post');
    containerDiv.appendChild(div);
    let showComment = JSON.parse(localStorage.getItem('getCommentData'))
    
    let html =`<p><b>${comments.user_id} </b><p>
                <p>${comments.comment}</P> <br>
               <span>${comments.date}</span>`;

    div.insertAdjacentHTML("beforeend", html);
    getCommentData.push(comments);
    localStorage.setItem('getCommentData', JSON.stringify(getCommentData));
}

function retrieveData(){
    let showComment = JSON.parse(localStorage.getItem('getCommentData'))
    for(let i =0 ; i<showComment.length; i++){
        let div = document.createElement('div');
        div.classList.add('comments');
        let containerDiv = document.querySelector('#comments-post');
        containerDiv.appendChild(div);
        let html = `<p><b>${showComment[i].user_id}</b></p><br>
                    <p>${showComment[i].comment}<p> <br>
                    <span>${showComment[i].date}</span>`;
        div.insertAdjacentHTML('afterbegin',html);

        
    }
}



