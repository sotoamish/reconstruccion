//select witch component to draw
function drawComponent( component, age ){
    switch (component) {
        case "audios":
                drawComponentAudios(age);
            break;
        case "videos":
                drawComponentVideos(age)
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

    rewrite_url( null, component );
}


//draw audios component
function drawComponentAudios(age){

    let toDraw = ``;

    //print audio player structure
    toDraw += `
        <div class="row comp_audios age_`+age+`">
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
                    <div class="col-3 comp_audio_volume vol_container">
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

    //add all playlists (data from aduos_player_data.js)
    if( Object.keys(audio_player_data).length > 0){
        for (let i = 0; i < Object.keys(audio_player_data).length; i++) {
            let current_key = Object.keys(audio_player_data)[i];

            if( audio_player_data[current_key]["age"] === 0 ||
                audio_player_data[current_key]["age"] === age )
            {
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


//draw video component
function drawComponentVideos(age){  
    let toDraw = ``;

    toDraw += `
        <div class="row comp_videos age_`+age+`">
            <div class="col-8 player_container">
                <div>
                    <iframe id="true_video_player" src="" frameborder="0" allowfullscreen></iframe>
                </div>

                <div class="video_info" id="video_info">

                </div>
            </div>
            <div class="col-4 video_list_container">
    `;

    //add all playlists (data from video_player_data.js)
    if( Object.keys(video_player_data).length > 0){
        for (let i = 0; i < Object.keys(video_player_data).length; i++) {
            let current_key = Object.keys(video_player_data)[i];

            if( video_player_data[current_key]["age"] === 0 ||
                video_player_data[current_key]["age"] === age )
            {
                toDraw += `
                    <div class="row">
                        <div class="col-12 playList_button" data-target="video_list_`+current_key+`" onClick="show_play_list(this)">
                            `+ video_player_data[current_key]["name"] +`
                        </div>
                        <div class="col-12 playList_container" id="video_list_`+current_key+`">
                `;

                //add all video types from this playList
                if( Object.keys(video_player_data[current_key]["type"]).length > 0){
                    for (let j = 0; j < Object.keys(video_player_data[current_key]["type"]).length; j++) {
                        let current_type = Object.keys(video_player_data[current_key]["type"])[j];

                        toDraw += `
                            <div class="row">
                                <div class="col-12 typeList_button" data-target="type_list`+current_key+`-`+current_type+`" onClick="show_type_list(this)">
                                `+ video_player_data[current_key]["type"][current_type]["name"] +`
                                    <div class="vid_count">`
                                        +Object.keys(video_player_data[current_key]["type"][current_type]["playList"]).length+` videos
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 typeList_container" id="type_list`+current_key+`-`+current_type+`">
                        `;
                            
                        //add all tracks from this playList (descendant mode)
                        if( Object.keys(video_player_data[current_key]["type"][current_type]["playList"]).length > 0){
                            for (let k = Object.keys(video_player_data[current_key]["type"][current_type]["playList"]).length - 1; k >= 0; k--) {
                                let current_vid = Object.keys(video_player_data[current_key]["type"][current_type]["playList"])[k];
                                
                                toDraw += `
                                    <div class="track_button" 
                                        data-list="`+current_key+`" 
                                        data-type="`+current_type+`"
                                        data-track="`+current_vid+`"
                                        onClick="change_video(this)">`+
                                        current_vid+`. `+video_player_data[current_key]["type"][current_type]["playList"][current_vid]["name"]
                                    +`</div>
                                `;
                            }
                        }

                        toDraw += `
                            </div>
                        `;
                    }
                }
            
                

                toDraw += `
                        </div>
                    </div>
                `;
            }
        }
    } 
                
    toDraw += `
            </div>
        </div>
    `;

    document.getElementById("component_container").innerHTML = toDraw;

    //auto select first play_list
    document.getElementsByClassName("playList_button")[0].click();
    //auto select first type_list
    document.getElementsByClassName("typeList_button")[0].click();
    //auto select first track
    document.getElementsByClassName("track_button")[0].click();
}