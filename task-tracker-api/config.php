<?php
    $ENVIRONMENT = "DEV";
    session_start();
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");
    $_SESSION['profile'] = 1;
    $_SESSION['username'] = "Arunangshu Biswas";
?>