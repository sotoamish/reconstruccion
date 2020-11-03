//filter cartelera, with all filters
function apply_filter(){
    var currentDate = new Date();

    // get all filters
    let year = currentDate.getFullYear();
    let month = parseInt(document.getElementById("month_filter").value);
    let activity = document.getElementById("activity_filter").value;
    let age = document.getElementById("age_filter").value;
    let mode = document.getElementById("mode_filter").value;
    let state = document.getElementById("state_filter").value;
    

    act_array = null;

    if( cartelera_data[year] !== undefined ){       //year doesn´t exists
        if( cartelera_data[year][month] !== undefined ){        //month doesn't exists

            act_array = JSON.parse(JSON.stringify( cartelera_data[year][month] ));

        }
    } 

    if( act_array !== null){
        for (let i = 0; i < Object.keys(act_array).length; i++) {
            let key = Object.keys(act_array)[i];
            let elm_deleted = false;
            
            
            //apply activity filter
            if( activity !== "" && activity !== act_array[key]["actividad"] ){
                delete act_array[key];
                elm_deleted = true;
            }

            // console.log(act_array[key]["edad"]);
            //apply age filter
            if( age !==  "" && 
                elm_deleted == false &&
                act_array[key]["edad"] !== 0 &&
                age != parseInt(act_array[key]["edad"]) ) 
            {
                delete act_array[key];
                elm_deleted = true;
            }


            //apply type filter
            if( mode !==  "" && 
                elm_deleted == false &&
                mode !== act_array[key]["tipo"]) {
                    delete act_array[key];
                    elm_deleted = true;
            }

            //apply state filter
            if( state !==  "" && 
                elm_deleted == false &&
                state !== act_array[key]["estado"]) {
                    delete act_array[key];
                    elm_deleted = true;
            }


            if( elm_deleted === true){
                i--;
            }
        }
    }

    print_cartelera(act_array);

}

//print list of filtered activities
function print_cartelera( filt_obj ){
    // console.log( filt_obj );
    let age = document.getElementById("hidden_age").value;
    let actionWindow = document.getElementById("cartelera_action");
    
    let toPrint = `
        <div class="row cartelera">
            <div class="col-12 result_count age_${age}"> 
                ${Object.keys(filt_obj).length} Resultados de búsqueda
            </div>
    `;

    for (let i = 0; i < Object.keys(filt_obj).length; i++) {
        let key = Object.keys(filt_obj)[i];

        // console.log(filt_obj[key]);

        toPrint += `
            <div class="col-12 event_container">
                <div class="row">
                    <div class="col-3 pic_container">
                        <img src="${filt_obj[key]["thumbnail"]}" alt="imagen del evento - ${filt_obj[key]["nombre"]}" />
                    </div> 
                    <div class="col-9 info">
                        <div class="tipo">${filt_obj[key]["actividad"]}</div>
                        <div class="nombre age_${age}">${filt_obj[key]["nombre"]}</div>
                        <div class="staff">${filt_obj[key]["staff"]}</div>
                        <div class="fecha age_${age}">De <b>${filt_obj[key]["fecha_inicio"]}</b> a <b>${filt_obj[key]["fecha_termino"]}</b> <br> Horarios: <b>${filt_obj[key]["horario"]}</b></div>
                        <div class="lugar">
                            ${filt_obj[key]["estado"]}
                            ${ (filt_obj[key]["ciudad"] !== "" )? " - " + filt_obj[key]["ciudad"] : "" }
                            ${ (filt_obj[key]["lugar"] !== "" )? " - " + filt_obj[key]["lugar"] : "" }
                        </div>
                        <div class="direccion">${filt_obj[key]["direccion"]}</div>
                        <div class="descripcion">${filt_obj[key]["descripcion"]}</div>
                        <div class="anotaciones">(${filt_obj[key]["anotaciones"]})</div>
                    </div> 
                </div>
            </div>
        `;
    }

    toPrint += `
        </div>
    `;

    actionWindow.innerHTML = toPrint;
}