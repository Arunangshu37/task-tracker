<?php
include_once("../config.php");
include_once("../DbConnection.php");
include_once("Profile.php");
if($_SERVER['REQUEST_METHOD']=="POST")
{
    if(isset($_SESSION['profile']))
    {
        $conn = new DbConnection($ENVIRONMENT);
        $profile = new Profile($conn->get_connection());
        $profile->id  = $_SESSION["profile"];
        $profile->firstName  = $_POST['firstName'];
        $profile->lastName  =  $_POST['lastName'];
        $profile->email  = $_POST['email'];
        $profile->token =  $_POST['token'];
        $profile->image =  isset($_FILES['image']) ? $_FILES['image'] : null;
        if($profile->token == "1")
        {
            $profile->password = $_POST['password'];
        } 
        echo json_encode($profile->update_profile_info());
        
    }
    else{
        echo json_encode(array("responseCode"=>405,  "message"=>"Method not allowed" ));
    }

}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>