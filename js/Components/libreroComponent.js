function draw_bookshelf( age ){
    let bookshelf = document.getElementById("bookshelf");
    let toDraw = ``;
    let shelf_collection = getShelfCollection(age);

    toDraw += `
        <div class="row">
            <div class="col-10 offset-1 shelf_container age_${age}">
                <div class="icon_container">
                    <div class="icon"><img src="img/libros.png" alt="ícono del librero digital" /></div>
                    <div class="name">Librero <br> digital</div>
                </div>
                <div class="separator"></div>
                <div class="folleto_container">
    `;
    
    for (let i = 0; i < 10; i++) {
        let key = Object.keys(shelf_collection["folletos"])[i];
        if(key){
            let elm = shelf_collection["folletos"][key];
        
            toDraw += `
                        <div class="book_card">
                            <div class="image"><img src="${elm["cover"]}" alt="imagen del libro ${elm["name"]}" /></div>
                            <div class="name">${elm["name"]}</div>
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
            let elm = shelf_collection["libros"][key];
        
            toDraw += `
                        <div class="book_card">
                            <div class="image"><img src="${elm["cover"]}" alt="imagen del libro ${elm["name"]}" /></div>
                            <div class="name">${elm["name"]}</div>
                        </div> 
            `;
        } else { break; }
    };

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
                shelf_collection[type].push( librero_data[type][key] );
            }
        }
    });

    return shelf_collection;
}