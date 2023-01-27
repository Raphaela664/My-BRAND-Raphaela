function blogSubmit(e){
    event.preventDefault();
    //console.log('working')
    let blogFormData = JSON.parse(localStorage.getItem('blogFormData')) || [];
    let blogData = {
        title : document.getElementById('title').value,
        date : document.getElementById('date').value,
        image: document.getElementById('image').value,
        messageContent: document.getElementById('message').value
    }
    blogFormData.push(blogData);
        
    localStorage.setItem('blogFormData', JSON.stringify(blogFormData));

}


function blogComment(e){
    event.preventDefault();
    let getCommentData = JSON.parse(localStorage.getItem('getCommentData')) || [];
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    
    var comments = {
        comment:document.getElementById('message').value,
        date : currentDate
    } 
    console.log(comments);
    getCommentData.push(comments);
    localStorage.setItem('getCommentData',JSON.stringify(getCommentData));
    let div = document.createElement('div');
    div.classList.add('comments');
    let containerDiv = document.querySelector('#comments-post');
    containerDiv.appendChild(div);
    
    let html =`<p>${comments.comment}</P> <br>
               <span>${comments.date}</span>`;

    div.insertAdjacentHTML("beforeend", html);
    getCommentData.push(comments);
    localStorage.setItem('getCommentData', JSON.stringify(getCommentData));
}
