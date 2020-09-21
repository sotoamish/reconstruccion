//select witch component to draw
function drawComponent( component, age ){
    switch (component) {
        case "audios":
                drawComponentAudios(age);
            break;
        case "videos":
                //drawComponentsVideos(age)
            break;
        case "juegos":
                //drawComponentJuegos(age)
            break;
        case "apps":
                //drawComponentApps(age)
            break;
    
        default:
            break;
    }
}


//draw audios component
function drawComponentAudios(age){

    let toDraw = ``;

    //print audio player structure
    toDraw += `
        <div class="row comp_audios">
            <div class="col-3 comp_audios_avatar">
                <div class="avatar_container">
                    <img src="" tag="avatar de lista de reproducción" id="comp_audio_avatar_img">
                </div>
                <div id="comp_audio_avatar_name">
                    Lista de reproducción seleccionada
                </div>
            </div>

            <div class="col-9 comp_audios_trackList" id="comp_audios_trackList">
                comp_audios_trackList
            </div>

            <div class="col-12 p-0 controls_container">
                <div class="row">
                    
                    <div class="col-4 comp_audios_current">
                        <div id="comp_audio_current_name">
                            Current Audio
                        </div>
                    </div>
                    
                    <div class="col-4 comp_audio_controls">
                        <div><i class="fas fa-step-backward" id="comp_audio_prev"></i></div>
                        <div class="big_btn">
                            <i class="far fa-play-circle" id="comp_audio_play"></i>
                            <i class="far fa-stop-circle" id="comp_audio_stop"></i>
                        </div>
                        <div><i class="fas fa-step-forward" id="comp_audio_next"></i></div>
                    </div>
                    
                    <div class="col-1 p-0 comp_audio_volume text-right">
                        <i class="fas fa-volume-up"></i>
                    </div>
                    <div class="col-3 comp_audio_volume">
                        <audio id="true_audio_player" controls style="display:none"></audio>
                        <div class="volume-slider-con">
                            <div class="volume-slider"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 comp_audio_playLists">
                <div class="col-12 playLists_container">
    `;

    // console.log( Object.keys(audio_player_data).length );
    //add all playlists (data from aduos_player_data.js)
    if( Object.keys(audio_player_data).length > 0){
        for (let i = 0; i < Object.keys(audio_player_data).length; i++) {
            let current_key = Object.keys(audio_player_data)[i];

            toDraw += `
                <div class="list_element" data-target="`+ current_key +`" onClick="select_playlist(this)">
                    <div class="avatar_container">
                        <img src="`+ audio_player_data[current_key]["thumbnail"] +`" alt="logo de `+ audio_player_data[current_key]["name"] +`">
                    </div>
                    <div>
                        `+ audio_player_data[current_key]["name"] +`
                    </div>
                </div>
            `;
        }
    } else {
        toDraw += `No se econtró ninguna lista de reproducción`;
    }
    

    toDraw += `
                </div>
            </div>
        </div>
    `;

    document.getElementById("component_container").innerHTML = toDraw;
    //auto select first playList
    document.getElementsByClassName("list_element")[0].click(); 

    //add functions to player (functions from aduioPlayerFunction.js)
    add_audio_player_functions();
    add_volume_functions();
}