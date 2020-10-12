// lista de banners para escritorio y mobil
const listaBanners = {
    0 : {
        "evento" : "soy el nombre del evento o banner",
        "desktop" : "img/juego y mov-02.png",
        "mobil" : "img/juego y mov-02small.png" ,
        "url" : "pagina_evento.html"
    },
    1 : {
        "evento" : "soy el nombre del evento o banner",
        "desktop" : "img/juego y mov-02.png",
        "mobil" : "img/juego y mov-02small.png" ,
        "url" : "pagina_evento.html"
    },
    2 : {
        "evento" : "soy el nombre del evento o banner",
        "desktop" : "img/juego y mov-02.png",
        "mobil" : "img/juego y mov-02small.png" ,
        "url" : "pagina_evento.html"
    },
};



document.addEventListener("DOMContentLoaded", function(event) {
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
    let bannerAction = document.getElementById("bannerAction");
    let toDraw = `
        <div class="col-12 p-0 banner_block">
            <div class="swiper-container">
                <div class="swiper-wrapper">
    `;

    for (let i = 0; i < Object.keys(listaBanners).length; i++) {
        let key = Object.keys(listaBanners)[i];
        
        toDraw += `
                    <div class="swiper-slide">
                        <a href="${listaBanners[key]['url']}" target="_blank">
                            <img 
                                src="`+( (isMobile)? listaBanners[key]['mobil'] : listaBanners[key]['desktop'] )+`"
                                class="`+( (isMobile)? 'small' : '' )+`"
                                alt="Banner de ${listaBanners[key]['evento']}"
                            />                
                        </a>
                    </div>
        `;
    }

    toDraw += `                
                </div>
                
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
    `;

    bannerAction.innerHTML = toDraw;

    //initialize swipper
    initializeBannerSwipper();
});


function initializeBannerSwipper() {
    //initialize the swiper carousel
    var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
    });
}








