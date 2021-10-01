<?php
// conexión
include_once 'conection.php';
$conexion = connect();

// sanitización de campos
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
$telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
$correo = filter_var($_POST['correo'], FILTER_SANITIZE_STRING);

// validacón de suscripción
if (isset($_POST["notificaciones"])) {
  $notificaciones = 1;
} else {
  $notificaciones = 0;
}

// número aleatorio
$number = rand(1, 100);

// buscamos el correo
$select = "SELECT `correo` FROM formulario_brochure WHERE correo = '$correo' AND band_eliminar = 1";
$resultado1 = mysqli_query($conexion, $select) or die ("ERROR:" . mysqli_error($conexion));
$num_rows = mysqli_num_rows($resultado1); 

// evaluamos que no exista el correo
if ($num_rows > 0) {
 echo 99;
}else{
  // inserción en la base de datos
  $insert = "INSERT INTO `formulario_brochure` (`nombre`, `telefono`, `correo`, `notificaciones`, `dolares`) VALUES ('$nombre', '$telefono', '$correo', '$notificaciones', '$number')";
  $resultado2 = mysqli_query($conexion, $insert) or die ("ERROR: " . mysqli_error($conexion));
  
  // respuesta
  if ($resultado2 == 1) {
    getDollars($number);
  }else{
    echo 0;
  }
}
  
// función para obtener datos del servicio
function getDollars($number){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://www.dataaccess.com/webservicesserver/numberconversion.wso/NumberToDollars?dNum='.$number.'');  
  curl_exec($ch);
  if (curl_errno($ch)) echo curl_error($ch);
  curl_close($ch);
}
?>