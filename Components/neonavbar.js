//for all pages when page is loaded create navbar
document.addEventListener("DOMContentLoaded", function() {
    // function fron this script
    printNavBar();
});


//generate the NavBar
function printNavBar() {
    toPrint = `
        <nav class="navbar nav_neoayr navbar-expand-lg">
            <button class="navbar-toggler" id="navgar-toggler-button" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarToggler" style="">
                <div class="navbar-nav brand_container .ml-md-auto">           
                    <a href="index.html">
                    <img id="navBrand" src="img/neoindex/aYr.png" alt="Vamos al inicio de la página Alas y Raí­ces" />
                    </a>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <h2> ¿Quién eres? </h2>
                    </li> 
                </ul>

                </div>
            </div>
        </nav>
            `;
    const navAyr = document.getElementsByClassName("nav_neoayr")[0];
    navAyr.innerHTML = toPrint;

    // set active the current section
    navAyr.querySelectorAll("li").forEach( (elm) => {
        if( window.location.href === elm.querySelector("a").href ){
            // console.log( elm.querySelector("a").href );
            elm.classList.add("active");
        }        
    });

}