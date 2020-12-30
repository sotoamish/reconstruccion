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
                if( age <= 2){
                    draw_contenido( age );
                } else {
                    draw_contenido2( age );
                }               
            break;

        case "cartelera": 
                draw_cartelera( age );
            break;

        case "estados": 
                //sección de *formadores
                draw_estados( age )
            break;

        case "descripcionayr":
                 draw_descripcion( age );
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


//redirect to search link
function activeSearch( age ) {
    let search = document.getElementById("searchField").value;

    if( search !== "" ) {
        encodedUrl = encodeURI( `buscar.html?age=${age}&search=${search}` )
        window.location.href = encodedUrl;
    }    
}



//draw "contenido" section for infancia1, infancia2 // start drawing an action menu 
function draw_contenido( age ){
    
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
    let toDraw = ``;

    //draw "contenido" action menu block
    toDraw += `
        <div class="col-`+ ((isMobile)? "12" : "6") +` action_menu_block `+ ((isMobile)? "mobile" : "") +`">
            <div class="row">
                <div class="col-3 menu_btn_container" data-target="videos" data-age="${age}" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/video.svg" class="claro" alt="boton de videos"><img src="img/infancia1/video.png" class="color" alt="boton de videos"> 
                    <div>
                        Videos 
                    </div>
                </div>
                <div class="col-3 menu_btn_container" data-target="audios" data-age="${age}" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/audio.svg" class="claro" alt="boton de audios"><img src="img/infancia1/audio.png" class="color" alt="boton de audios"> 
                    <div>
                        Audios 
                    </div>
                </div>
                <div class="col-3 menu_btn_container" data-target="juegos" data-age="${age}" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/juegos.svg" class="claro" alt="boton de juegos"><img src="img/infancia1/juegos.png" class="color" alt="boton de juegos"> 
                    <div>
                        Juegos
                    </div>
                </div>
                <div class="col-3 menu_btn_container" data-target="apps" data-age="${age}" onClick="actionMenuChange(this)">
                    <img src="img/infancia1/apps.svg" class="claro" alt="boton de apps"><img src="img/infancia1/apps.png" class="color" alt="boton de apps"> 
                    <div>
                        Apps 
                    </div>
                </div>
            </div>
        </div>
    `;

    if( !isMobile ){
        //draw search menu block
        toDraw += `
                <div class="col-6 search_block">
                    <div class="input-group">
                        <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                        <div class="input-group-append elm_search_button" onClick="activeSearch(${age})">
                            <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                </div>
        `;   
    }
    

    //draw a component container section
    toDraw += `
        <div class="col-lg-7 component_container" id="component_container">
        </div> 
        <div class="col-lg-5 bookshelf" id="bookshelf">
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

    // draw bookShelf       //function from libreroCompponent.js
    draw_bookshelf( age );
}


//draw "contenido" section for jovenes // start drawing an action menu 
function draw_contenido2( age ){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let toDraw=``;

    //draw "contenido" action menu block
    toDraw += `
        <div class="col-`+ ((isMobile)? "12" : "7") +` action_menu_block2 `+ ((isMobile)? "mobile" : "") +` age_${age}">
            <div class="row">
                <div class="col-md-3 col-6 menu_btn_container alternative" data-target="videos" data-age="${age}" onClick="actionMenuChange(this)">Videos</div>
                <div class="col-md-3 col-6 menu_btn_container alternative" data-target="podcast" data-age="${age}" onClick="actionMenuChange(this)">Podcast</div>
                <div class="col-md-3 col-6 menu_btn_container alternative" data-target="blog" data-age="${age}" onClick="actionMenuChange(this)">Blog</div>
                <div class="col-md-3 col-6 menu_btn_container alternative" data-target="salon" data-age="${age}" onClick="actionMenuChange(this)">Salón interactivo</div>
            </div>
        </div>
    `;

    if( !isMobile ){
        //draw search menu block
        toDraw += `
            <div class="col-5 search_block">
                <div class="input-group">
                    <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                    <div class="input-group-append elm_search_button" onClick="activeSearch(${age})">
                        <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                    </div>
                </div>
            </div>
        `;   
    }

    toDraw += `
        <div class="col-lg-7 component_container age_${age}" id="component_container">
        </div> 
        <div class="col-lg-5 bookshelf" id="bookshelf">
        </div> 
    `;

    action_window.innerHTML = toDraw;


    // it cant be subsection withour a prev section
    let subSection = get_params( "subsection" );

    if( subSection !== null){
        document.querySelectorAll('[data-target="'+subSection+'"]')[0].click();
    } else {
        //if subsection doesn't exists, click on first subSection button
        document.getElementsByClassName("menu_btn_container")[0].click();
    }

    // draw bookShelf       //function from libreroCompponent.js
    draw_bookshelf( age );
}



//draw "cartelera" section
function draw_cartelera( age ){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
    //get month
    let today = new Date();
    let month = today.getMonth();
    let toDraw = "";

    //EACH FILTER INVOKE onchange function "apply_filter()", ¡function from cartelera.js!"
    //generate select-options field for each filter
    let age_filter = `
        <select name="age_filter"  id="age_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Edades</option> 
            <option value="1">de 0 a 5 años</option>
            <option value="2">de 6 a 12 años</option>
            <option value="3">Jóvenes 13+</option>
            <option value="4">Formadores</option>
        </select>
    `;


    //generate mode filter
    let mode_filter = `
        <select name="mode_filter" id="mode_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Tipo de evento</option> 
            <option value="Presencial">Presencial</option>
            <option value="En línea">En linea</option>
        </select>
    `;


    //generat state filter
    let state_filter = `
        <select name="state_filter" id="state_filter" class="form-control filters" onChange="apply_filter()">
            <option value="">Estados</option>
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
            <option value="">Tipo de actividad</option>
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

    if( !isMobile ){
        toDraw += `
            <div class="col-6 offset-6 search_block">
                <div class="input-group">
                    <input type="text" class="form-control searchField" id="searchField" data-search="" placeholder="Buscar..." aria-label="Buscar..." >
                    <div class="input-group-append elm_search_button" onClick="activeSearch(${age})">
                        <span class="input-group-text" id="basic-addon2"><i class="fas fa-search"></i></span>
                    </div>
                </div>
            </div>
        `;
    }
    

    toDraw += `
        <div class="col-12 cartelera_filter_container">
            <div class="row justify-content-center">
                <div class="col-lg col-6 cartelera_filter"> `+age_filter+` </div>
                <div class="col-lg col-6 cartelera_filter"> `+mode_filter+` </div>
                <div class="col-lg col-6 cartelera_filter"> `+state_filter+` </div>
                <div class="col-lg col-6 cartelera_filter"> `+activity_filter+` </div>
                <div class="col-lg col-6 cartelera_filter"> `+month_filter+` </div>            
            </div>
        </div>

        <div class="col-12 cartelera_action" id="cartelera_action">
        </div>

        <input type="hidden" id="hidden_age" value="${age}">
    `;

    action_window.innerHTML = toDraw;


    //auto select age
    document.getElementById("age_filter").value = age;
    // execute filter
    apply_filter();
}


//draw "estados" section // is from formadores page
function draw_estados( age ){
    let toDraw = `
        <div class="col-12 estados_block">

            <div class="row">
                <div class="col-lg-10 offset-lg-1 estados_descripcion">
                    <span> ¿Quiénes somos y qué hacemos en Alas y Raíces?</span>
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
                        <br><br>
                        A continuación puede consultar el directorio de los coordinadores estatales y contactarlos a través de sus correos electrónicos o redes sociales.
                        Seleccione el estado en la caja siguiente para conocer sus datos de contacto:
                    </p> 
                </div>
            </div>

            <div class="row formularios">
                <div class="col-md-8 offset-md-2">
                    <select class="form-control" name="estado" id="estado_select" onChange="update_estados_board()"></select>
                </div>
    `;

    toDraw += `    
            </div>

        </div> 

        <div class="col-12 estados_board" id="estados_board">
        
        </div>

        <div class="col-12">
            
        </div>
    `;
    action_window.innerHTML = toDraw;
    
    // functions from formadores.js
    fill_estados_field();
    update_estados_board();
}


//draw "descripción de alas y raices" //if from formadores page
function draw_descripcion( age ){
    let toDraw = `
        <div class="col-10 offset-1 who_are age_${age}">
            <div class="row">
                <div class="col-12 title">¿Quiénes somos?</div>
                <div class="col-12 description">
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

                <div class="col-12 info">
                    <div class="row btn_container">
                        <div class="col-md-3 col-6 info_btn" data-target="w-1" onClick="changeInfoWindow(this)">Programación cultural</div>
                        <div class="col-md-3 col-6 info_btn" data-target="w-2" onClick="changeInfoWindow(this)">Formación</div>
                        <div class="col-md-3 col-6 info_btn" data-target="w-3" onClick="changeInfoWindow(this)">Fomento a la lectura</div>
                        <div class="col-md-3 col-6 info_btn" data-target="w-4" onClick="changeInfoWindow(this)">Proyectos estatales</div>
                    </div> 
                    <div class="des_info" id="w-1">
                        Contiene las áreas de Presentaciones artísticas, Exposiciones, Narraciones y Tradición Oral, Laboratorios Creativos, Formación, Fomento a la lectura y Ediciones. Planea, proyecta y realiza acciones a lo largo del país, permitiendo el acercamiento de lactantes, preescolares, niñas, niños y adolescentes a diversas actividades culturales y artísticas, tanto en espacios rurales como urbanos, pensando la medición cultural como un espacio para la reconstrucción de los tejidos sociales y el diálogo de saberes. Todo ello, orientado por un equipo de especialistas en diversas metodologías pedagógicas y disciplinas artísticas, conocedores del desarrollo de las infancias y adolescencias en México.
                    </div>       
                    <div class="des_info" id="w-2">
                        Es el proceso que busca la actualización y profesionalización, de los promotores de cultura infantil, con la finalidad de ampliar sus conocimientos, habilidades y actitudes, para la instrumentación de proyectos artísticos y culturales dirigidos a niñas, niños y adolescentes desde un enfoque de derechos, que generen su participación en procesos creativos. A partir de distintas modalidades didácticas -talleres, cursos, conferencias, diplomados, entre otros- se abren espacios de reflexión y análisis, para brindar elementos tanto teóricos como metodológicos, que enriquezcan el quehacer de los promotores y gestores culturales, maestros que trabajan con y para niñas, niños y adolescentes. 
                    </div>       
                    <div class="des_info" id="w-3">
                        Centro de documentación de cultura infantil, donde se recopilan y se ofrecen materiales documentales, artísticos, digitales, sonoros o audiovisuales de consulta, enfocados a las infancias, que permitan a los niños, niñas y adolescentes el acercamiento y participación a las diferentes expresiones artísticas y culturales en México, así como a los trabajadores con infancias, aprovechar metodologías y disponer de recursos para su labor. 
                    </div>       
                    <div class="des_info" id="w-4">
                        La Coordinación Nacional de Desarrollo Cultural Infantil, realiza de manera conjunta con Institutos, Consejos y Secretarías de Cultura de las 32 entidades federativas del país, proyectos regionales, propuestas de trabajo artístico y cultural que buscan dar atención a alguna problemática que afecta a las niñas, niños y adolescentes de cada una de las regiones del país: Norte, Centro Occidente, Centro y Sur. Para su instrumentación, los promotores de cultura infantil participan en acciones de formación sobre la problemática compartida entre los estados que conforman una región y las metodologías pertinentes para tal fin. Desde una perspectiva intercultural, de respeto a la diversidad e incluyente, se generan procesos de participación infantil en contextos adversos. Para hacer contacto con alguna de las coordinaciones estatales, haz clic en el directorio nacional de Alas y Raíces en los estados de la República mexicana.
                    </div>                    
                </div>

                <div class="col-12 form_gallery">
                    <div class="title">Galería</div>
                    <div class="gallery_wrapper">
                        <div class="masonry">

`;

    for (let i = 0; i < gallery_pic.length; i++) {
        toDraw += `
            <div class="brick">
                <img src="${gallery_pic[i]}" />
            </div>    
        `;
    }

toDraw+= `
                        </div>
                    </div>
                </div>

                <div class="col-12 contact_block">
                    <div class="title">Contacto</div>
                    <div class="description">
                        Si desea saber más sobre los proyectos o contactar con alguna de las personas que forman parte de esta labor, por favor llene el siguiente formulario y nos pondremos en contacto con usted. 
                    </div>
                    <div class="row form_block">
                        <div class="col-md-4">
                            <input type="text" placeholder="Nombre" />
                        </div>
                        <div class="col-md-8">
                            <input type="text" placeholder="Asunto" />
                        </div>
                        <div class="col-md-12">
                            <textarea placeholder="Mensaje"></textarea>
                        </div>
                    </div>
                    <div class="submit_block">
                        O visita nuestras redes sociales
                        <a href="https://www.facebook.com/alasyraicescultura/"><i class="fab fa-lg fa-facebook-square"></i></a>
                        <a href="https://www.facebook.com/alasyraicescultura/"><i class="fab fa-lg fa-twitter-square"></i></a>
                        <a href="https://www.instagram.com/alasyraicescultura/"><i class="fab fa-lg fa-instagram-square"></i></a>
                        <a href="https://www.youtube.com/c/AlasyRa%C3%ADcesCultura/"><i class="fab fa-lg fa-youtube"></i></a>
                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    action_window.innerHTML = toDraw;

    //click on first info btn
    (document.getElementsByClassName("info_btn")[0]).click();

}
function changeInfoWindow( elm ){
    //set unset active on info_btn
    let btn_array = [].slice.call( document.getElementsByClassName("info_btn") );
    let field_array = [].slice.call( document.getElementsByClassName("des_info") );
    let target = "";
    
    btn_array.forEach( btn => {
        if( btn === elm){
            if( !btn.classList.contains("active") ){
                btn.classList.add("active");
                target = btn.dataset.target;
            }
        } else { btn.classList.remove("active"); }
    });
    
    //hide all fields and show only selected
    field_array.forEach( field => {
        if( field.id === target ){
            if ( !field.classList.contains("shown") ) {
                field.classList.add("shown");
            }
        } else {
            field.classList.remove("shown");
        }
    });
}


//select witch component to draw
function drawComponent( component, age ){
    // console.log(component, age);
    switch (component) {
        case "audios":
                drawComponentAudios(age);
            break;
        case "videos":
                if( age <= 2) {     //video section for "infancia1", "infancia2" -function from videoPlayerfunctions.js
                    drawComponentVideos(age);
                } else {    //video section for "jovenes" -function from videoPlayerfunctions.js
                    drawComponentVideos2(age);
                }
                
            break;
        case "juegos":
                //drawComponentJuegos(age)
            break;
        case "apps":
                //draw apps component for "infancia1", "infancia2" -function from appComponent.js
                drawComponentApps(age)
            break;

        case "blog":
                drawComponentBlog(age);
            break;
    
        default:
            break;
    }

    rewrite_url( null, component );
}

