// ====== REFERENCIAS A LOS BOTONES ======
const btnGuardar = document.getElementById("btnGuardar");
const btnVer = document.getElementById("btnVerDatos");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnBorrar = document.getElementById("btnBorrarDatos");


//=========LIMPIAR=============
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("edad").value = "";
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

        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        //agregar nuevo usuario

        listaUsuarios.push(usuario);

        //guardar de nuevo 

        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
        alert(" Datos guardados correctamente en LocalStorage.");
        limpiarFormulario();
    }
});


// ==== VER/OCULTAR DATOS GUARDADOS CON OPCIÓN DE BORRAR INDIVIDUAL ====
btnVer.addEventListener("click", () => {
  const resultado = document.getElementById("resultado");

  if (resultado.style.display !== "none" && resultado.innerHTML.trim() !== "") {
    resultado.style.display = "none";
    btnVer.textContent = "Ver Datos";
    return;
  }

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuariosGuardados.length > 0) {
    let html = "<h3>Usuarios Guardados:</h3>";

    usuariosGuardados.forEach((u, i) => {
      html += `
        <div class="usuario" data-index="${i}">
          <p><strong>Usuario #${i + 1}</strong></p>
          <p><strong>Nombre:</strong> ${u.nombre}</p>
          <p><strong>Email:</strong> ${u.email}</p>
          <p><strong>Edad:</strong> ${u.edad}</p>
          <button class="btn-borrar-individual" data-index="${i}">Borrar Usuario</button>
        </div>
        <hr>
      `;
    });

    resultado.innerHTML = html;
    resultado.style.display = "block";
    btnVer.textContent = "Ocultar Datos";

    // Agregar evento a cada botón de borrar individual
    const botonesBorrar = document.querySelectorAll(".btn-borrar-individual");
    botonesBorrar.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        usuariosGuardados.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
        btnVer.click(); // refresca la lista
        alert(" Usuario eliminado.");
      });
    });
  } else {
    resultado.innerHTML = "<p>No hay usuarios guardados.</p>";
    resultado.style.display = "block";
    btnVer.textContent = "Ocultar Datos";
  }
});
//======LIMPIAR FORMULARIO
btnLimpiar.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const edad = document.getElementById("edad").value;

    const errores = [...document.querySelectorAll(".error")];
    const hayErrores = errores.some((e) => e.textContent.trim() !== "");

    const todoVacio =
        nombre.trim() === "" &&
        email.trim() === "" &&
        edad.trim() === "" &&
        !hayErrores;

    //si no hahy nada que limpiar
    if (todoVacio) {
        alert(" No hay nada que limpiar.");
        return;
    }

    //si hay algo que limpiar
    limpiarFormulario();
    errores.forEach((e) => (e.textContent = ""));
    alert("Formulario limpiado.")
});




// ====== BORRAR DATOS ======
btnBorrar.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios || usuarios.length === 0) {
        alert(" No hay datos para borrar.")
        return;
    }

    localStorage.removeItem("usuarios");
    document.getElementById("resultado").innerHTML = "<p> Datos eliminados.</p>";
    alert("Datos borrados del LocalStorage.");
});
