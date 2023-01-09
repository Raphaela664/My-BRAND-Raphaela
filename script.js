const forms = document.querySelector(".forms");
pswdshowhide = document.querySelectorAll(".fa-eye-slash");
links = document.querySelectorAll(".link");


links.forEach(link =>{
    link.addEventListener("click", e =>{
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})