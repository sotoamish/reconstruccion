document.addEventListener("DOMContentLoaded", function() {
    //get "estado" field 
    const field_estado = document.getElementById("estado");

    //add "estados" from estados_data.js to field_estado
    var toPrint = '<option value=""> -Elige tu estado- </option>';
    for (let i = 0; i < Object.keys(estados_data).length ; i++) {
        let key = Object.keys(estados_data)[i];
        toPrint += `
            <option value="${key}"> ${estados_data[key]} </option>
        `;
    }
    field_estado.innerHTML = toPrint;
});
