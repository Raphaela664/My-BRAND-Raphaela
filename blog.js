var selectedRow = null;

function onFormSubmit(){
    if(validate()){
        var formData = readFormData();
        if(selectedRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData); 
        }
        resetForm();
    }
}
function readFormData(){
    var formData = {}
    formData["fullName"] = document.getElementById("name").value;
    formData['email'] = document.getElementById('email').value;
    formData['dateTime']=document.getElementById('date').value;
    formData['picture'] = document.getElementById('image').value;
    formData['message'] = document.getElementById('message').value;
    return formData;
}

const submitBtn = document.querySelector('#submit');
const comment = document.querySelector('#add-new-comment');
const likeIcon = document.querySelector('#like');

let likeCount = 0;
likeIcon.addEventListener('click',likePost)
function likePost(){
    likeIcon.classList.toggle('liked');
    if(likeIcon.classList.contains('liked')){
        likeIcon.innerHTML = `<i class="fa fa-thumbs-up"></i>`
    }
    else  {
        likeIcon.innerHTML = `<i class="fa fa-thumbs-up"></i>`
    }
}
function validateEmail(){
    
    var email = document.getElementById('email').value;
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email.match(pattern)){
        document.getElementById('email-error').innerText = "This email Id is valid";
    }else{
        document.getElementById('email-error').innerText = "This email Id is invalid";
    }
   
    
  
}
