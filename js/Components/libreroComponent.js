
document.addEventListener("DOMContentLoaded", function(event) {
    // function for librero.html
    if ( document.getElementById("librero_selector") ) {       //if librero_selector exists
        prepare_page();
    } 
});

//function from libreroComponent (infancia1, infancia2)
function draw_bookshelf( age ){
    let bookshelf = document.getElementById("bookshelf");
    let toDraw = ``;
    let shelf_collection = getShelfCollection(age);

    toDraw += `
        <div class="row">
            <div class="col-10 offset-1 shelf_container age_${age}">
                <div class="icon_container">
                    <div class="icon"><img src="img/libros.png" alt="ícono del librero digital" /></div>
                    <div class="name">Librero digital</div>
                </div>
                <div class="separator"></div>
                <div class="folleto_container">
    `;
    
    for (let i = 0; i < 10; i++) {
        let key = Object.keys(shelf_collection["folletos"])[i];

        if(key){
            let elm = shelf_collection["folletos"][key]["data"];
        
            toDraw += `
                        <div class="book_card">
                            <a href="librero.html?age=${age}&type=folletos&id=${shelf_collection["folletos"][key]["id"]}" target="_blank">
                                <div class="image"><img src="${elm["cover"]}" alt="imagen del libro ${elm["name"]}" /></div>
                                <div class="name">${elm["name"]}</div>
                            </a>
                        </div> 
            `;
        } else { break; }
    }

    toDraw += `
                </div>  
                <div class="separator">
                    Folletos
                </div> 
                <div class="libro_container">
    `;

    for (let i = 0; i < 10; i++) {
        let key = Object.keys(shelf_collection["libros"])[i];

        if(key){
            let elm = shelf_collection["libros"][key]["data"];
        
            toDraw += `
                        <div class="book_card">
                            <a href="librero.html?age=${age}&type=libros&id=${shelf_collection["libros"][key]["id"]}" target="_blank">
                                <div class="image"><img src="${elm["cover"]}" alt="imagen del libro ${elm["name"]}" /></div>
                                <div class="name">${elm["name"]}</div>
                            </a>
                        </div> 
            `;
        } else { break; }
    }

    toDraw += `
                </div>  
                <div class="separator">
                    Libros
                </div> 
            </div>
        </div>
    `;

    bookshelf.innerHTML = toDraw;
}

//function from librero.html
var lib_collection ;
function prepare_page() {
    // get age, get type, get id
    let age = get_params("age");
    let type = get_params("type");
    let id = get_params("id");

    //get window elements
    let librero_selector = document.getElementById("librero_selector");
    let search_button = document.getElementById("elm_search_button");
    let lib_type = document.getElementsByClassName("lib_type");
    let more_btn = document.getElementById("btn_show_more");

    //add onclick searchFunction - print_lib_type
    search_button.onclick = ()=>{ activeSearch(age); }
    //add age class to diferent windows
    librero_selector.classList.add(`age_${age}`);
    more_btn.classList.add(`age_${age}`);

    //get lib_collection
    lib_collection = getShelfCollection( age );

    //auto select type 
    for (let i = 0; i < Object.keys(lib_type).length; i++) {
        if ( (lib_type[i]).id === "btn_"+type ) {
            (lib_type[i]).click();
        }
    }    

    console.log(lib_collection);

    //if id param exists load file
    if( id ) {
        window.open( librero_data[type][id]["url"], '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }
}

// print_librero whit type selected
var currentFlag = 0;
var currentType = "";
function print_lib_type( elm = null ){
    let age = get_params("age");
    let lib_type = document.getElementsByClassName("lib_type");
    let lib_list = document.getElementById("lib_list");
    let toDraw = ``;
    let num_toShow = 9; 

    let type = "";
    if (elm !== null) {     //if type button was selected
        type = ((elm.id).split("_"))[1];    
        currentType = type;

        //change selected button
        for (let i = 0; i < Object.keys(lib_type).length; i++) {
            if (lib_type[i] === elm) {
                if( !(lib_type[i]).classList.contains("active") )
                {
                    lib_type[i].classList.add("active");
                }
                currentFlag = 0;    //reset current flag
            } else {
                lib_type[i].classList.remove("active");
            }
            //clean list window
            lib_list.innerHTML = toDraw;
        }

        //show "show more btn"
        document.getElementById("btn_show_more").style.display = "inline-block";
    } else {
        type = currentType;
    }

    
    // print library type colleciton 
    for (let i = currentFlag; i < (currentFlag + num_toShow); i++) {
        if( Object.keys(lib_collection[type])[i] !== undefined){
            let key = Object.keys(lib_collection[type])[i];
            let elm_obj = lib_collection[type][key]["data"];

            toDraw += `
                
                <div class="col-4 lib_card age_${age}">
                    <div class="card_container">
                        <a href="${elm_obj["url"]}" target="_blank">
                            <div class="image"> <img src="${elm_obj["cover"]}" alt="portada de ${elm_obj["name"]}" /> </div>
                            <div class="info">
                                <div class="type">${elm_obj["type"]}</div>
                                <div class="name">${elm_obj["name"]}</div>
                                <div class="author">${elm_obj["author"]}</div>
                                <div class="description">${elm_obj["description"]}</div>
                            </div>
                        </a>
                    </div>
                </div>
                
            `;
        } else {
            //hide show more button 
            document.getElementById("btn_show_more").style.display = "none";
            break;
        }        
    }
    currentFlag += (num_toShow);

    lib_list.innerHTML = lib_list.innerHTML + toDraw;
}


//get both shelf collection
function getShelfCollection( age ) {
    let shelf_collection = [];
    shelf_collection["folletos"] = [];
    shelf_collection["libros"] = [];

    let book_options = ["folletos", "libros"];

    book_options.forEach( type => {
        for (let i = Object.keys(librero_data[type]).length - 1; i >= 0; i--) {    
            let key = Object.keys(librero_data[type])[i];
            
            if ( 
                librero_data[type][key]["age"] == 0 ||
                librero_data[type][key]["age"] == age
            ){
                shelf_collection[type].push({ "id" : key, "data" : librero_data[type][key] });
            }
        }
    });

    return shelf_collection;
}

