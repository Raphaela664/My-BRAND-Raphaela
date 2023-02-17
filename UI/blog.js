 let image;
document.querySelector('#imageF').addEventListener('change', function(){
    const reader = new FileReader();
    reader.readAsDataURL(this.files[0]);
    reader.addEventListener('load',()=>{
        image = reader.result;
    })

})
function blogSubmit(e){
    event.preventDefault();
    //console.log('working')
    
    
    let blogFormData = JSON.parse(localStorage.getItem('blogFormData')) || [];
    let blogData = {
        title : document.getElementById('title').value,
        date : document.getElementById('date').value,
        image: image,
        messageContent: document.getElementById('message').value
    }
    blogFormData.push(blogData);
        
    localStorage.setItem('blogFormData', JSON.stringify(blogFormData));

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



