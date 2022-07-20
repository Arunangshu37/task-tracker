<?php
include_once("config.php");
include_once("Profile/Profile.php");
include_once("Profile/mailer.php");
include_once("DbConnection.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    $conn = new DbConnection($ENVIRONMENT);
    if(isset($_SESSION['profile']))
    {
        $data = json_decode(file_get_contents("php://input"));
        
        $profile = new Profile($conn->get_connection());
        $profile->email =  $data->annonymousEmail;

        echo json_encode($profile->retrieve_old_password());

    }
    else
    {
        echo json_encode(array("responseCode"=>404, "message"=>"No profile present in the session"));
    }

}
else
{
    return json_encode(array("responseCode"=>405, "message"=>"Method not allowed."));
}

?>