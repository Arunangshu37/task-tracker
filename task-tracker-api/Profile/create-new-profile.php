<?php
include_once("../config.php");
include_once("../DbConnection.php");
include_once("Profile.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $conn = new DbConnection($ENVIRONMENT);
    $profile = new Profile($conn->get_connection());
    $profile->firstName = $_POST["firstName"];
    $profile->lastName = $_POST["lastName"];
    $profile->email = $_POST["email"];
    $profile->password = $_POST["password"];
    $profile->image = $_FILE["image"];
    $profile->image = $_POST['token'];

    echo json_encode($profile->save_profile_info());
}else
{
    echo json_encode(array("responseCode"=>405, "message"=>"Method not allowed"));
}


?>