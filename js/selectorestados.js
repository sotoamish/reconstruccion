document.addEventListener("DOMContentLoaded", function() {
    //get "estado" field 
    const field_estado = document.getElementById("estado");

    //add "estados" from estados_data.js to field_estado
    var toPrint = '<option value=""> -Elige tu estado- </option>';
    for (let i = 0; i < Object.keys(estados_data).length ; i++) {
        let key = Object.keys(estados_data)[i];
        toPrint += `
            <option value="${key}"> ${key} </option>
        `;
    }
    field_estado.innerHTML = toPrint;
});

//load "municipios list from estados_data.js"
function updateMunicipios() {
    //get "estado" & municipio field 
    let estado = document.getElementById("estado").value;
    let field_municipio = document.getElementById("municipio");

    let toPrint = ``;

    if(estado !== "") {
        for (let i = 0; i < Object.keys(estados_data[estado]).length; i++) {
            let key = Object.keys(estados_data[estado])[i];
            
            toPrint += `
                <option value="${estados_data[estado][key]}"> ${estados_data[estado][key]} </option>
            `;
        }
    }
    else {
        toPrint += `<option value="">-Elige tu municipio-</option>`;
    }
    
    field_municipio.innerHTML = toPrint;
}

//test if "acepto" is checked
function testCheckUp( elm ){
    //enable or disable submit button when checkbox is cheked
    if(elm.checked) {   //enable
        document.getElementById("submit").disabled = false;
    } else {    //disable
        document.getElementById("submit").disabled = true;
    }
}


//validate form then submit
function validateForm(){
    //get all fields values 
    let nombre = document.getElementById("nombre");   
    let edad = document.getElementById("edad");
    let genero = document.getElementById("genero");
    let estado = document.getElementById("estado");
    let municipio = document.getElementById("municipio");
    let mail = document.getElementById("mail");
    let acept = document.getElementById("acepto").checked;

    let nombreRegExp = new RegExp(/^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\s]+$/);
    let mailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    //validate "nombre" is != null
    if(nombre.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta capturar el nombre',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                nombre.focus();
            }
        });
        return;
    }
    //validate "nombre" format
    if( !(nombreRegExp.test(nombre.value)) ) {
        Swal.fire({
            title: 'Error!',
            text: 'El formato del nombre es inválido',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                nombre.focus();
            }
        });
        return;
    }
    //validate "edad" is != null
    if(edad.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta capturar la edad',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                edad.focus();
            }
        });
        return;
    }
    //validate "genero" is != null
    if(genero.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta capturar el genero',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                genero.focus();
            }
        });
        return;
    }
    //validate "estado" is != null
    if(estado.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta elegir un estado',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                estado.focus();
            }
        });
        return;
    }
    //validate "municipio" is != null 
    if(municipio.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta elegir un municipio',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                municipio.focus();
            }
        });
        return;
    }
    //validate "mail" is != null
    if(mail.value === ""){
        Swal.fire({
            title: 'Error!',
            text: 'Hace falta capturar el correo',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                mail.focus();
            }
        });
        return;
    }
    if( !(mailRegExp.test(mail.value)) ) {
        Swal.fire({
            title: 'Error!',
            text: 'El formato del correo es inválido',
            icon: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => {
                mail.focus();
            }
        });
        return;
    }
    if( !acept ) {
        Swal.fire({
            title: 'Error!',
            text: 'Debes aceptar los términos y condiciones',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
        return;
    }


    //submit info
    //disable submit button
    document.getElementById("submit").disabled = true;
    //trow a LOADING alert from "sweetAlert.js"
    Swal.fire({
        text: 'Enviando...',
        imageUrl: 'img/loader.gif',
        imageHeight: 100,
        imageAlt: 'loader animation'
    });

    //else, post request from "Axios.js"
    axios.post('https://www.alasyraices.gob.mx/ayrApi/public/registro_vitaminase', {
        nombre: nombre.value,
        edad: edad.value,
        genero: genero.value,
        estado: estado.value,
        municipio: municipio.value,
        mail: mail.value
      })
      .then(function (response) {
        if( response.data.status === "error"){
            Swal.close()	
            //trow an alert from "sweetAlert.js"
            Swal.fire({
                title: 'Error!',
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            
            document.getElementById("submit").disabled = false;
            
        } else if( response.data.status === "ok" ) {
            Swal.close()	
            showSuccessMessage();
        }
        
        return;
      })
      .catch(function (error) {
        Swal.close()	
        //trow an alert from "sweetAlert.js"
        Swal.fire({
            title: 'Error!',
            text: 'El servidor no responde, inténtelo mas tarde',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        
        document.getElementById("submit").disabled = false;
        return;
    });
}



function showSuccessMessage() {
    //if is from cellphone, scroll to top to show message
    if( window.screen.width <= 576){
        window.scrollTo(0, 10);
    }

    //show message
    var block = document.getElementsByClassName("success_block")[0];
    block.style.display = "block";
}
function closeSuccessMessage() {
    //hide message
    var block = document.getElementsByClassName("success_block")[0];
    block.style.display = "none";
}