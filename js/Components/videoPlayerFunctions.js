// show selected playList
function show_video_list( elm ){
    //loop all playList fields
    let playListField = document.getElementsByClassName("track_list_container");

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

//change true video src/ change video info
function change_video( elm ){
    //get video player, get elm vars
    let true_video_player = document.getElementById("true_video_player");
    let list = elm.dataset.list;
    let track = elm.dataset.track;

    //change true video source
    true_video_player.src = video_player_data[list]['playList'][track]['url'];

    //change video info
    document.getElementById("video_info").innerHTML = video_player_data[list]['playList'][track]['description'];


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