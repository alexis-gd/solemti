<?php
function connect(){
  $host_db = "localhost";
  $user_db = "root";
  $pass_db = "";
  $db_name = "estela";

  $con= new mysqli($host_db, $user_db, $pass_db, $db_name); 
  if ($con->connect_errno) {
          printf("Connect failed: %s\n", $mysqli->connect_error);
          exit();
  } else {
      return $con;
  }
}