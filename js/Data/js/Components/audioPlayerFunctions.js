//change and print to selected playList 
function select_playlist( elm ){
    let list_id = elm.dataset.target;

    let toDraw = `
        <div class="row">
    `;

    //draw albums buttons 
    for( let i=0; i < Object.keys(audio_player_data[list_id]["playList"]).length; i++){
        let album_id = Object.keys(audio_player_data[list_id]["playList"])[i];
        toDraw += `
            <div class="col-12 typeList_button" onClick="select_album(`+album_id+`)">`
                +audio_player_data[list_id]["playList"][album_id]["album"]+    
                `<div class="album_contents">`+Object.keys(audio_player_data[list_id]["playList"][album_id]["tracklist"]).length+` tracks</div>
            </div>
            <div class="col-12 typeList_container" id="typeList_album-`+album_id+`">
               <div class="row"> 
            `;

            //draw tracks (descendant form)
            // for( let j = 0 ; j < Object.keys(audio_player_data[list_id]["playList"][album_id]['tracklist']).length; j++){
            for( let j = Object.keys(audio_player_data[list_id]["playList"][album_id]['tracklist']).length - 1; j >= 0; j--){
                let track_id = Object.keys(audio_player_data[list_id]["playList"][album_id]['tracklist'])[j];
                toDraw += `
                    <div class="col-12 audio_element" 
                        data-list="`+ list_id +`" 
                        data-album="`+ album_id +`" 
                        data-track="`+ track_id +`" 
                        onClick="select_audio(this.dataset.list, this.dataset.album, this.dataset.track)"
                        >
                        <div class="nombre">
                            `+ audio_player_data[list_id]["playList"][album_id]["tracklist"][track_id]["songName"] +`
                        </div>
                        <div class="descripcion">
                            `+ audio_player_data[list_id]["playList"][album_id]["tracklist"][track_id]["artist"] +`
                        </div>
                    </div>
                `;
            }

        toDraw += `
                </div>
            </div>
        `;
    }

    toDraw += `
        </div>
    `;

    document.getElementById("comp_audios_trackList").innerHTML = toDraw;

    //change avatar_section values
    //change avatar
    document.getElementById("comp_audio_avatar_img").src = audio_player_data[elm.dataset.target]["thumbnail"];
    //change playlist name
    document.getElementById("comp_audio_avatar_name").innerHTML = audio_player_data[elm.dataset.target]["name"];

    //select first album
    document.getElementsByClassName("typeList_button")[0].click();
    //autop play first track
    document.getElementsByClassName("audio_element")[0].click();
}


//select an album, show track list 
function select_album( album_id ){
    let album_containers = document.getElementsByClassName("typeList_container");

    for (let i = 0; i < album_containers.length; i++) {
        if( (album_containers[i].id) === "typeList_album-"+album_id ){
            // if( !playListField[i].classList.contains("active") ){
                album_containers[i].classList.toggle("active");
                // album_containers[i].scrollIntoView({ behavior: 'smooth', block: 'center'});  
            // }   
        } else {
            //remove active
            album_containers[i].classList.remove("active");
        }    
    }
}


//select an audio,  set on audio info, set on player
function select_audio( list, album, track ){
    //invoke audio_stop
    audio_stop();

    //set data on audio info
    document.getElementById("comp_audio_current_name").innerHTML = audio_player_data[ list ]["playList"][ album ]["tracklist"][track]["songName"];

    //set audio_file on player
    let true_player = document.getElementById("true_audio_player");
    true_player.setAttribute('src', audio_player_data[ list ]["playList"][ album ]["tracklist"][track]["url"]);
    
    //set audio info on player dataset
    true_player.dataset.currentplaylist = list;
    true_player.dataset.currentalbum = album;
    true_player.dataset.currentid = track;
}


//add functions to volume controller 
function add_volume_functions(){
    var e = document.querySelector('.volume-slider-con');
    var eInner = document.querySelector('.volume-slider');
    var audio = document.getElementById('true_audio_player');
    var drag = false;
    e.addEventListener('mousedown',function(ev){
        drag = true;
        updateBar(ev.clientX);
    });
    document.addEventListener('mousemove',function(ev){
        if(drag){
            updateBar(ev.clientX);
        }
    });
    document.addEventListener('mouseup',function(ev){
        drag = false;
    });
    var updateBar = function (x) {
        var volume = e;
        var percentage;
        var position = parseFloat(e.getBoundingClientRect().left);
        var position = x - position;
        
        percentage = 100 * position / volume.clientWidth;
        
        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        //update volume bar and video volume
        eInner.style.width = percentage +'%';
        audio.volume = percentage / 100;
    };
}


//add player controller functions
function add_audio_player_functions(){
    var prevBtn = document.getElementById("comp_audio_prev");
    var playBtn = document.getElementById("comp_audio_play");
    var stopBtn = document.getElementById("comp_audio_stop");
    var nextBtn = document.getElementById("comp_audio_next");

    prevBtn.addEventListener("click", (e)=>{
        audio_swap("backward");
    });

    playBtn.addEventListener("click", (e)=>{
        audio_play();
    });

    stopBtn.addEventListener("click", (e)=>{
        audio_stop();
    });

    nextBtn.addEventListener("click", (e)=>{
        audio_swap("forward");
    });
}


//trigger audio play function
function audio_play(){
    //audio play
    document.getElementById("true_audio_player").play();
    //hide play btn
    document.getElementById("comp_audio_play").style.display = "none";
    //show stop btn
    document.getElementById("comp_audio_stop").style.display = "inline-block";
}

//trigger audio stop function
function audio_stop(){
    //audio stop
    document.getElementById("true_audio_player").pause();
    //hide stop btn
    document.getElementById("comp_audio_stop").style.display = "none";
    //show  play btn
    document.getElementById("comp_audio_play").style.display = "inline-block";
}

//change to forward song
function audio_swap( action ) {
    let true_player = document.getElementById("true_audio_player");
    let current_playlist = true_player.dataset.currentplaylist;
    let current_album = true_player.dataset.currentalbum
    let current_audio = true_player.dataset.currentid;

    //loop the arraw to know if prev or next song exists
    for (let i = 0; 
            i < Object.keys( audio_player_data[ current_playlist ]["playList"][current_album]["tracklist"] ).length; 
            i++) 
    {
        let current_key = Object.keys(audio_player_data[ true_player.dataset.currentplaylist ]["playList"])[i];

        if( current_key === current_audio ){
            
            let prev_key = Object.keys(audio_player_data[ true_player.dataset.currentplaylist ]["playList"][current_album]["tracklist"])[i - 1];
            let next_key = Object.keys(audio_player_data[ true_player.dataset.currentplaylist ]["playList"][current_album]["tracklist"])[i + 1];

            if( action === "backward" ){   //for forward action
                if( prev_key !== undefined ){
                    //change audio to prev
                    select_audio( current_playlist, prev_key );
                }
            } else if ( action === "forward" ) {   //for backward action
                if( next_key !== undefined ){
                    //change audio to next
                    select_audio( current_playlist, next_key );
                }
            }   
            break;
        }
    }

}