<?php

include_once("../config.php");
include_once("../Connection.php");
include_once("Profile.php");

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    $profile =new Profile($conn->get_connection());
    $data = json_decode(file_get_contents("php://input"));
    $profile->email = $data->email;
    $profile->password = $data->password;
    echo json_encode($profile->sign_in_with_email_and_password());
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>