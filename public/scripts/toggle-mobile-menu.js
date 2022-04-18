const mobileMenuBtn = document.getElementById("mobile-menu-btn");

const mobileMenuBar = document.getElementById("mobile-menu");

function toggleMobileMenu(){
    mobileMenuBar.classList.toggle('open'); 

}

mobileMenuBtn.addEventListener('click',toggleMobileMenu);