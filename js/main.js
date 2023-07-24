function calcularEdad() {
  const fechaNacimientoInput = document.getElementById("fechaNacimiento").value;
  const fechaNacimiento = new Date(fechaNacimientoInput);

  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  const diaActual = fechaActual.getDate();

  const anioNacimiento = fechaNacimiento.getFullYear();
  const mesNacimiento = fechaNacimiento.getMonth() + 1;
  const diaNacimiento = fechaNacimiento.getDate();

  if (anioNacimiento < 1900 || fechaNacimiento > fechaActual) {
    alert("Ingresa una fecha de nacimiento válida.");
    return;
  }

  let edad = anioActual - anioNacimiento;

  if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
    edad--;
  }

  let mensaje = `Usted tiene: ${edad} años.`;

  if (edad >= 18) {
    mensaje += " Es mayor de edad.";
  } else {
    mensaje += " Es menor de edad.";
  }

  document.getElementById("resultado").innerText = mensaje;
}
