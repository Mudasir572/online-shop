var current = location.pathname;
    console.log(current)

    const navLinks = document.querySelectorAll('.nav-items ul li a');
   
    for(const navLink of navLinks){
        console.log(navLink.href)
        
        if(navLink.href.indexOf(current) !== -1){
            navLink.parentElement.classList.add('active');
            console.log('class added')
        }
    }