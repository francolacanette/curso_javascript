const personas = [];

function saveToLocalStorage() {
    localStorage.setItem('personas', JSON.stringify(personas));
}

function loadFromLocalStorage() {
    const storedPersonas = localStorage.getItem('personas');
    if (storedPersonas) {
        return JSON.parse(storedPersonas);
    }
    return [];
}

personas.push(...loadFromLocalStorage());

function calcularEdadPersona() {
    const nombre = document.getElementById("nombre").value;
    const fechaNacimientoInput = document.getElementById("fechaNacimiento").value;
    const calcularResultados = document.getElementById("calcularResultados");


    if (nombre === "") {
      calcularResultados.textContent = "Debe ingresar un nombre.";
        return;
    }

    if (fechaNacimientoInput === "") {
      calcularResultados.textContent = "Debe ingresar una fecha de nacimiento.";
        return;
    }

    const fechaNacimiento = new Date(fechaNacimientoInput);
    const edad = calcularEdad(fechaNacimiento);

    let mensaje = `Hola ${nombre}, usted tiene ${edad} años.`;
    if (edad >= 18) {
        mensaje += " Es mayor de edad.";
    } else {
        mensaje += " Es menor de edad.";
    }

    calcularResultados.textContent = mensaje;

    personas.push({ nombre, fechaNacimiento: fechaNacimientoInput, edad });
    saveToLocalStorage();
    displayPersonas();

    document.getElementById("nombre").value = "";
    document.getElementById("fechaNacimiento").value = "";
}

function calcularEdad(fechaNacimiento) {
  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  const diaActual = fechaActual.getDate();

  const anioNacimiento = fechaNacimiento.getFullYear();
  const mesNacimiento = fechaNacimiento.getMonth() + 1;
  const diaNacimiento = fechaNacimiento.getDate();

  let edad = anioActual - anioNacimiento;

  if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
    edad--;
  }

  return edad;
}

function buscarPersonaPorNombre(nombre) {
    return personas.find(persona => persona.nombre === nombre);
}

function buscarPersona() {
    const nombreBuscado = document.getElementById("nombreBusqueda").value;
    const buscarResultados = document.getElementById("buscarResultados");

    if (nombreBuscado === "") {
      buscarResultados.textContent = "Debe ingresar un nombre.";
        return;
    }

    const personaEncontrada = buscarPersonaPorNombre(nombreBuscado);

    if (personaEncontrada) {
      buscarResultados.textContent = `Persona encontrada: ${personaEncontrada.nombre}, Fecha de nacimiento: ${personaEncontrada.fechaNacimiento}, Edad: ${personaEncontrada.edad} años.`;
    } else {
      buscarResultados.textContent = "No se encontró ninguna persona con ese nombre.";
    }

    document.getElementById("nombreBusqueda").value = "";
}

function displayPersonas() {
    const personasList = document.getElementById("personasList");
    personasList.innerHTML = "";

    for (const persona of personas) {
        const listItem = document.createElement("li");
        listItem.textContent = `Nombre: ${persona.nombre}, Fecha de nacimiento: ${persona.fechaNacimiento}, Edad: ${persona.edad} años`;
        personasList.appendChild(listItem);
    }
}

document.getElementById("calcularEdadBtn").addEventListener("click", calcularEdadPersona);
document.getElementById("buscarPersonaBtn").addEventListener("click", buscarPersona);

displayPersonas();
