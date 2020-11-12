//draw video component for infancia1, infancia2
function drawComponentVideos(age){  
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let toDraw = ``;

    toDraw += `
        <div class="row comp_videos age_`+age+`">
            <div class="col-lg-8 player_container">
                <div>
                    <iframe id="true_video_player" src="" frameborder="0" allowfullscreen></iframe>
                </div>

                <div class="video_info" id="video_info">

                </div>
            </div>

            <div class="col-lg-4 video_list_container">
    `;

    //add all playlists (data from video_player_data.js)
    if( Object.keys(video_player_data).length > 0){
        for (let i = 0; i < Object.keys(video_player_data).length; i++) {
            let current_key = Object.keys(video_player_data)[i];

            if( video_player_data[current_key]["age"] == 0 ||
                video_player_data[current_key]["age"] == age )
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


    //draw recent recomendations (only 3 of them)
    var videoCollection = getRecentVideos( age );
                
    toDraw += `
            </div>

            <div class="col-12 vid_list">
                <div class="row">
    `;

    // muestra videos desde current show index hasta 6 videos siguientes
    for (let i = 0; i < 3; i++) {
        if( videoCollection[i] !== undefined ){ // if videocollection exists print
            let key = videoCollection[i]["key"];
            let type_key = videoCollection[i]["type_key"];
            let list_key = videoCollection[i]["list_key"];
            
            toDraw += `
                    <div 
                        class="col-sm-4 vid_card" 
                        data-list="`+key+`" 
                        data-type="`+type_key+`"
                        data-track="`+list_key+`"
                        onClick="change_video(this)"
                    >
                        <div class="img_container">
                            <img 
                                src="https://i.ytimg.com/vi/`+ (  (video_player_data[key]["type"][type_key]["playList"][list_key]["url"]).replace( 'https://www.youtube.com/embed/', '')  ) +`/1.jpg"
                                alt=" video de ${video_player_data[key]["type"][type_key]["playList"][list_key]["name"]}"
                            />
                        </div>
                        <div class="info_container">
                            <div class="title">
                                ${video_player_data[key]["type"][type_key]["playList"][list_key]["name"]}
                            </div>
                            <div class="description"> 
                                `+
                                    ( (video_player_data[key]["type"][type_key]["playList"][list_key]["description"]).substring(0,150) )
                                +
                                    (( (video_player_data[key]["type"][type_key]["playList"][list_key]["description"]).length > 150 )? "..." : "" )
                                +`
                            </div> 
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
        </div>
    `;

    document.getElementById("component_container").innerHTML = toDraw;

    let auto_sel_var = get_params("item");
    autoSelectVideo( auto_sel_var );
}

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

//generate a list with recent videos
function getRecentVideos( age ){
    var videoCollection = new Array();
    // get an array of avalible videos for this age
    if( Object.keys(video_player_data).length > 0 ){
        for (let i = 0; i < Object.keys(video_player_data).length; i++) {   //recorre cada lista
            let key = Object.keys(video_player_data)[i];
            
            if( video_player_data[key]["age"] == 0 || video_player_data[key]["age"] == age ){
                for(let j = 0; j < Object.keys(video_player_data[key]["type"]).length; j++) {     //recorre cada type
                    let type_key = Object.keys(video_player_data[key]["type"])[j]

                    for (let k = 0; k < Object.keys(video_player_data[key]["type"][type_key]["playList"]).length; k++) {    //recorre el playlist
                        let list_key = Object.keys(video_player_data[key]["type"][type_key]["playList"])[k];     

                        videoCollection.push({
                            "key": key, 
                            "type_key": type_key, 
                            "list_key": list_key,
                            "date" : video_player_data[key]["type"][type_key]["playList"][list_key]["date"]
                        });
                    }
                }
            }
        }
    }

    // order the array by dates
    videoCollection.sort((a, b) => {
        let c = new Date(a.date);
        let d = new Date(b.date);
        
        return d - c;
    });

    return videoCollection;
}

//auto select videos
function autoSelectVideo( flag ){

    if( flag === null ) {
        //auto select first play_list
        document.getElementsByClassName("playList_button")[0].click();
        //auto select first type_list
        document.getElementsByClassName("typeList_button")[0].click();
        //auto select first track
        document.getElementsByClassName("track_button")[0].click();
    } else {
        // split flag string
        flag = flag.split("-");
        //get all playLists and click on selected
        let playListBtns = document.getElementsByClassName("playList_button");
        for (let i = 0; i < playListBtns.length; i++) {
            if( (playListBtns[i]).dataset.target === "video_list_"+flag[0] ){
                (playListBtns[i]).click();
                break;
            }
        }
        //get all typeLists and click on selected
        let typeListBtns = document.getElementsByClassName("typeList_button");
        for (let i = 0; i < typeListBtns.length; i++) {
            if( (typeListBtns[i]).dataset.target === "type_list"+flag[0]+"-"+flag[1] ){
                (typeListBtns[i]).click();
                break;
            }
        }
        //get all track buttons and click on selected
        let trackBtns = document.getElementsByClassName("track_button");
        for (let i = 0; i < trackBtns.length; i++) {
            if( (trackBtns[i]).dataset.list === flag[0] &&
                (trackBtns[i]).dataset.type === flag[1] &&
                (trackBtns[i]).dataset.track === flag[2]
            ){
                (trackBtns[i]).click();
                break;
            }
        }
    }
}

//  ---------------------------------------
//      functions for video player 2
//  ---------------------------------------
//draw video component for jovenes
var currentAge;
function drawComponentVideos2(age){
    currentAge = age;
    var toDraw = `
        <div class="row">
            <div class="col-12 vid_2">
                <div class="row" id="vid_listContainer">

                </div>
            </div>

            <div class="col-12 vidShowContainer">
                <button id="vidShowBtn" onClick="print_videoList2()">Mostras mas</button>
            </div>
        </div>

        <div class="vid_player2_screen" id="vid_player2_screen">
            <div class="vid_player2_container">
                <button class="close_player" onClick="closeVid2()">
                    <i class="far fa-times-circle"></i>
                </button>
                <iframe id="true_video_player" src="" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>  
    `;
    
    document.getElementById("component_container").innerHTML = toDraw;

    // print video list     (function from videoPlayerFunctions.js)
    print_videoList2();

    if( get_params("item") !== null ){
        changeVid2( get_params("item") );
    }
}

// print video list on jovenes, formadores
currentShowIndex = 1;               //for show video list index
function print_videoList2(){
    var videoCollection = getRecentVideos( currentAge );
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
                    class="col-md-4 col-6 vid_card" 
                    data-code="${key}-${type_key}-${list_key}"
                    onClick="changeVid2('${key}-${type_key}-${list_key}')"
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
    let code = elm.split("-");
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