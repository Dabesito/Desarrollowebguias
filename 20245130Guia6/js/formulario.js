//Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnGuardar");
const buttonLimpiarForm = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

// Componente de Bootstrap para la notificación
const notificacion = document.getElementById("liveToast");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
}

/*
Funcion para validar el ingreso del paciente
*/
const addPaciente = function () {
    const nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        //Agregando informacion al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        //llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //llamando al componente de Bootstrap
        toast.show();
    }
}

// Contador global de la opcion correspondiente
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "País agregado correctamente";
        //llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //llamando al componente de Bootstrap
        toast.show();
    }
}

// FUNCIONES PARA EDITAR Y ELIMINAR ---------------------------------

/**
 * Función para manejar la edición de un paciente.
 * @param {number} indice - El índice (base 0) del paciente en arrayPaciente.
 */
function editarPaciente(indice) {
    // Aquí iría la lógica completa de edición.
    // Por ahora, solo notificamos y precargamos el nombre en el formulario.
    const paciente = arrayPaciente[indice];
    alert(`EDITAR: Quiere editar el paciente #${indice + 1}: ${paciente[0]} ${paciente[1]}`);

    // Ejemplo: precargar datos para una futura edición
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputNombre.focus();
    
    // NOTA: Para completar la edición, necesitarías un botón "Actualizar" que reemplace
    // los datos en arrayPaciente[indice] en lugar de agregar uno nuevo.
}

/**
 * Función para eliminar un paciente del arreglo.
 * @param {number} indice - El índice (base 0) del paciente en arrayPaciente.
 */
function eliminarPaciente(indice) {
    const paciente = arrayPaciente[indice];
    if (confirm(`¿Está seguro de que desea eliminar a ${paciente[0]} ${paciente[1]}?`)) {
        // Eliminar 1 elemento a partir del índice dado
        arrayPaciente.splice(indice, 1);

        // Volver a imprimir la tabla actualizada
        imprimirPacientes();

        // Mostrar notificación de éxito
        mensaje.innerHTML = "Paciente eliminado correctamente.";
        toast.show();
    }
}

// FUNCIONES DE IMPRESIÓN DE TABLA ----------------------------------

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    // Usamos forEach con el segundo argumento 'i' para obtener el índice real (base 0)
    arrayPaciente.forEach((element, i) => {
        $fila += `<tr>`;
        $fila += `<td scope="row" class="text-center fw-bold">${contador}</td>`;
        $fila += `<td>${element[0]}</td>`; // Nombre
        $fila += `<td>${element[1]}</td>`; // Apellido
        $fila += `<td>${element[2]}</td>`; // Fecha nacimiento
        $fila += `<td>${element[3]}</td>`; // Sexo
        $fila += `<td>${element[4]}</td>`; // País
        $fila += `<td>${element[5]}</td>`; // Dirección
        $fila += `
                <td>
                    <button onclick="editarPaciente(${i})" type="button" class="btn btn-primary btn-sm" alt="Editar">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button onclick="eliminarPaciente(${i})" type="button" class="btn btn-danger btn-sm" alt="Eliminar">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $tabla = `
        <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%;">#</th>
                <th scope="col" class="text-center" style="width:15%;">Nombre</th>
                <th scope="col" class="text-center" style="width:15%;">Apellido</th>
                <th scope="col" class="text-center" style="width:10%;">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%;">Sexo</th>
                <th scope="col" class="text-center" style="width:10%;">País</th>
                <th scope="col" class="text-center" style="width:25%;">Dirección</th>
                <th scope="col" class="text-center" style="width:10%;">Opciones</th>
            </tr>
        ${imprimirFilas()}
        </table>
        </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $tabla;
}

// MANEJO DE EVENTOS ------------------------------------------------

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarForm.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();

