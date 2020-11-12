// create a navbar when page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // function from same script
    printNavBar();
});

// generate the NavBar
function printNavBar() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        toPrint = `
            <nav class="navbar navbar_mobile navbar-expand-xl navbar-light">  
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <img src="img/ayrH.png" 
                        id="navBrand" 
                        alt="al home de alas y raíces teest"
                        onclick="location.href = 'index.html';">

                <div onClick="showSearchWindow()">
                    <i class="fas fa-search" id="searchIcon"></i>
                </div>                

                <div class="collapse navbar-collapse p-0" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item infancia1">
                            <a class="nav-link" href="infancia1.html">
                                0 a 5 años
                            </a>
                        </li>
                        <li class="nav-item infancia2">
                            <a class="nav-link" href="infancia2.html">
                                6 a 12 años
                            </a>
                        </li>
                        <li class="nav-item jovenes">
                            <a class="nav-link" href="jovenes.html">
                                13 + años
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

            <div class="smokeSearch" id="smokeSearch">
                <div class="search_window">
                    <div class="close">
                        <button onClick="hideSmokeSearch()">
                            <i class="far fa-times-circle"></i>
                        </button>
                    </div>
                    <div class="info">
                        Realiza una búsqueda
                    </div>
                    <div class="input">
                        <input class="form-control" type="text" placeholder="Buscar" id="searchField" />
                    </div>
                    <div>
                        <button class="search_btn" onClick="activeSearch(0)">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        toPrint = `
            <nav class="navbar navbar_desktop navbar-expand-lg p-0 navbar-light">            
                <a class="navbar-brand" href="index.html">
                    <img src="img/ayrH.png" id="navBrand" alt="al home de alas y raíces teest">
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <section class="navbar-collapse justify-content-end collapse p-0" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item infancia1">
                            <a class="nav-link" href="infancia1.html">
                                0 a 5 años
                            </a>
                        </li>
                        <li class="nav-item infancia2">
                            <a class="nav-link" href="infancia2.html">
                                6 a 12 años
                            </a>
                        </li>
                        <li class="nav-item jovenes">
                            <a class="nav-link" href="jovenes.html">
                                13 + años
                            </a>
                        </li>
                        <li class="nav-item formadores">
                            <a class="nav-link" href="formadores.html">
                                Formadores
                            </a>
                        </li>
                    </ul>
                </section>
            </nav>
        `;
    }

    const navAyr = document.getElementById("neoNavbar");
    navAyr.innerHTML = toPrint;

    // set active the current section
    navAyr.querySelectorAll("li").forEach( (elm) => {
        if( window.location.href.indexOf( elm.querySelector("a").href ) > -1 ){
            elm.classList.add("active");
        }        
    });
}

function showSearchWindow(){
    document.getElementById("smokeSearch").style.display = "block"
}

function hideSmokeSearch(){
    document.getElementById("smokeSearch").style.display = "none"
}