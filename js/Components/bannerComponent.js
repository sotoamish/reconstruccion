// lista de banners para escritorio y mobil
const listaBanners = {
    0 : {
        "evento" : "Descarga libros de la colección Alas de Lagartija",
        "desktop" : "img/banners/alasdelagartija.png",
        "mobil" : "img/banners/alasdelagartija.png" ,
        "url" : "https://www.alasyraices.gob.mx/librero.html?age=2&type=libros&id=27"
    },
    1 : {
        "evento" : "soy el nombre del evento o banner",
        "desktop" : "img/banners/vozdibujacambio.png",
        "mobil" : "img/banners/vozdibujacambio.png" ,
        "url" : "https://www.youtube.com/playlist?list=PLGsaNvyPG8GG2vr1Zc6lXrlpj2L6uPTpa"
    }, /*
    2 : {
        "evento" : "soy el nombre del evento o banner",
        "desktop" : "img/juego y mov-02.png",
        "mobil" : "img/juego y mov-02small.png" ,
        "url" : "pagina_evento.html"
    }, */
};



document.addEventListener("DOMContentLoaded", function(event) {
    let maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
    let bannerAction = document.getElementById("bannerAction");
    let toDraw = `
        <div class="col-12 p-0 banner_block">
            <div class="swiper-container">
                <div class="swiper-wrapper">
    `;

    console.log(maxWidth);

    for (let i = 0; i < Object.keys(listaBanners).length; i++) {
        let key = Object.keys(listaBanners)[i];
        
        toDraw += `
                    <div class="swiper-slide">
                        <a href="${listaBanners[key]['url']}" target="_blank">
                            <img 
                                src="`+( (maxWidth <= 575.98)? listaBanners[key]['mobil'] : listaBanners[key]['desktop'] )+`"
                                class="`+( (maxWidth <= 575.98)? 'small' : '' )+`"
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








