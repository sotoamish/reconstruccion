// change active btn color of subMenu // execute draw_action
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

//execute draw_(subSection) with a switch
const action_window = document.getElementById("action_window");
function draw_action(action, age){    

    // rewrite url, with printed action window
    rewrite_url( action, null );

    switch (action) {
        case "contenido":
                draw_contenido( age );
            break;

        case "cartelera": 
                draw_cartelera( age );
            break;

        case "estados": 
                //sección de *formadores
                draw_estados( age )
            break;

        case "descripcionayr":
                 draw_contenido( age );
            break;
    
        default:
            break;
    }

}


// change active btn of action_menu
const actionMenuBtns = document.getElementsByClassName("menu_btn_container");   
function actionMenuChange( elm ){

    for (let i = 0; i < actionMenuBtns.length; i++) {   

        if( actionMenuBtns[i] === elm ){
            if( !actionMenuBtns[i].classList.contains("active") )
            {   
                //if selected btn not contains active, add
                actionMenuBtns[i].classList.add("active");

                // //set searcField dataset
                // document.getElementById("searchField").dataset.search = elm.dataset.target;

                //draw selected component "function from componentCollection.js"
                drawComponent( elm.dataset.target, elm.dataset.age );
                rewrite_url( null, elm.dataset.target );
            }
        } else {
            //if this btn contains active, delete class
            actionMenuBtns[i].classList.remove("active");
        }

    }
}


//get parameters from url
function get_params( parameter ){
    let url_string = (window.location.href).toLowerCase();
    let url = new URL(url_string);
    return url.searchParams.get(parameter);
}


//rewrite current url with some new parameter
function rewrite_url( new_section, new_subsection ){

    // console.log("new_section: " + new_section);
    // console.log("new_subsection: " + new_subsection)
    
    let url_string = (window.location.href);

    let current_section = get_params("section");
    let current_subSection = get_params("subsection");

    if( new_section !== null ){    
        if( current_section === null ) {    //si aun no hay current_section, añade la new_section a la url
            url_string+=`?section=`+new_section;        
        } else if( current_section !== new_section ){    //si la seccion actual !== nueva seccion, modifica la seccion actual
            url_string = url_string.split("?");
            url_string = url_string[0] + `?section=`+new_section;
        }
    }

    if( new_subsection !== null ) {
        if( current_subSection === null){    //si aun no hay current_subsection, añade la new_subsection a la url
            url_string+=`&subsection=`+new_subsection;
        } else if( current_subSection !== new_subsection ){     //si la subseccion actual !== nueva subseccion, modifica subseccion actual 
            url_string = url_string.split("&");
            url_string = url_string[0] + `&subsection=`+new_subsection;
        }
    }    
    
    window.history.pushState(
        { additionalInformation: 'Actualización de parametros' },
        'Alas y raíces', 
        url_string
    );    
    
}




//draw "contenido" section // start drawing an action menu 
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


    // it cant be subsection withour a prev section
    let subSection = get_params( "subsection" );

    // console.log(subSection);
    if( subSection !== null){
        document.querySelectorAll('[data-target="'+subSection+'"]')[0].click();
    } else {
        //if subsection doesn't exists, click on first subSection button
        document.getElementsByClassName("menu_btn_container")[0].click();
    }
}


//draw "cartelera" section
function draw_cartelera( age ){
    //get month
    let today = new Date();
    let month = today.getMonth();

    //EACH FILTER INVOKE onchange function "apply_filter()", ¡function from cartelera.js!"
    //generate select-options field for each filter
    let age_filter = `
        <select name="age_filter"  id="age_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Todas las edades</option> 
            <option value="1">de 0 a 5 años</option>
            <option value="2">de 6 a 12 años</option>
            <option value="3">Jovenes 13+</option>
            <option value="4">Formadores</option>
        </select>
    `;


    //generate mode filter
    let mode_filter = `
        <select name="mode_filter" id="mode_filter" class="form-control filters" onChange="apply_filter()">
            <option value=""> de cualquier tipo </option> 
            <option value="Presencial">Presencial</option>
            <option value="En linea">En linea</option>
        </select>
    `;


    //generat state filter
    let state_filter = `
        <select name="state_filter" id="state_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Todos los estados</option>
    `;
        for (let i = 0; i < Object.keys(estados_data).length; i++) {
            let key = Object.keys(estados_data)[i];
            
            state_filter += `
                <option value="`+estados_data[key]+`"> `+estados_data[key]+` </option>
            `;
        }

    state_filter += `
        </select>
    `;


    //generate activity filter
    let activity_filter = `
        <select name="activity_filter" id="activity_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Todas las actividades</option>
    `;
            
        for (let i = 0; i < Object.keys(activity_array).length; i++) {
            let key = Object.keys(activity_array)[i];
            activity_filter += `
                <option value="`+activity_array[key]+`">`+activity_array[key]+`</option>
            `;
        }

    activity_filter += `
        </select>
    `;


    //generate month filter
    let month_filter = `
        <select name="month_filter" id="month_filter" class="form-control filters" onChange="apply_filter()">
    `;        

        for (let i = 0; i < months_array.length; i++) {

            let selected = ( i === month )? "selected" : "" ;
            month_filter += `<option value="${i+1}" ${selected}> ${months_array[i]} </option> `;
        }

    month_filter += `
        </select>
    `;


    
    let toDraw = `
        <div class="col-6 offset-6 search_block">
            <div class="input-group">
                <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                </div>
            </div>
        </div>

        <div class="col-12 cartelera_filter_container">
            <div class="cartelera_filter"> `+age_filter+` </div>
            <div class="cartelera_filter"> `+mode_filter+` </div>
            <div class="cartelera_filter"> `+state_filter+` </div>
            <div class="cartelera_filter"> `+activity_filter+` </div>
            <div class="cartelera_filter"> `+month_filter+` </div>            
        </div>

        <div class="col-12 cartelera_action" id="cartelera_action">

        </div>
    `;

    action_window.innerHTML = toDraw;
    // execute filter
    apply_filter();
}


//draw "estados" section // is from formadores page
function draw_estados( age ){
    let toDraw = `
        <div class="col-12 estados_block">

            <div class="row">
                <div class="col-12 estados_descripcion">
                    <span> Bienvenidos todos </span>

                    <p>
                        Alas y Raíces es el programa de la Secretaría de Cultura federal que propone acciones destinadas al cumplimiento de los derechos culturales 
                        de las infancias (de 0 a 17 años de edad) de México en su diversidad de circunstancias: “el derecho al descanso y el esparcimiento, al juego 
                        y a las actividades recreativas propias de su edad y a participar libremente en la vida cultural y en las artes”, como lo indica el Artículo 
                        31 de la Convención Internacional sobre los Derechos del Niño y de la Niña.
                        <br><br>
                    
                        Con este fin se aprovechan las nuevas tecnologías y se desarrollan páginas de Internet y apps creadas especialmente para niñas, niños y 
                        adolescentes; se promueven y organizan presentaciones artísticas, presentaciones de danza, montajes de obras de teatro, funciones de títeres, 
                        proyecciones de cine, concursos, convocatorias, exposiciones, presentaciones de narraciones orales, lecturas y talleres y laboratorios 
                        creativos a través de diversos lenguajes artísticos; y se producen publicaciones.
                        <br><br>

                        A través de los 32 programas estatales Alas y Raíces, que dependen de las secretarías, institutos y consejos de cultura de las entidades 
                        federativas, se fomenta el disfrute de manifestaciones artísticas y culturales entre el público infantil y juvenil en todo el país.
                        <br><br>

                        Propiciando experiencias artísticas y culturales significativas y constantes, desde las primeras etapas de la vida, se busca contribuir al 
                        bienestar, la formación integral de niños y adolescentes y el desarrollo de su imaginación, capacidad reflexiva, a la par que su sensibilidad, 
                        empatía, curiosidad y expresión creativa.
                    </p>
                </div>
            </div>

            <div class="row formularios">
                <div class="col-6">
                    <select class="form-control" name="estado" id="estado_select" onChange="update_estados_board()"></select>
                </div>
                
                <div class="col-6 input-group">
                    <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                    </div>
                </div>
            </div>

        </div> 

        <div class="col-12 estados_board" id="estados_board">
        
        </div>
                
    `;
    action_window.innerHTML = toDraw;
    
    // functions from formadores.js
    fill_estados_field();
    update_estados_board();
}


