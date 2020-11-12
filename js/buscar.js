var origin_age;

document.addEventListener("DOMContentLoaded", function() {
    // get searched words - function from "submenu.js"
    var pageSearch = get_params( "search" );
    origin_age = get_params("age");

    //set age selector with age var
    document.getElementById("age_selector").value = origin_age;
    //set pageSearch into search input
    document.getElementById("search_input").value = pageSearch;
    //hide show more button
    document.getElementById("showMoreBtn").style.display = "none";

    //generate search array
    start_search();
});

//search - generate an array
var current_flag;
var results = new Array();
function start_search(){
    let search = (document.getElementById("search_input").value).trim();
    let type = document.getElementById("type_selector").value;
    let age = document.getElementById("age_selector").value;
    
    //remove age class to result_count field
    let result_count = document.getElementById("result_count");
    for (let i = 0; i <= 4; i++) {
        if( result_count.classList.contains( "age_"+i ) ){
            result_count.classList.remove( "age_"+i )
        }
    }
    //add age class to result_count field
    document.getElementById("result_count").classList.add("age_"+age);
    
    
    //set current flag to zero (on each new search)
    current_flag = 0;
    results = [];

    let result_array = new Array;

    //search elements in "VIDEO PLA YER DATA"
    if( type === "todos" || type === "videos" ){
        for (let i = 0; i < Object.keys(video_player_data).length; i++) {
            let key1 = Object.keys(video_player_data)[i];
        
            if( age == 0 || video_player_data[key1]["age"] == 0 || video_player_data[key1]["age"] == age ){
            // if( video_player_data[key1]["age"] == 0 || video_player_data[key1]["age"] == age || age === 0 ){

                for (let j = 0; j <  Object.keys(video_player_data[key1]["type"]).length; j++) {
                    let key2 = Object.keys(video_player_data[key1]["type"])[j];

                    for (let k = 0; k < Object.keys(video_player_data[key1]["type"][key2]["playList"]).length; k++) {
                        let key3 = Object.keys(video_player_data[key1]["type"][key2]["playList"])[k];
                        
                        //check if has one word of search_array;
                        if(
                            //if video name includes the searched words
                            ((video_player_data[key1]["type"][key2]["playList"][key3]["name"]).toLowerCase()).includes(search) ||
                            //if video author includes the searched words
                            ((video_player_data[key1]["type"][key2]["playList"][key3]["author"]).toLowerCase()).includes(search) ||
                            //if video type includes the searched words
                            ("video").includes(search)
                        ) {
                            // add this regist on the array
                            result_array.push({
                                "no" : key1+"-"+key2+"-"+key3,
                                "type" : "videos",
                                "name" : video_player_data[key1]["type"][key2]["playList"][key3]["name"],
                                "author" : video_player_data[key1]["type"][key2]["playList"][key3]["author"],
                                "description" : video_player_data[key1]["type"][key2]["playList"][key3]["description"],
                                "url" : video_player_data[key1]["type"][key2]["playList"][key3]["url"],
                                "age" : video_player_data[key1]["age"]
                            });
                        }
                    }
                }

            } 
        }
    }

    //search elements in "AUDIOS PLAYER DATA"
    if( type === "todos" || type === "audios" ){
        for (let i = 0; i < Object.keys(audio_player_data).length; i++) {
            let key1 = Object.keys(audio_player_data)[i];

            if( age == 0 || audio_player_data[key1]["age"] === 0 || audio_player_data[key1]["age"] == age ){
                for (let j = 0; j < Object.keys(audio_player_data[key1]["playList"]).length; j++) {
                    let key2 = Object.keys(audio_player_data[key1]["playList"])[j];
                    
                    for (let k = 0; k < Object.keys(audio_player_data[key1]["playList"][key2]["tracklist"]).length; k++) {
                        let key3 = Object.keys(audio_player_data[key1]["playList"][key2]["tracklist"])[k];
                         
                        //check if has one word of search_array;
                        if(
                            // if audio name includes the searched words
                            ((audio_player_data[key1]["playList"][key2]["tracklist"][key3]["songName"]).toLowerCase()).includes(search) ||
                            // if audio artist includes the searched words
                            ((audio_player_data[key1]["playList"][key2]["tracklist"][key3]["artist"]).toLowerCase()).includes(search) ||
                            //if video type includes the searched words
                            ("audio").includes(search)
                        ){

                            // add this regist on the array
                            result_array.push({
                                "no" : key1+"-"+key2+"-"+key3,
                                "type" : "audios",
                                "name" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["songName"],
                                "author" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["artist"],
                                "url" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["url"],
                                "image" : audio_player_data[key1]["thumbnail"],
                                "age" : audio_player_data[key1]["age"]
                            });
                        }
                    }
                }
            }
        }
    }

    //search elements in "LIBROS PLAYER DATA"
    if( type === "todos" || type === "libros" ){
        for (let i = 0; i < Object.keys(librero_data).length; i++) {    //type level
            let key1 = Object.keys(librero_data)[i];

            for (let j = 0; j < Object.keys(librero_data[key1]).length; j++) {    //element level
                let key2 = Object.keys(librero_data[key1])[j];

                //check age
                if( age == 0 || librero_data[key1][key2]["age"] === 0 || librero_data[key1][key2]["age"] == age){
                    //check if has one word of search_array;
                    if(
                        // if librero elm name includes the searched words
                        ((librero_data[key1][key2]["name"]).toLowerCase()).includes(search) ||
                        // if librero elm type includ the searched words
                        ((librero_data[key1][key2]["type"]).toLowerCase()).includes(search) ||
                        // if librero elm author includ the searched words
                        ((librero_data[key1][key2]["author"]).toLowerCase()).includes(search)
                    ){
                        // add this regist on the array
                        result_array.push({
                            "no" : key2,
                            "type" : "libros",
                            "true_type" : librero_data[key1][key2]["type"],
                            "name" : librero_data[key1][key2]["name"],
                            "author" : librero_data[key1][key2]["author"],
                            "url" : librero_data[key1][key2]["url"],
                            "image" : librero_data[key1][key2]["cover"],
                            "age" : librero_data[key1][key2]["age"],
                            "description" : librero_data[key1][key2]["description"]
                        });
                    }
                }
            }   
        }
    }

    //search elements in "CARTELERA DATA"
    if( type === "todos" || type === "cartelera" ){
        // get the current year
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth;

        for (let i = 0; i < Object.keys(cartelera_data).length; i++) {
            let key1 = Object.keys(cartelera_data)[i];

            //we're listing only current and next year events
            if( key1 >= currentYear ){
                // if is current year only show next months events/ else show all months
                currentMonth = ( key1 == currentYear )? currentDate.getMonth() + 1 : 1;

                for (let j = 0; j < Object.keys(cartelera_data[key1]).length; j++) {
                    let key2 = Object.keys(cartelera_data[key1])[j];
                    
                    //if element is post current month
                    if( key2 >= currentMonth ){

                        for (let k = 0; k < Object.keys(cartelera_data[key1][key2]).length; k++) {
                            let key3 = Object.keys(cartelera_data[key1][key2])[k];
                        
                            if( age == 0 ||cartelera_data[key1][key2][key3]["edad"] === 0 || cartelera_data[key1][key2][key3]["edad"] == age ){
                                //check if has one word of search_array;
                                if(
                                    // if event name includes the searched words
                                    ((cartelera_data[key1][key2][key3]["nombre"]).toLowerCase()).includes(search) ||
                                    // if event staff includes the searched words
                                    ((cartelera_data[key1][key2][key3]["staff"]).toLowerCase()).includes(search) ||
                                    // if event estado includes the searched words
                                    ((cartelera_data[key1][key2][key3]["estado"]).toLowerCase()).includes(search) ||
                                    // if event ciudad includes the searched words
                                    ((cartelera_data[key1][key2][key3]["ciudad"]).toLowerCase()).includes(search) ||
                                    //if video type includes the searched words
                                    ("cartelera").includes(search)  ||
                                    ("evento").includes(search) 
                                ){
                                    // add this regist on the array
                                    result_array.push({
                                        "no" : key1+"-"+key2,
                                        "type" : "cartelera",
                                        "name" : cartelera_data[key1][key2][key3]["nombre"],
                                        "author" : cartelera_data[key1][key2][key3]["staff"],
                                        "estado" : cartelera_data[key1][key2][key3]["estado"],
                                        "ciudad" : cartelera_data[key1][key2][key3]["ciudad"],
                                        "lugar" : cartelera_data[key1][key2][key3]["lugar"],
                                        "description" : cartelera_data[key1][key2][key3]["descripcion"],
                                        "fecha_inicio" : cartelera_data[key1][key2][key3]["fecha_inicio"],
                                        "fecha_termino" : cartelera_data[key1][key2][key3]["fecha_termino"],
                                        "horario" : cartelera_data[key1][key2][key3]["horario"],
                                        "image" : cartelera_data[key1][key2][key3]["thumbnail"],
                                        "age" : cartelera_data[key1][key2][key3]["edad"]
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }         
    }

    
    results = result_array;
    //print results
    print_search_result();
}

// print results in search page 
function print_search_result(){
    let result_count = document.getElementById("result_count");
    let result_window = document.getElementById("result_window");
    let toDraw = "";

    result_count.innerHTML = results.length + " Resultados de búsqueda";

    if(current_flag === 0){
        result_window.innerHTML = '';
    }

    if( results.length > 0 ){
        for (let i = current_flag; i < (current_flag + 4); i++) {
            if ( results[i] !== undefined ) {

                // generate destiny url 
                var destiny_age = ( results[i]["age"] == 0 )? origin_age : results[i]["age"] ;
                var destiny_url = "";
                switch ( parseInt(destiny_age) ) {
                    case 1:     destiny_url += `infancia1.html`;     break;
                    case 2:     destiny_url += `infancia2.html`;     break;
                    case 3:     destiny_url += `jovenes.html`;     break;
                    case 4:     destiny_url += `formadores.html`;     break;
                }               
                         

                // generate elements block
                switch ( results[i]["type"] ) {
                    case "videos":       //for video frame
                            destiny_url += `?section=contenido&subsection=${results[i]["type"]}&item=${results[i]["no"]}`
                            toDraw += `
                                <div class="col-12 event_container">
                                    <a href="${destiny_url}" target="_blank">
                                        <div class="row event_card">
                                            <div class="col-lg-2 col-md-3 pic">
                                                <img src="https://i.ytimg.com/vi/`+ (  (results[i]["url"]).replace( 'https://www.youtube.com/embed/', '')  ) +`/1.jpg" alt="imagen del video ${results[i]["name"]}" />
                                            </div>
                                            <div class="col-lg-10 col-md-9 info">
                                                <div class="type">Video</div>
                                                <div class="name age_${results[i]["age"]}">${results[i]["name"]}</div>
                                                <div class="author">${results[i]["author"]}</div>
                                                <div class="description">${(results[i]["description"]).substring(0, 300)} ${(((results[i]["description"]).length > 300)? "..." : "" )}</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            `;                
                        break;
    
                    case "audios":       //for video frame
                            destiny_url += `?section=contenido&subsection=${results[i]["type"]}&item=${results[i]["no"]}`
                            toDraw += `
                                <div class="col-12 event_container">
                                    <a href="${destiny_url}" target="_blank">
                                        <div class="row event_card">
                                            <div class="col-lg-2 col-md-3 col-4 pic">
                                                <img src="${results[i]["image"]}" alt="imagen del audio ${results[i]["name"]}" />
                                            </div>
                                            <div class="col-lg-10 col-md-9 col-8 info">
                                                <div class="type">Audio</div>
                                                <div class="name age_${results[i]["age"]}">${results[i]["name"]}</div>
                                                <div class="description">${results[i]["author"]}</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            `;                
                        break;

                    case "cartelera":       //for cartelera frame
                            destiny_url += `?section=cartelera&item=${results[i]["no"]}`
                            toDraw += `
                                <div class="col-12 event_container">
                                    <div class="row event_card">
                                        <div class="col-lg-2 col-md-3 pic">
                                            <img src="${results[i]["image"]}" alt="imagen del evento ${results[i]["name"]}" />
                                        </div>
                                        <div class="col-lg-10 col-md-9 info">
                                            <div class="type">Cartelera</div>
                                            <div class="name age_${results[i]["age"]}">${results[i]["name"]}</div>
                                            <div class="author">${results[i]["author"]}</div>
                                            <div class="estado">
                                                ${results[i]["estado"]} 
                                                ${(results[i]["ciudad"] !== "")? "- " + results[i]["ciudad"] : ""}
                                                ${(results[i]["lugar"] !== "")? "- " + results[i]["lugar"] : ""}
                                            </div> 
                                            <div class="description">${(results[i]["description"]).substring(0, 400)} ${(((results[i]["description"]).length > 400)? "..." : "" )}</div>
                                            <div class="fechas age_${results[i]["age"]}">
                                                de <b>${results[i]["fecha_inicio"]}</b> a <b>${results[i]["fecha_termino"]}</b> <br>
                                                Horarios: <b>${results[i]["horario"]}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        break;
                
                    case "libros" : 
                            destiny_url = `librero.html?age=${results[i]["age"]}&type=${results[i]["true_type"]}s&id=${results[i]["no"]}`;
                            toDraw += `
                                <div class="col-12 event_container">
                                    <a href="${destiny_url}" target="_blank">
                                        <div class="row event_card">
                                            <div class="col-lg-2 col-md-3 col-4 pic">
                                                <img src="${results[i]["image"]}" alt="imagen del evento ${results[i]["name"]}" />  
                                            </div>
                                            <div class="col-lg-10 col-md-9 col-8 info">
                                                <div class="type">${results[i]["true_type"]}</div>
                                                <div class="name age_${results[i]["age"]}">${results[i]["name"]}</div>
                                                <div class="author">${results[i]["author"]}</div>
                                                <div class="description">${(results[i]["description"]).substring(0, 300)} ${(((results[i]["description"]).length > 300)? "..." : "" )}</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            `;
                        break;
                    default:    //
                        break;
                }
    
                // execute only on the las iteration
                if( i === (current_flag + 3) && results[i + 1] != undefined ){
                    // show "show more" button
                    document.getElementById("showMoreBtn").style.display = "block";
                }
    
            } else {
                // hide show more button
                document.getElementById("showMoreBtn").style.display = "none";
                break;
            }   
        }
        current_flag += 4;
        result_window.innerHTML = result_window.innerHTML + toDraw;
    } else {
        result_window.innerHTML = toDraw;
    }
}



