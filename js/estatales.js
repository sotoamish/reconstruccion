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


//validate form then submit
function validateForm(){
    //get all fields values 
    let estado = document.getElementById("estado");
    let acept = document.getElementById("acepto").checked;

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
        
        estado: estado.value,
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