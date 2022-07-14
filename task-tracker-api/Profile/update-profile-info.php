<?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Profile.php");
if($_SERVER['REQUEST_METHOD']=="PUT")
{
    if(isset($_SESSION['profile']))
    {
        $data = json_decode(file_get_contents("php://input"));
        $conn = new Connection($ENVIRONMENT);
        $profile = new Profile($conn->get_connection());
        $profile->id  = $_SESSION["profile"];
        $profile->firstName  = $data->firstName;
        $profile->lastName  = $data->lastName;
        $profile->email  = $data->email;
        $profile->token = $data->token;
        $profile->image = $data->image;
        if($profile->token == 1)
        {
            $profile->password = $data->password;
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