// show selected playList
function show_play_list( elm ){
    //loop all playList fields
    let playListField = document.getElementsByClassName("type_list_container");

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

// show selected playList
function show_type_list( elm ){
    //loop all type_list fields
    let typeListField = document.getElementsByClassName("track_list_container");

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