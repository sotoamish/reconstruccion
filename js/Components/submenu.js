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
                draw_action( subMenuBtns[i].dataset.funcname, subMenuBtns[i].dataset.age )
            }
        } else {
            //if this btn contains active, delete class
            subMenuBtns[i].classList.remove("active");
        }
    }

}

//draw the selected action window
const action_window = document.getElementById("action_window");
function draw_action(action, age){    

    switch (action) {
        case "contenido":
                draw_contenido( age );
            break;

        case "cartelera":

            break;
    
        default:
            break;
    }

    //rewrite url, with printed action window
    rewrite_url( action );

}


// change active btn of action_menu
const actionMenuBtns = document.getElementsByClassName("menu_btn_container");   
function actionMenuChange( elm ){

    for (let i = 0; i < actionMenuBtns.length; i++) {

        if( actionMenuBtns[i] === elm ){
            if(!actionMenuBtns[i].classList.contains("active"))
            {
                //if selected btn not contains active, add
                actionMenuBtns[i].classList.add("active");

                //set searcField dataset
                document.getElementById("searchField").dataset.search = elm.dataset.target;

                //draw selected component "function from componentCollection.js"
                drawComponent( elm.dataset.target, elm.dataset.age );
            }
        } else {
            //if this btn contains active, delete class
            actionMenuBtns[i].classList.remove("active");
        }

    }
}


//draw "contenido" section
function draw_contenido( age ){
    
    let toDraw = ``;

    //draw "contenido" action menu block
    toDraw += `
        <div class="col-6 action_menu_block">
            <div class="row">
                <div class="col-3 menu_btn_container" data-target="videos" data-age="`+age+`" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/videos1.png" class="claro" alt="boton de videos"><img src="img/infancia1/videos.png" class="color" alt="boton de videos"> 
                    Videos 
                </div>
                <div class="col-3 menu_btn_container" data-target="audios" data-age="`+age+`" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/audios1.png" class="claro" alt="boton de audios"><img src="img/infancia1/audios.png" class="color" alt="boton de audios"> 
                    Audios 
                </div>
                <div class="col-3 menu_btn_container" data-target="juegos" data-age="`+age+`" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/videos1.png" class="claro" alt="boton de juegos"><img src="img/infancia1/videos.png" class="color" alt="boton de juegos"> 
                    Juegos
                </div>
                <div class="col-3 menu_btn_container" data-target="apps" data-age="`+age+`" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/videos1.png" class="claro" alt="boton de apps"><img src="img/infancia1/videos.png" class="color" alt="boton de apps"> 
                    Apps 
                </div>
            </div>
        </div>
    `;

    //draw search menu block
    toDraw += `
        <div class="col-6 search_block">
            <div class="input-group">
                <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                </div>
            </div>
        </div>
    `;

    //draw a component container section
    toDraw += `
        <div class="col-8 component_container" id="component_container">
        </div> 
        <div class="col-4">
        </div> 
    `;

    action_window.innerHTML = toDraw;
}


//get parameters from url
function get_params( parameter ){
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    return url.searchParams.get(parameter);
}


//rewrite current url with some new parameter
function rewrite_url( parameter ){
    //get current url
    let url_string = (window.location.href).toLowerCase();
    //look for sectin parameter
    let current_url = new URL(url_string);
    let section = current_url.searchParams.get("section");
    
    if(section === null){
        url_string+=`?section=`+parameter;
    } else {
        url_string = url_string.split("?");
        url_string = url_string[0] + `?section=`+parameter;
    }
    
    window.history.pushState(
        { additionalInformation: 'Updated the URL with JS' },
        'New page title', 
        url_string);    
}