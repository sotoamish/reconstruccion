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
    console.log("drawing audios component _ "+ age)
}