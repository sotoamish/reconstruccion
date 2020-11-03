var blog_flag = null;
var first_flag = null;
// draw blog component
function drawComponentBlog( age ){
    let component_container = document.getElementById("component_container");
    let toDraw = "";

    if( Object.keys(blog_data).length > 0 ) {
        //get first printable post        
        for (let i = 0; i < Object.keys(blog_data).length; i++) {
            if( blog_data[ Object.keys(blog_data)[i] ]["age"] === 0 ||
                blog_data[ Object.keys(blog_data)[i] ]["age"] === parseInt(age)){
                blog_flag = i;
                first_flag = i;
                break; 
            }
        }
    } 
    
    if( blog_flag === null ) {       //if there isnt posts print error message
        toDraw = `
            <div class="row"> 
                <div class="col-12">
                    Aun no hay entradas en el Blog - o(〒﹏〒)o -
                </div>
            </div>
        `;
    } else {        //if there is posts print posts
        toDraw += `
            <div class="row post_list" id="post_list">
            </div>

            <div class="row">
                <div class="col-12 post_button age_${age}">
                    <button id="showMoreBtn" onClick="print_blog_posts(${age})">Mostrar más resultados</button>
                </div> 
            </div> 
        `;       
    }

    component_container.innerHTML = toDraw;    
    if( blog_flag !== null ){
        print_blog_posts(age);
    }
}

function print_blog_posts(age){
    let post_list = document.getElementById("post_list");
    let toDraw = ``;
    
    for (let i = blog_flag; i <= (blog_flag + 1); i++) {
        if ( Object.keys(blog_data)[i] !== undefined ) {
            let key_name = Object.keys(blog_data)[i];

            //if is the first flag post -print full info
            if( i === first_flag ){
                toDraw += `
                    <div class="col-12 blog_card age_${age}">
                        <div class="titulo">${blog_data[key_name]["titulo"]}</div>
                        <div class="area">${blog_data[key_name]["area"]} &nbsp; - &nbsp; Por: ${blog_data[key_name]["autor"]} &nbsp; - &nbsp; ${(key_name.split("-"))[0]}</div>
                        <div class="imagen">
                            <img src="${blog_data[key_name]["imagen"]}" alt="imagen del artículo '${blog_data[key_name]["titulo"]}'" />
                        </div>
                        <div class="subTitulo">${blog_data[key_name]["subTitulo"]}</div>
                        <div class="publicacion">
                            ${((blog_data[key_name]["publicacion"]).length > 500)? (blog_data[key_name]["publicacion"]).substring(0,500) + "..." : blog_data[key_name]["publicacion"] }
                        </div>
                        <div class="link">
                            <a href="blog.html?age=${age}&post=${key_name}" target="_blank"> 
                                Leer más
                            </a> 
                        </div>
                    </div>                
                `;
            } else {    //print name and link
                toDraw += `                
                    <div class="col-12 blog_card age_${age}">
                        <div class="titulo">${blog_data[key_name]["titulo"]}</div>
                        <div class="area">${blog_data[key_name]["area"]} &nbsp; - &nbsp; Por: ${blog_data[key_name]["autor"]} &nbsp; - &nbsp; ${(key_name.split("-"))[0]}</div>
                        <div class="subTitulo little">${blog_data[key_name]["subTitulo"]}</div>
                        <div class="link">
                            <a href="" target="_blank"> 
                                Leer más
                            </a> 
                        </div>
                    </div>                
                `;
            }   
        }

        if( Object.keys(blog_data)[i + 1] == undefined ){
            document.getElementById("showMoreBtn").style.display = "none";
        }
    }

    blog_flag += 2;
    post_list.innerHTML += toDraw;
}