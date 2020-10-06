// document.addEventListener("DOMContentLoaded", function() {
//     
// });


//when page ends load
document.addEventListener("DOMContentLoaded", function(event) {
    //get section from url parameters "function from submenu.js"
    const section = get_params( "section" );

    if( section !== null){
        //if section exits, click on section button
        document.querySelectorAll('[data-funcname="'+section+'"]')[0].click();
    } else {
        //if section doesn´t exists, click on first section button
        document.getElementsByClassName("subMenuBtn")[0].click();
    }
});


// fill estados field with estados list
function fill_estados_field() {
    // get "estado" field 
    let field_estado = document.getElementById("estado_select");
    
    //add "estados" from estados_data.js to field_estado
    var toPrint;
    // var toPrint = '<option value=""> -Elige tu estado- </option>';
    for (let i = 0; i < Object.keys(estados_data).length ; i++) {
        let key = Object.keys(estados_data)[i];
        toPrint += `
            <option value="${estados_data[key]}"> ${estados_data[key]} </option>
        `;
    }
    field_estado.innerHTML = toPrint;
}

// update estados_board with selected "estado" info 
function update_estados_board() {
    let sel_estado = document.getElementById("estado_select").value;
    let estados_board = document.getElementById("estados_board");

    let toDraw = `
        <div class="row">
            <div class="col-12 board_wrapper">
                <div class="row board_container">
                
                    <div class="col-1 block_float">
                        <img src="img/index/aYr.png" alt="logo de alas y raíces" style="vertical-align:middle"/>
                    </div>

                    <div class="col-8">
                        <div class="row">

                        <div class="col-12 title">
                            Alas y Raíces ${sel_estado}
                        </div> 
    `;

    for (let i = 0; i < Object.keys(estados_sedes_data[sel_estado]["responsables"]).length; i++) {
        let current_key = Object.keys(estados_sedes_data[sel_estado]["responsables"])[i];
        toDraw += `
                            <div class="col-7 info_block">    
                                <div class="nombre">${estados_sedes_data[sel_estado]["responsables"][current_key]["nombre"]}</div>
                                <div class="puesto">${estados_sedes_data[sel_estado]["responsables"][current_key]["puesto"]}</div>
                            </div>
                            <div class="col-5 contact_block">
                                <div><b>Contacto:</b></div>
                                <div class="correo">${estados_sedes_data[sel_estado]["responsables"][current_key]["correo"]}</div>
                                <div class="telefono">${estados_sedes_data[sel_estado]["responsables"][current_key]["telefono"]}</div>
                            </div>
                        
        `;
    }

    toDraw += `
                        </div>
                    </div>

                    <div class="col-2 block_float">
                        <div class="text-center">
                            <div class="direccion">   
                                ${estados_sedes_data[sel_estado]["direccion"]}
                            </div>
                            Redes sociales: <br>
                            <a href="#"><i class="fab fa-lg fa-facebook-square"></i></a>
                            <a href="#"><i class="fab fa-lg fa-twitter-square"></i></a>
                            <a href="#"><i class="fab fa-lg fa-instagram-square"></i></a>
                            <a href="https://www.youtube.com/channel/UCZjriKxbf_PjMAWHBG-ssSw"><i class="fab fa-lg fa-youtube-square"></i></a>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    `;

    estados_board.innerHTML = toDraw;
}   