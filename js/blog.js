document.addEventListener("DOMContentLoaded", function(event) {
    const age = get_params( "age" );
    const post_name = get_params( "post" );
    const content_window = document.getElementById("content_window");
    var toDraw = "";
    
    if( blog_data[post_name] === undefined ){
        toDraw += `
            <div class="col-md-10 offset-md-1 error_window age_${age}">
                Lo sentimos, no pudimos encontrar éste artículo <br>σ(￣、￣〃)
            </div>
        `;
    } else {
        toDraw += `
            <div class="col-md-10 offset-md-1 post_window">
                <div class="titulo age_${age}">${blog_data[post_name]["titulo"]}</div>
                <div class="area">
                    ${blog_data[post_name]["area"]} &nbsp; - &nbsp;
                    Por: ${blog_data[post_name]["autor"]}  &nbsp; - &nbsp;
                    ${(post_name.split("-"))[0]}
                </div>
                <div class="imagen"><img src="${blog_data[post_name]["imagen"]}" alt="imagen del artículo ${blog_data[post_name]["titulo"]}" /></div>
                <div class="subTitulo">${blog_data[post_name]["subTitulo"]}</div>
                <div class="publicacion">${blog_data[post_name]["publicacion"]}</div>
            </div>
        `;
    }

    content_window.innerHTML = toDraw;
});