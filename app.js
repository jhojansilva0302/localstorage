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


    if (valido) {
    const usuario = { nombre, email, edad };

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    listaUsuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    limpiarFormulario();

    // refrescar si estaba abierto
    const resultado = document.getElementById("resultado");
    if (resultado.style.display === "block") {
        btnVer.click();
        btnVer.click();
    }

    // mostrar el alert DESPUÉS de refrescar la pantalla
    setTimeout(() => {
        alert("Datos guardados correctamente en LocalStorage.");
    }, 50);
}

});


// ==== VER/OCULTAR DATOS ==== (VERSIÓN DEL PROFESOR)
btnVer.addEventListener("click", () => {
  const resultado = document.getElementById("resultado");
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuariosGuardados.length === 0) {
    alert("No hay usuarios guardados.");
    resultado.style.display = "none";
    resultado.innerHTML = "";
    return;
  }

  if (resultado.style.display === "block") {
    resultado.style.display = "none";
    resultado.innerHTML = "";
    btnVer.textContent = "Ver Datos";
    return;
  }

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

  // OPCIÓN BORRAR INDIVIDUAL (VERSIÓN DEL PROFESOR)
  const botonesBorrar = document.querySelectorAll(".btn-borrar-individual");
  botonesBorrar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      usuariosGuardados.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

      // comportamiento EXACTO del profesor
      btnVer.click(); // oculta
      btnVer.click(); // muestra actualizado

      alert("Usuario eliminado.");
    });
  });
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

    if (todoVacio) {
        alert("No hay nada que limpiar.");
        return;
    }

    limpiarFormulario();
    errores.forEach((e) => (e.textContent = ""));
    alert("Formulario limpiado.");
});


// ====== BORRAR TODO ======
btnBorrar.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (!usuarios || usuarios.length === 0) {
        alert("No hay datos para borrar.");
        return;
    }

    localStorage.removeItem("usuarios");
    document.getElementById("resultado").style.display = "none";
    document.getElementById("resultado").innerHTML = "";

    btnVer.textContent = "Ver Datos";

    alert("Datos borrados del LocalStorage.");
});
