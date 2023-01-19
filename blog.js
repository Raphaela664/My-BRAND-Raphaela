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

