function blogSubmit(e){
    event.preventDefault();
    //console.log('working')
    let blogFormData = JSON.parse(localStorage.getItem('blogFormData')) || [];
    blogFormData.push({
        name : document.getElementById('name').value,
        email : document.getElementById("email").value,
        date : document.getElementById('date').value,
        image: document.getElementById('image').value,
        messageContent: document.getElementById('message').value
    })
        
    localStorage.setItem('blogFormData', JSON.stringify(blogFormData));
    


}

