// CÓDIGO JAVASCRIPT MODIFICADO Y COMPLETO (simulando ejemplo1.js)

// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidarForm"); // Referencia al nuevo botón

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});



const newTextInput = function (tipoElemento) {
    // Creando elementos
    let addElemento = tipoElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    // Creando atributos para el nuevo elemento
    const idControl = nombreElemento.value;
    const titleControl = tituloElemento.value;
    
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", tipoElemento);

    // Ajuste de clases basado en el tipo (Bootstrap form-control para la mayoría)
    if (tipoElemento === 'color') {
        // Clase específica para input[type="color"] de Bootstrap
        addElemento.setAttribute("class", "form-control form-control-color w-100");
        addElemento.setAttribute("style", "height: 48px;"); // Altura para que se vea bien
    } else {
        addElemento.setAttribute("class", "form-control");
        addElemento.setAttribute("placeholder", titleControl);
    }
    
    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);
    
    // Creando Icono y texto para label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");
    labelElemento.textContent = titleControl;
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.setAttribute("class", "badge bg-secondary mb-1");
    labelId.textContent = `ID: ${idControl}`;

    // Creando plantilla de bootstrap
    let divElemento = document.createElement("div");
    // Usamos form-floating solo si no es 'color' ni 'textarea' (por simplicidad de ejemplo)
    if (tipoElemento !== 'color' && tipoElemento !== 'textarea') {
         divElemento.setAttribute("class", "form-floating mb-3");
         divElemento.appendChild(addElemento); // input
         divElemento.appendChild(labelElemento); // label
    } else {
         // Diseño simple para color/textarea (sin form-floating)
         divElemento.setAttribute("class", "mb-3");
         divElemento.appendChild(labelElemento); // label primero
         divElemento.appendChild(addElemento); // input/textarea
    }
   
    // Adjuntar al formulario
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
};



const newSelect = function () {
    // Creando elementos
    let addElemento = document.createElement("select");

    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", nombreElemento.value);
    addElemento.setAttribute("class", "form-select");

    // Creando option para el select
    for (let i = 1; i <= 3; i++) { // Reducido a 3 opciones para brevedad
        let addOption = document.createElement("option");
        addOption.value = `Op${i}`;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", nombreElemento.value);
    // Creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.setAttribute("class", "badge bg-secondary mb-1");
    labelId.textContent = `ID: ${nombreElemento.value}`;

    // Creando plantilla de bootstrap
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo Formulario
    newForm.appendChild(labelId);

    // Creando el Div que será hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (tipoElemento) {
    // Creando elementos
    let addElemento = document.createElement("input");
    
    // Creando atributos para el nuevo elemento
    const idControl = nombreElemento.value;
    const titleControl = tituloElemento.value;
    
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", tipoElemento);
    // Es crucial para radio/checkbox que compartan un 'name'
    if (tipoElemento === 'radio') {
        // En un ejemplo real, esto debe ser dinámico si hay varios grupos de radio
        addElemento.setAttribute("name", `grupo_${idControl}`); 
        addElemento.setAttribute("value", `valor_${idControl}`);
    } else {
        addElemento.setAttribute("name", idControl);
    }
    
    addElemento.setAttribute("class", "form-check-input");
    
    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", idControl);
    // Creando texto para label
    labelElemento.textContent = titleControl;
    
    // Creando label de Id
    let labelId = document.createElement("span");
    labelId.setAttribute("class", "badge bg-secondary mb-1");
    labelId.textContent = `ID: ${idControl}`;
    
    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-check mb-3");
    
    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);
    
    // Creando el SPAN que será hijo del nuevo Formulario
    newForm.appendChild(labelId);
    
    // Creando el Div que será hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};



buttonAddElemento.onclick = () => {
    const idDeseado = nombreElemento.value;

    if (idDeseado != "" && tituloElemento.value != "") {
        
        // --- VALIDACIÓN DE ID DUPLICADO ---
        if (document.getElementById(idDeseado)) {
             alert(`❌ ERROR: El ID "${idDeseado}" ya existe en el documento. Por favor, use un ID único.`);
             nombreElemento.focus();
             return; // Detiene la ejecución si el ID es duplicado
        }
        // ----------------------------------

        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            // Esto incluye 'text', 'number', 'date', 'password', 'color', 'email', 'textarea'
            newTextInput(elemento);
        }
        
        // Cerrar el modal, se asume que data-bs-dismiss lo hace.
        // Además, limpiamos los campos para la próxima vez que se abra el modal
        tituloElemento.value = "";
        nombreElemento.value = ""; 
    } else {
        alert("Faltan campos por completar");
    }
};



function validarFormulario() {
    const elementos = newForm.elements;
    let camposVacios = [];

    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];
        const esControlValido = elemento.tagName === 'INPUT' || 
                                elemento.tagName === 'SELECT' || 
                                elemento.tagName === 'TEXTAREA';
                                
        // 1. Omitir el botón de validación.
        if (elemento.id === 'idBtnValidarForm' || !esControlValido) {
            continue;
        }

        const tipo = elemento.type;
        const id = elemento.id || elemento.name || `Elemento sin ID`;
        
        let valorVacio = false;

        // 2. Comprobar tipos de campo según la regla: campos llenos/opciones seleccionadas.
        if (tipo === 'radio' || tipo === 'checkbox') {
            // Para radio y checkbox, debemos buscar si AL MENOS UNO está marcado
            const nombreGrupo = elemento.name;
            if (nombreGrupo && !document.querySelector(`input[name="${nombreGrupo}"]:checked`)) {
                // Solo registramos el grupo una vez
                if (!camposVacios.includes(`Grupo: ${nombreGrupo}`)) {
                   camposVacios.push(`Grupo: ${nombreGrupo} (No marcado)`);
                }
            }
        } 
        else if (elemento.tagName === 'SELECT') {
            // Comprobar que no esté seleccionada la primera opción (asumiendo valor vacío o placeholder)
            if (elemento.value === "" || elemento.selectedIndex === -1) {
                camposVacios.push(`Select: ${id} (No seleccionado)`);
            }
        } 
        else if (tipo !== 'button') {
            // Comprobar campos de texto, número, fecha, color, email, password, textarea
            if (elemento.value.trim() === "") {
                camposVacios.push(`Campo: ${id} (Vacío)`);
            }
        }
    }

    if (camposVacios.length === 0) {
        alert("✅ ¡Validación exitosa! Todos los campos requeridos están llenos.");
    } else {
        alert("⚠️ Validación fallida. Faltan por llenar/seleccionar los siguientes controles:\n\n" + camposVacios.join("\n"));
    }
}



// Evento para mostrar el modal de creación
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

// Evento para disparar la función de validación
buttonValidar.onclick = () => {
    validarFormulario();
};

// Evento para limpiar campos al mostrar el modal (existente)
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    nombreElemento.focus();
});