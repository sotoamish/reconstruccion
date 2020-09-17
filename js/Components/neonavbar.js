// create a navbar when page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // function from same script
    printNavBar();
});

// generate the NavBar
function printNavBar() {
    toPrint = `
        <nav class="navbar navbar-expand-md static-top p-0">            
            <a class="navbar-brand" href="index.html">
                <img src="img/ayrH.png" id="navBrand" alt="al home de alas y raíces teest">
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse p-0" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item infancia1">
                        <a class="nav-link" href="infancia1.html">
                            0 a 5 años
                        </a>
                    </li>
                    <li class="nav-item infancia2">
                        <a class="nav-link" href="infancia2.html">
                            6 a 18 años
                        </a>
                    </li>
                    <li class="nav-item jovenes">
                        <a class="nav-link" href="jovenes.html">
                            18 + años
                        </a>
                    </li>
                    <li class="nav-item formadores">
                        <a class="nav-link" href="formadores.html">
                            Formadores
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    `;
    
    const navAyr = document.getElementById("neoNavbar");
    navAyr.innerHTML = toPrint;

    // set active the current section
    navAyr.querySelectorAll("li").forEach( (elm) => {
        if( window.location.href === elm.querySelector("a").href ){
            elm.classList.add("active");
        }        
    });
}


// change active btn of subMenu
const subMenuBtns = document.getElementsByClassName("subMenuBtn");   
function subMenuChange( elm ){

    for (let i = 0; i < subMenuBtns.length; i++) {

        if( subMenuBtns[i] === elm ){
            if(!subMenuBtns[i].classList.contains("active"))
            {
                //if selected btn not contains active, add
                subMenuBtns[i].classList.add("active");

                //execute functions
                console.log("EXECUTE SOMETHING");
            }
        } else {
            //if this btn contains active, delete class
            subMenuBtns[i].classList.remove("active");
        }

    }
}