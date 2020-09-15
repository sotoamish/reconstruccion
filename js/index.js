// create an array with age buttons
const ageBtns = Array.prototype.slice.call(
    document.getElementsByClassName("ageBtn")
);

// resize buttons on click
function resizeBtn( elm ){
    
    ageBtns.forEach( btn => {

        if( elm.id === btn.id ){
            if( !btn.classList.contains("active") ){
                btn.classList.add("active");
            }
        } else {
            btn.classList.remove("active");    
        }        
    });

}