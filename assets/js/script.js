// Inicializar el mapa
$(document).ready(function () {
  var map = L.map('map').setView([24.7998856, -107.4212474], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mapa'
  }).addTo(map);

  L.marker([24.7998856, -107.4212474]).addTo(map)
    .bindPopup(`Boulevard Pedro Infante 2570 <br> Desarrollo Urbano Tres rios <br> Culiacán, Sinaloa, MX CP 20020`)
    .openPopup();

  document.querySelector('input[name="telefono"]').addEventListener("keypress", soloNumeros, false);
});
// Validar formulario
$('#form_brochure').on('submit', function (e) {
  e.preventDefault();
  $('.btn-form').prop('disabled', true);
  // nombre
  if ($('input[name="nombre"]').val() == "") {
    return inputWarning($('input[name="nombre"]'), $('.btn-form'), $('#mensaje'), "El nombre no puede ir vacio.");
  }
  if ($('input[name="nombre"]').val().length > 50) {
    return inputWarning($('input[name="nombre"]'), $('.btn-form'), $('#mensaje'), "Nombre demasiado largo (Máx. 50 caracteres).");
  }
  // teléfono
  if ($('input[name="telefono"]').val() == "") {
    return inputWarning($('input[name="telefono"]'), $('.btn-form'), $('#mensaje'), "Escribe tu número de teléfono.");
  }
  if ($('input[name="telefono"]').val().length != 10) {
    return inputWarning($('input[name="telefono"]'), $('.btn-form'), $('#mensaje'), "Escribe un número válido (10 caracteres).");
  }
  if (isNaN($('input[name="telefono"]').val())) {
    return inputWarning($('input[name="telefono"]'), $('.btn-form'), $('#mensaje'), "Escribe solo números porfavor.");
  }
  // correo
  if ($('input[name="correo"]').val() == "") {
    return inputWarning($('input[name="correo"]'), $('.btn-form'), $('#mensaje'), "Escribe tu correo electrónico.");
  }
  if ($('input[name="correo"]').val().indexOf('@', 0) == -1 || $('input[name="correo"]').val().indexOf('.', 0) == -1) {
    return inputWarning($('input[name="correo"]'), $('.btn-form'), $('#mensaje'), "Escribe un correo válido.");
  }
  // llamada a la validación
  $.ajax({
    type: 'POST',
    url: 'functions/process_data.php',
    data: $(this).serialize()
  })
    .then(function (resp) {
      if (resp == 0) {
        $('#mensaje').addClass('error');
        $('#mensaje').html("Hubo un error al enviar tus datos");
        setTimeout(() => {
          $('#mensaje').removeClass('error');
          $('#mensaje').html("");
        }, 2500);
      } else if (resp == 99) {
        $('#mensaje').addClass('error');
        $('#mensaje').html("Intenta con un correo diferente");
        setTimeout(() => {
          $('#mensaje').removeClass('error');
          $('#mensaje').html("");
          $('.btn-form').prop('disabled', false);
        }, 2500);
      } else {
        $('#titulo').addClass('d-none');
        $('#titulo-registro').removeClass('d-none');
        $('#respuesta').html(resp);
        $('#form_brochure').addClass('d-none');
        $('#form_brochure').addClass('d-none');
        $('#mensaje').addClass('valid');
        $('#mensaje').html(resp);
        setTimeout(() => {
          $('#mensaje').removeClass('valid');
          $('#mensaje').html("");
        }, 2500);
      }
    })
    .fail(function () {
      $('#mensaje').addClass('error');
      $('#mensaje').html("Hubo un error al enviar tus datos");
      setTimeout(() => {
        $('#mensaje').removeClass('error');
        $('#mensaje').html("");
      }, 2500);
    })
});
// Solo permite introducir números.
function soloNumeros(e) {
  var key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
  }
}
// Marcar un input con error mostrar error y deshabilitar submit botón
function inputWarning(element1, element2, element3, mensaje) {
  element1.focus();
  element1.addClass("input-error");
  element2.prop('disabled', true);
  element3.html(mensaje);
  element3.addClass("error");
  setTimeout(() => {
    element1.removeClass("input-error");
    element2.prop('disabled', false);
    element3.html("");
    element3.removeClass("error");
  }, 2500);
}