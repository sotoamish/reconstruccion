document.addEventListener("DOMContentLoaded", function() {
    // get searched words - function from "submenu.js"
    var pageSearch = get_params( "search" );
    var age = get_params("age");

    //set age selector with age var
    document.getElementById("age_selector").value = age;
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
    results = new Array();

    let result_array = new Array;

    //search elements in "VIDEO PLA YER DATA"
    if( type === "todos" || type === "videos" ){
        for (let i = 0; i < Object.keys(video_player_data).length; i++) {
            let key1 = Object.keys(video_player_data)[i];
        
            if( video_player_data[key1]["age"] === 0 || video_player_data[key1]["age"] == age ){
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
                            ((video_player_data[key1]["type"][key2]["playList"][key3]["type"]).toLowerCase()).includes(search)
                        ) {
                            // add this regist on the array
                            result_array.push({
                                "no" : key1+"-"+key2+"-"+key3,
                                "type" : "video",
                                "name" : video_player_data[key1]["type"][key2]["playList"][key3]["name"],
                                "author" : video_player_data[key1]["type"][key2]["playList"][key3]["author"],
                                "url" : video_player_data[key1]["type"][key2]["playList"][key3]["url"]
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

            if( audio_player_data[key1]["age"] === 0 || audio_player_data[key1]["age"] == age ){
                for (let j = 0; j < Object.keys(audio_player_data[key1]["playList"]).length; j++) {
                    let key2 = Object.keys(audio_player_data[key1]["playList"])[j];
                    
                    for (let k = 0; k < Object.keys(audio_player_data[key1]["playList"][key2]["tracklist"]).length; k++) {
                        let key3 = Object.keys(audio_player_data[key1]["playList"][key2]["tracklist"])[k];
                         
                        //check if has one word of search_array;
                        if(
                            // if audio name includes the searched words
                            ((audio_player_data[key1]["playList"][key2]["tracklist"][key3]["songName"]).toLowerCase()).includes(search) ||
                            // if audio artist includes the searched words
                            ((audio_player_data[key1]["playList"][key2]["tracklist"][key3]["artist"]).toLowerCase()).includes(search) 
                        ){

                            // add this regist on the array
                            result_array.push({
                                "no" : key1+"-"+key2+"-"+key3,
                                "type" : "audio",
                                "name" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["songName"],
                                "author" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["artist"],
                                "url" : audio_player_data[key1]["playList"][key2]["tracklist"][key3]["url"],
                                "image" : audio_player_data[key1]["thumbnail"]
                            });
                        }
                    }
                }
            }
        }
    }

    //search elements in "LIBROS PLAYER DATA"
    if( type === "todos" || type === "libros" ){
        // still in construction
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
                        
                            //check if has one word of search_array;
                            if(
                                // if event name includes the searched words
                                ((cartelera_data[key1][key2][key3]["nombre"]).toLowerCase()).includes(search) ||
                                // if event staff includes the searched words
                                ((cartelera_data[key1][key2][key3]["staff"]).toLowerCase()).includes(search) ||
                                // if event estado includes the searched words
                                ((cartelera_data[key1][key2][key3]["estado"]).toLowerCase()).includes(search) ||
                                // if event ciudad includes the searched words
                                ((cartelera_data[key1][key2][key3]["ciudad"]).toLowerCase()).includes(search)
                            ){
                                // add this regist on the array
                                result_array.push({
                                    "no" : key1+"-"+key2,
                                    "type" : "cartelera",
                                    "name" : cartelera_data[key1][key2][key3]["nombre"],
                                    "author" : cartelera_data[key1][key2][key3]["staff"],
                                    "estado" : cartelera_data[key1][key2][key3]["estado"],
                                    "fecha_inicio" : cartelera_data[key1][key2][key3]["fecha_inicio"],
                                    "fecha_termino" : cartelera_data[key1][key2][key3]["fecha_termino"],
                                    "horario" : cartelera_data[key1][key2][key3]["horario"],
                                    "image" : cartelera_data[key1][key2][key3]["thumbnail"]
                                });
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

    for (let i = current_flag; i < (current_flag + 9); i++) {
        if ( results[i] !== undefined ) {
           
            switch ( results[i]["type"] ) {
                case "video":       //for video frame
                        toDraw += `
                            <div class="col-4">
                                <div>
                                    <img src="https://i.ytimg.com/vi/`+ (  (results[i]["url"]).replace( 'https://www.youtube.com/embed/', '')  ) +`/1.jpg" alt="imagen del video ${results[i]["name"]}" />
                                </div>
                                <div>
                                    <div>Video</div>
                                    <div>${results[i]["name"]}</div>
                                    <div>${results[i]["author"]}</div>
                                </div>
                            </div>
                        `;                
                    break;
            
                default:
                    break;
            }

            // execute only on the las iteration
            if( i === (current_flag + 8) && results[i + 1] != undefined ){
                // show "show more" button
                document.getElementById("showMoreBtn").style.display = "block";    
            }
        } else {
            // hide show more button
            document.getElementById("showMoreBtn").style.display = "none";
            
            break;
        } 
    }

    result_window.innerHTML = result_window.innerHTML + toDraw;
    current_flag += 9;
}



