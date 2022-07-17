<?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Profile.php");
    if($_SERVER["REQUEST_METHOD"]=="GET")
    {
        $profileInfo =array();
        if(isset($_SESSION["profile"]))
        {
            $conn = new Connection($ENVIRONMENT);
            $profile =new Profile($conn->get_connection());
            $profile->id = $_SESSION["profile"];
            echo json_encode($profile->get_current_profile_information());
        }
        else
        {
            $data = array("responseCode"=>404,  "prodileInfo"=> [], "message"=>"No profile is present in the session. Please log in ");
            echo json_encode($data);
        }
    }
    else
    {
        echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
    }

?>