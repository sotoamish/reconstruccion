const listaApps = {
    0 : {
        "name" : "Trata y Retrata",
        "image" : "https://www.alasyraices.gob.mx/img/apps/TrataYRetrata.png",
        "tags" : "/ Fotografía / Creatividad /",
        "size" : "4.9 Mb",
        "description" : "Aplicación dirigida a niños de entre 6 a 8 años que les permitirá el desarrollo de habilidades visuales para expresar con imágenes una idea o concepto a través de las diferentes herramientas que brinda la fotografía.",
        "android" : "https://play.google.com/store/apps/details?id=zetenterprises.tratayretrata",
        "ios" : "https://itunes.apple.com/mx/app/trata-retrata/id821302952?mt=8",
    },
    1 : {
        "name" : "Marea de colores",
        "image" : "https://www.alasyraices.gob.mx/img/apps/marea.png",
        "tags" : "/ Recreativo / Creatividad /",
        "size" : "18 Mb",
        "description" : "Marea de colores es una aplicación dirigida a bebés de entre 2 a 3 años de edad, donde podrán estimular y explorar sus sentidos a través de la música y los colores.",
        "android" : "https://play.google.com/store/apps/details?id=com.cultura.mareadecolores",
        "ios" : "https://itunes.apple.com/mx/app/marea-de-colores/id731699441?mt=8",
    },
    2 : {
        "name" : "AniMalHechos",
        "image" : "https://www.alasyraices.gob.mx/img/apps/animalechos.png",
        "tags" : "/ Entretenimiento / Creatividad /",
        "size" : "20 Mb",
        "description" : "Aplicación dirigida a niños de entre 6 a 8 años que les permitirá el desarrollo de habilidades visuales para expresar con imágenes una idea o concepto a través deAplicación dirigida a niños de entre 6 a 8 años. Juega mezclando animales, creando historias e inventando nuevos AniMalHechos. Echa a volar tu imaginación con esta aplicación mientras te diviertes.  las diferentes herramientas que brinda la fotografía.",
        "android" : "https://play.google.com/store/apps/details?id=com.cultura.animalechos",
        "ios" : "https://itunes.apple.com/mx/app/animalhechos/id966735305?mt=8",
    },
    3 : {
        "name" : "¡Aquí está!",
        "image" : "https://www.alasyraices.gob.mx/img/apps/aquiesta.png",
        "tags" : "/ Estimulación / Entretenimiento /",
        "size" : "35 Mb",
        "description" : "¡Aquí está!, es un juego que los bebés pueden disfrutar y jugar. Esta aplicación estimula la imaginación y las habilidades senso-perceptuales de niñas y niños ya que incluye elementos como la música, el color, las formas y el factor sorpresa.",
        "android" : "https://play.google.com/store/apps/details?id=com.Secretaria.AquiEsta",
        "ios" : "https://itunes.apple.com/mx/app/aqu%C3%AD-est%C3%A1/id955047843?mt=8",
    },
    4 : {
        "name" : "Geometría musical",
        "image" : "https://www.alasyraices.gob.mx/img/apps/geom.png",
        "tags" : "",
        "size" : "",
        "description" : "Un juego para quienes se quieren aventurar en la composición musical, en donde descubrirás sonidos extraños, nuevos y conocidos. Acompañado de figuras geométricas compón tu propia melodía. Una vez que compongas tu melodía no dejes de ver como las figuras geométricas vuelan y bailan al compás.",
        "android" : "https://play.google.com/store/apps/details?id=air.com.conaculta.geometria",
        "ios" : "https://itunes.apple.com/mx/app/geometr%C3%ADa-musical/id949766198?mt=8",
    },
    5 : {
        "name" : "DetectivesMX",
        "image" : "https://www.alasyraices.gob.mx/img/apps/detectives.png",
        "tags" : "",
        "size" : "",
        "description" : "Conviértete en un Detective MX y viaja a través del tiempo para descubrir a los personajes, sitios y acontecimientos que forman parte de la historia de México. Reta al cronómetro y descubre todos los elementos ocultos en cada época en el menor tiempo posible.",
        "android" : "https://play.google.com/store/apps/details?id=com.cultura.detectives",
        "ios" : "https://itunes.apple.com/mx/app/detectives-mx/id898435578?mt=8",
    },
    6 : {
        "name" : "Con ritmo",
        "image" : "https://www.alasyraices.gob.mx/img/apps/ritmo.png",
        "tags" : "/ Educativo / Creatividad / ",
        "size" : "11 Mb",
        "description" : "Diviértete solo o con tus amigos siguiendo el ritmo del son, la banda y el huapango. ¡Pueden jugar con ritmo de uno hasta cuatro!",
        "android" : "https://play.google.com/store/apps/details?id=air.com.conaculta.conritmo",
        "ios" : "https://itunes.apple.com/mx/app/con-ritmo/id993447485?mt=8",
    },
    7 : {
        "name" : "Hombre de letras",
        "image" : "https://www.alasyraices.gob.mx/img/apps/TrataYRetrata.png",
        "tags" : "/ Fotografía / Creatividad /",
        "size" : "11 Mb",
        "description" : "Conviértete en el hombre de letras, ve palabras en donde no las hay y diviértete jugando con éstas, ¡creando frases extrañas, locas, simpáticas, interesantes o lo que más te guste!",
        "android" : "https://play.google.com/store/apps/details?id=air.com.conaculta.hombredeletras",
        "ios" : "https://itunes.apple.com/mx/app/hombre-de-letras/id973643439?mt=8",
    },
}

// draw apps component
function drawComponentApps( age ){
    let toDraw = ``;

    toDraw += `
        <div class="row">
            <div class="col-12 apps_block age_${age}">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
    `;

    for (let i = 0; i < Object.keys(listaApps).length; i++) {
        let key = Object.keys(listaApps)[i];

        toDraw += `
                        <div class="swiper-slide app_card">
                            <div class="image">
                                <img src="${listaApps[key]["image"]}" alt="logo de la aplicación ${listaApps[key]["name"]}" />
                            </div>
                            <div class="name">${listaApps[key]["name"]}</div>
                            <div class="links">
                                <a href="${listaApps[key]["android"]}"><img src="img/gpstore.png" alt="boton de descarga para Android" /></a>
                                <a href="${listaApps[key]["ios"]}"><img src="img/AppleStore.png" alt="boton de descarga para IOS" /></a>
                            </div>
                            <div class="tags">${listaApps[key]["tags"]}</div>
                            <div class="size">${listaApps[key]["size"]}</div>
                            <div class="description">
                                ${ (listaApps[key]["description"]).substring(0,320) }
                                ${( (listaApps[key]["description"]).length > 320 )? "..." : "" }
                            </div>
                        </div> 
        `;
    }

    toDraw += `
                    </div>
                </div>
                <!-- Add Scrollbar -->
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
    `;

    document.getElementById("component_container").innerHTML = toDraw;

    initialize_AppSwipper();
}

function initialize_AppSwipper() {
    //initialize the swiper carousel
    var swiper = new Swiper('.swiper-container', {
        breakpoints: {
            370: {
                slidesPerView: 1.5,
                spaceBetween: 50,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 50, 
            },
        }
    });
}