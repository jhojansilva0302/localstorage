// ====== REFERENCIAS A LOS BOTONES ======
const btnGuardar = document.getElementById("btnGuardar");
const btnVer = document.getElementById("btnVerDatos");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnBorrar = document.getElementById("btnBorrarDatos");


    //=========LIMPIAR=============
    function limpiarFormulario(){
        document.getElementById("nombre").value="";
        document.getElementById("email").value="";
        document.getElementById("edad").value="";
    }

// ==== GUARDAR DATOS ====
btnGuardar.addEventListener("click", () => {


    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    let valido = true;

    // Validaciones
    if (nombre === "") {
        document.getElementById("errorNombre").textContent = "El nombre es obligatorio.";
        valido = false;
    }

    if (email === "") {
        document.getElementById("errorEmail").textContent = "El email es obligatorio.";
        valido = false;
    }

    if (edad === "") {
        document.getElementById("errorEdad").textContent = "La edad es obligatoria.";
        valido = false;
    }


    //====GUARDAR DATOS=====
    if (valido) {
        const usuario = { nombre, email, edad };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert(" Datos guardados correctamente en LocalStorage.");
        limpiarFormulario();
    }
});


// ====== VER DATOS ======
btnVer.addEventListener("click", () => {
    const resultado = document.getElementById("resultado");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
        const datos = JSON.parse(usuarioGuardado);
        resultado.innerHTML = `
        <h3>Datos Guardados:</h3>
        <p>>strong>Nombre:<strong> ${datos.nombre}
        <p>>strong>Email:<strong> ${datos.email}
        <p>>strong>Edad:<strong> ${datos.edad}
        `;
    } else{
        resultado.innerHTML = "<p>No hay datos guardados.</p>";
    } 
});

//======LIMPIAR FORMULARIO
btnLimpiar.addEventListener("click", () => {
    limpiarFormulario();
    document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
    alert("Formulario limpiado.")
});
 



// ====== BORRAR DATOS ======
btnBorrar.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    document.getElementById("resultado").innerHTML = "<p> Datos eliminados.</p>";
    alert("Datos borrados del LocalStorage.");
});
