//when page ends load
document.addEventListener("DOMContentLoaded", function(event) {
    
    // get section from url paramaters "function from submenu.js"
    const section = get_params( "section" );
    // it cant be subsection withour a prev section
    const subSection = get_params( "subsection" );


    if( section !== null){
        //if section exits, click on section button
        document.querySelectorAll('[data-funcname="'+section+'"]')[0].click();
    } else {
        //if section doesn´t exists, click on first subMenu button
        document.getElementsByClassName("subMenuBtn")[0].click();
    }

    
    if( subSection !== null){
        document.querySelectorAll('[data-target="'+subSection+'"]')[0].click();
    } else {
        //PROVISIONAL, SELECCIONA BLOQUE DE AUDIOS
        document.getElementsByClassName("menu_btn_container")[1].click();
    }
});
