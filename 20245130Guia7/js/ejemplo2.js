// OBTENCIÓN DE REFERENCIAS GLOBALES

// Referencia al formulario y al botón de registro (usando el atributo name)
const formulario = document.forms["frmRegistro"];
const buttonRegistro = formulario.elements["btnRegistro"];

// Referencia a los elementos específicos del formulario
const inputNombre = document.getElementById("idNombre");
const inputApellidos = document.getElementById("idApellidos");
const inputFechaNac = document.getElementById("idFechaNac");
const inputCorreo = document.getElementById("idCorreo");
const inputPassword = document.getElementById("idPassword");
const inputPasswordRepetir = document.getElementById("idPasswordRepetir");
const selectPais = document.getElementById("idCmPais");

// Componentes del Modal
const modalElement = document.getElementById("idModal");
const modal = new bootstrap.Modal(modalElement, {});
const bodyModal = document.getElementById("idBodyModal");
const modalTitle = document.getElementById("modalLabel");

// EXPRESIÓN REGULAR para validar correo electrónico (criterio c)
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;




/**
 * Crea una celda de tabla (<th> o <td>) con un valor dado.
 * @param {string} tag - 'th' o 'td'.
 * @param {string} content - El contenido de la celda.
 * @returns {HTMLElement} La celda creada.
 */
function crearCelda(tag, content, styleClass = '') {
    const cell = document.createElement(tag);
    cell.textContent = content;
    if (styleClass) {
        cell.setAttribute('class', styleClass);
    }
    return cell;
}

/**
 * Crea una fila de tabla (<tr>) con una cabecera y un valor.
 * @param {string} label - Texto de la columna izquierda (header).
 * @param {string} value - Texto de la columna derecha (data).
 * @returns {HTMLElement} La fila creada.
 */
function crearFila(label, value) {
    const row = document.createElement('tr');
    row.appendChild(crearCelda('th', label, 'w-50 text-start'));
    row.appendChild(crearCelda('td', value, 'w-50 text-end fw-bold'));
    return row;
}

/**
 * Crea y muestra la tabla de datos en el modal.
 * @param {Object} datos - Objeto con la información capturada.
 */
function crearTablaDatos(datos) {
    // 1. Crear el contenedor de la tabla (<table>)
    const table = document.createElement('table');
    table.setAttribute('class', 'table table-striped table-bordered');

    // 2. Crear el cuerpo de la tabla (<tbody>)
    const tbody = document.createElement('tbody');

    // 3. Añadir filas con la información capturada
    tbody.appendChild(crearFila('Nombres', datos.nombre));
    tbody.appendChild(crearFila('Apellidos', datos.apellidos));
    tbody.appendChild(crearFila('Fecha de Nacimiento', datos.fechaNac));
    tbody.appendChild(crearFila('Correo Electrónico', datos.correo));
    tbody.appendChild(crearFila('Intereses', datos.intereses));
    tbody.appendChild(crearFila('Carrera', datos.carrera));
    tbody.appendChild(crearFila('País de Origen', datos.pais));
    
    // 4. Adjuntar tbody a la tabla y la tabla al cuerpo del modal
    table.appendChild(tbody);
    bodyModal.innerHTML = ''; // Limpiar contenido previo (permitido para contenedores)
    bodyModal.appendChild(table);
}




function validarRegistro() {
    let errores = [];
    
    // a. Valide que los campos no estén vacíos.
    if (inputNombre.value.trim() === "") errores.push("El campo 'Nombres' no puede estar vacío.");
    if (inputApellidos.value.trim() === "") errores.push("El campo 'Apellidos' no puede estar vacío.");
    if (inputFechaNac.value === "") errores.push("El campo 'Fecha de nacimiento' no puede estar vacío.");
    if (inputCorreo.value.trim() === "") errores.push("El campo 'Correo electrónico' no puede estar vacío.");
    if (inputPassword.value === "") errores.push("El campo 'Contraseña' no puede estar vacío.");
    if (inputPasswordRepetir.value === "") errores.push("El campo 'Repetir Contraseña' no puede estar vacío.");

    // b. Valide que la fecha de nacimiento no supere la fecha actual.
    const fechaActual = new Date();
    const fechaNacimiento = new Date(inputFechaNac.value);
    // Comparar las fechas. Si fechaNacimiento es posterior a fechaActual, es un error.
    if (inputFechaNac.value && fechaNacimiento > fechaActual) {
        errores.push("La 'Fecha de nacimiento' no puede ser posterior a la fecha actual.");
    }
    
    // c. Utilice expresiones regulares para validar el campo correo electrónico.
    if (inputCorreo.value.trim() !== "" && !regexEmail.test(inputCorreo.value)) {
        errores.push("El 'Correo electrónico' no tiene un formato válido (Ej: usuario@dominio.com).");
    }

    // d. Valide que los campos contraseña y repetir contraseña, sean iguales.
    if (inputPassword.value !== "" && inputPasswordRepetir.value !== "" && inputPassword.value !== inputPasswordRepetir.value) {
        errores.push("Las contraseñas no coinciden.");
    }

    // e. Verifique que debe estar seleccionada al menos una opción para "algunos intereses".
    const checkboxesIntereses = formulario.querySelectorAll('input[type="checkbox"]');
    let interesSeleccionado = false;
    let interesesElegidos = [];
    
    checkboxesIntereses.forEach(checkbox => {
        if (checkbox.checked) {
            interesSeleccionado = true;
            // Capturar el texto del label asociado
            const label = formulario.querySelector(`label[for="${checkbox.id}"]`);
            if (label) interesesElegidos.push(label.textContent);
        }
    });
    if (!interesSeleccionado) {
        errores.push("Debe seleccionar al menos un 'Interés'.");
    }

    // f. Verifique que el usuario seleccione una carrera.
    const radioCarreras = formulario.elements["idRdCarrera"]; // Accede al grupo por su 'name'
    let carreraSeleccionada = false;
    let carreraElegida = "No seleccionada";

    // Nota: radioCarreras puede ser una NodeList o el elemento directamente si solo hay uno.
    if (radioCarreras) {
        // En los navegadores modernos, form.elements['name'] devuelve un RadioNodeList
        for (let i = 0; i < radioCarreras.length; i++) {
            if (radioCarreras[i].checked) {
                carreraSeleccionada = true;
                // Capturar el texto del label asociado
                const label = formulario.querySelector(`label[for="${radioCarreras[i].id}"]`);
                if (label) carreraElegida = label.textContent;
                break;
            }
        }
    }
    if (!carreraSeleccionada) {
        errores.push("Debe seleccionar una 'Carrera'.");
    }

    // g. Verifique que sea seleccionado un país de origen.
    if (selectPais.selectedIndex === 0) { // Asume que la primera opción es el placeholder ("Seleccione una opcion")
        errores.push("Debe seleccionar un 'País de origen'.");
    }
    const paisElegido = selectPais.options[selectPais.selectedIndex].text;
    
    
    if (errores.length > 0) {
        // Mostrar errores
        alert("⚠️ Por favor, corrija los siguientes errores:\n\n" + errores.join("\n"));
        return; // Detiene la ejecución si hay errores
    }

    // Si la validación es exitosa:
    
    // 1. Recopilar la información final
    const datosCapturados = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        fechaNac: inputFechaNac.value,
        correo: inputCorreo.value,
        intereses: interesesElegidos.join(', '),
        carrera: carreraElegida,
        pais: paisElegido
        // No incluimos contraseñas por seguridad
    };
    
    // 2. Crear y mostrar la tabla de datos en el modal
    modalTitle.textContent = "✅ Registro Exitoso y Datos Capturados";
    crearTablaDatos(datosCapturados);
    
    // 3. Mostrar el modal
    modal.show();
}



// Asociar la función de validación al botón 'Enviar registro'
buttonRegistro.onclick = () => {
    validarRegistro();
};