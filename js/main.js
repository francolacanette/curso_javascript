const personas = [];

function calcularEdadPersona() {
  let nombre = "";
  let fechaNacimientoInput = "";

  while (nombre === "") {
    nombre = prompt("Ingrese su nombre:");
    if (nombre === null || nombre === "") {
      alert("Debe ingresar un nombre.");
      return;
    }
  }

  while (fechaNacimientoInput === "") {
    fechaNacimientoInput = prompt("Ingrese su fecha de nacimiento (YYYY-MM-DD):");
    if (fechaNacimientoInput === null || fechaNacimientoInput === "") {
      alert("Debe ingresar una fecha de nacimiento.");
      return;
    }
  }

  const fechaNacimiento = new Date(fechaNacimientoInput);
  const edad = calcularEdad(fechaNacimiento);

  let mensaje = `Hola ${nombre}, usted tiene ${edad} años.`;
  if (edad >= 18) {
    mensaje += " Es mayor de edad.";
  } else {
    mensaje += " Es menor de edad.";
  }

  document.getElementById("resultado").innerText = mensaje;

  personas.push({ nombre, fechaNacimiento: fechaNacimientoInput, edad });
}

function simularCalculo() {
  const resultados = [];

  while (true) {
    const nombre = prompt("Ingrese un nombre (o deje en blanco para finalizar):");
    if (nombre === null || nombre === "") {
      break;
    }

    let fechaNacimientoInput = "";
    while (fechaNacimientoInput === "") {
      fechaNacimientoInput = prompt(`Ingrese la fecha de nacimiento de ${nombre} (YYYY-MM-DD):`);
      if (fechaNacimientoInput === null || fechaNacimientoInput === "") {
        alert("Debe ingresar una fecha de nacimiento.");
        return;
      }
    }

    const fechaNacimiento = new Date(fechaNacimientoInput);
    const edad = calcularEdad(fechaNacimiento);
    resultados.push({ nombre, fechaNacimiento: fechaNacimientoInput, edad });
  }

  personas.push(...resultados);

  let mensaje = "Resultados de la simulación:\n";
  for (const resultado of resultados) {
    mensaje += `Nombre: ${resultado.nombre}, Fecha de nacimiento: ${resultado.fechaNacimiento}, Edad: ${resultado.edad} años\n`;
  }
  alert(mensaje);
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
  const nombreBuscado = prompt("Ingrese el nombre de la persona a buscar:");
  if (nombreBuscado === null || nombreBuscado === "") {
    alert("Debe ingresar un nombre.");
    return;
  }

  const personaEncontrada = buscarPersonaPorNombre(nombreBuscado);

  if (personaEncontrada) {
    const mensaje = `Persona encontrada: ${personaEncontrada.nombre}, Fecha de nacimiento: ${personaEncontrada.fechaNacimiento}, Edad: ${personaEncontrada.edad} años.`;
    alert(mensaje);
  } else {
    alert("No se encontró ninguna persona con ese nombre.");
  }
}
