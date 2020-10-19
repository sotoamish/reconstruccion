//when page end loading
document.addEventListener("DOMContentLoaded", function(event) {
    //set diferent "infancias menu" functions to desktop or mobile
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        //on click, resize button, and then redirect
        ageBtns.forEach( btn => {
            btn.addEventListener('click', e => {
                resizeBtn(btn);
                setTimeout(()=>{
                    window.location = btn.dataset.link;
                },1000);
            });
        });
    } else {
        //on hover resize button, on click redirect
        ageBtns.forEach( btn => {
            btn.addEventListener('mouseenter', e => {
                resizeBtn(btn);
            });
            btn.addEventListener('click', e => {
                window.location = btn.dataset.link;
            });
        });
    }
});

// create an array with age buttons
const ageBtns = Array.prototype.slice.call(
    document.getElementsByClassName("ageBtn"),
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