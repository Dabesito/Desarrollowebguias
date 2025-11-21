/**
 * Archivo: validarEstudiante.js
 * Función para validar la ficha de un estudiante usando Expresiones Regulares.
 * Se asume que los 'datos' son un objeto con las propiedades:
 * carnet, nombreCompleto, dui, nit, fechaNacimiento, email, edad.
 */

function validarFichaEstudiante(datos) {
    // Definición de todas las Expresiones Regulares
    const regexCarnet = /^[A-Z]{2}\d{3}$/;
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexDui = /^\d{8}-\d$/;
    const regexNit = /^\d{4}-\d{6}-\d{3}-\d$/;
    // La diagonal '/' debe ser escapada con '\/'
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/; 
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexEdad = /^\d{1,3}$/;

    let errores = [];

    // --- Validación de Carnet (AB001) ---
    if (!regexCarnet.test(datos.carnet)) {
        errores.push("❌ Carnet: Formato incorrecto. Debe ser 2 letras mayúsculas seguidas de 3 números (Ej. AB001).");
    }

    // --- Validación de Nombre Completo ---
    if (!regexNombre.test(datos.nombreCompleto)) {
        errores.push("❌ Nombre: Solo se permiten letras, espacios y caracteres acentuados.");
    }

    // --- Validación de DUI (########-#) ---
    if (!regexDui.test(datos.dui)) {
        errores.push("❌ DUI: Formato incorrecto. Debe ser 8 dígitos, guion y 1 dígito (Ej. 12345678-9).");
    }

    // --- Validación de NIT (####-######-###-#) ---
    if (!regexNit.test(datos.nit)) {
        errores.push("❌ NIT: Formato incorrecto. Debe ser ####-######-###-#.");
    }

    // --- Validación de Fecha de Nacimiento (DD/MM/AAAA) ---
    if (!regexFecha.test(datos.fechaNacimiento)) {
        errores.push("❌ Fecha de Nacimiento: Formato incorrecto. Debe ser DD/MM/AAAA.");
    }

    // --- Validación de Correo Electrónico ---
    if (!regexEmail.test(datos.email)) {
        errores.push("❌ Correo Electrónico: Formato no válido.");
    }

    // --- Validación de Edad (solo números) ---
    if (!regexEdad.test(datos.edad)) {
        errores.push("❌ Edad: Solo se permiten números (1 a 3 dígitos).");
    } else {
        // Validación adicional de rango para la edad (opcional)
        const edadNum = parseInt(datos.edad);
        if (edadNum < 5 || edadNum > 100) {
            errores.push("❌ Edad: La edad debe estar entre 5 y 100 años.");
        }
    }

    // --- Mostrar Resultado ---
    if (errores.length > 0) {
        alert("🚨 Errores de Validación:\n\n" + errores.join("\n"));
        return false;
    } else {
        alert("✅ ¡Todos los datos del estudiante son válidos!");
        return true;
    }
}



