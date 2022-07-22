<?php
include_once("../config.php");
include_once("../DbConnection.php");
include_once("Profile.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $conn = new DbConnection($ENVIRONMENT);
    $profile = new Profile($conn->get_connection());
    $profile->id  = $_POST['profileId'];
    $profile->firstName  = $_POST['firstName'];
    $profile->lastName  =  $_POST['lastName'];
    $profile->email  = $_POST['email'];
    $profile->token =  $_POST['token'];
    $profile->image =  isset($_FILES['image']) ? $_FILES['image'] : null;
    $profile->password = $_POST['password'];
    echo json_encode($profile->save_profile_info());
    

}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>