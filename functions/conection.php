<?php
function connect(){
  // $host_db = "localhost";
  // $user_db = "root";
  // $pass_db = "";
  // $db_name = "estela";

  $host_db = "localhost";
  $user_db = "nodosmxc_estela";
  $pass_db = "Estela.2021+";
  $db_name = "nodosmxc_estela";


  $con= new mysqli($host_db, $user_db, $pass_db, $db_name); 
  if ($con->connect_errno) {
          printf("Connect failed: %s\n", $mysqli->connect_error);
          exit();
  } else {
      return $con;
  }
}