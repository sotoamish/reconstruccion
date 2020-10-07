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
    console.log( filt_obj );
    let actionWindow = document.getElementById("cartelera_action");
    
    let toPrint = `
        <div class="row">
    `;

    for (let i = 0; i < Object.keys(filt_obj).length; i++) {
        let key = Object.keys(filt_obj)[i];

        toPrint += `
            <div class="col-12 card">
                <div>`+ filt_obj[key]["nombre"] +`</div>
                <div>`+ filt_obj[key]["actividad"] +`</div>
                <div>`+ filt_obj[key]["tipo"] +`</div>
                <div>`+ filt_obj[key]["estado"] +`</div>
                <div>`+ filt_obj[key]["staff"] +`</div>
                <div>Edad`+ filt_obj[key]["edad"] +`</div>
            </div>
        `;
    }

    toPrint += `
        </div>
    `;

    actionWindow.innerHTML = toPrint;
}