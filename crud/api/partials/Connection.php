<?php

$host = "localhost";
$dbName = "todoApp";
$user = "progweb";
$password = "progweb";
$protocol = "mysql:host=localhost;dbname=todoApp";
try {
  // Generación de la Conexion a la base de datos
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}

?>