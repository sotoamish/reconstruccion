//when page ends load
document.addEventListener("DOMContentLoaded", function(event) {
    
    // get section from url paramaters "function from submenu.js"
    const section = get_params( "section" );

    if( section !== null){
        //if section exits, click on section button
        document.querySelectorAll('[data-funcname="'+section+'"]')[0].click();
    } else {
        //if section doesn´t exists, click on first section button
        document.getElementsByClassName("subMenuBtn")[0].click();
    }

    
    
});
