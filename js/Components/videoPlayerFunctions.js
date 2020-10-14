// show selected playList
function show_play_list( elm ){
    //loop all playList fields
    let playListField = document.getElementsByClassName("playList_container");

    for (let i = 0; i < playListField.length; i++) {
        if( playListField[i].id === elm.dataset.target ){
            // if( !playListField[i].classList.contains("active") ){
                playListField[i].classList.toggle("active");
                elm.scrollIntoView({ behavior: 'smooth', block: 'center'});  
            // }   
        } else {
            //remove active
            playListField[i].classList.remove("active");
        }
    }
}

// show selected typeList
function show_type_list( elm ){
    //loop all type_list fields
    let typeListField = document.getElementsByClassName("typeList_container");

    for (let i = 0; i < typeListField.length; i++) {
        if( typeListField[i].id === elm.dataset.target ){
            // if( !playListField[i].classList.contains("active") ){
                typeListField[i].classList.toggle("active");
                elm.scrollIntoView({ behavior: 'smooth', block: 'center'});  
            // }   
        } else {
            //remove active
            typeListField[i].classList.remove("active");
        }
    }
}

//change true video src/ change video info
function change_video( elm ){
    //get video player, get elm vars
    let true_video_player = document.getElementById("true_video_player");
    let list = elm.dataset.list;
    let type = elm.dataset.type;
    let track = elm.dataset.track;

    //change true video source
    true_video_player.src = video_player_data[list]["type"][type]['playList'][track]['url'];

    //change video info
    document.getElementById("video_info").innerHTML = video_player_data[list]["type"][type]['playList'][track]['description'];


    //mark as active, current video, unmark all other videos
    let trackBtns = document.getElementsByClassName("track_button");
    for (let i = 0; i < trackBtns.length; i++) {
        if( trackBtns[i] === elm){
            if( !elm.classList.contains("active") ){
                elm.classList.add("active");
            }
        } else {
            trackBtns[i].classList.remove("active")
        }
    }
}


//  ---------------------------------------
//      functions for video player 2
//  ---------------------------------------

// print video list on jovenes, formadores
function print_videoList2(){
    // print list with ordered array
    let toDraw = `
        <div class="row">
    `;

    // muestra videos desde current show index hasta 6 videos siguientes
    for (let i = (currentShowIndex - 1); i < (currentShowIndex + 5); i++) {
        if( videoCollection[i] !== undefined ){ // if videocollection exists print
            let key = videoCollection[i]["key"];
            let type_key = videoCollection[i]["type_key"];
            let list_key = videoCollection[i]["list_key"];
            
            toDraw += `
                <div 
                    class="col-4 vid_card" 
                    data-code="${key}-${type_key}-${list_key}"
                    onClick="changeVid2(this)"
                >
                    <div>
                        <img 
                            src="https://i.ytimg.com/vi/`+ (  (video_player_data[key]["type"][type_key]["playList"][list_key]["url"]).replace( 'https://www.youtube.com/embed/', '')  ) +`/1.jpg"
                            alt=" video de ${video_player_data[key]["type"][type_key]["playList"][list_key]["name"]}"
                        />
                    </div>
                    <div class="type">
                        Video
                    </div>
                    <div class="title">
                        ${video_player_data[key]["type"][type_key]["playList"][list_key]["name"]}
                    </div>
                    <div class="description"> 
                        `+
                            ( (video_player_data[key]["type"][type_key]["playList"][list_key]["description"]).substring(0,250) )
                        +
                            (( (video_player_data[key]["type"][type_key]["playList"][list_key]["description"]).length > 250 )? "..." : "" )
                        +`
                    </div> 
                </div>
            `;                      
        } else {    //else stop for and hide button
            //hide button
            break;
        }
    
    }                       

    toDraw += `
        </div>
    `;
    
    let list = document.getElementById("vid_listContainer");
    list.innerHTML = list.innerHTML + toDraw;
    //var from componentCollection.js
    currentShowIndex += 6;
}

// show video window, set selected video src
function changeVid2(elm){
    let code = (elm.dataset.code).split("-");
    let videoPlayer = document.getElementById("true_video_player");
    
    // set video source
    videoPlayer.src = video_player_data[ code[0] ]["type"][ code[1] ]["playList"][ code[2] ]["url"];

    //show video window
    document.getElementById("vid_player2_screen").style.display = "block";
}

// close video window
function closeVid2(){
    //stop iframe video, changing src
    document.getElementById("true_video_player").src = ""

    //hide video window
    document.getElementById("vid_player2_screen").style.display = "none";
}