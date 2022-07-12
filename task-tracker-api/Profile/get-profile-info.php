<?php
include_once("../config.php");

    if($_SERVER["REQUEST_METHOD"]=="GET")
    {
        $profileInfo =array();
        if(isset($_SESSION["profile"]))
        {
            $profileInfo = array("profileId"=>$_SESSION["profile"], "username"=>$_SESSION["username"]);
            $data = array("responseCode"=>200, "proileInfo"=> $profileInfo, "message"=>"Profile Found!" );
        }
        else{
            $profileInfo = array("profileId"=>0, "username"=>"");
            $data = array("responseCode"=>404,  "prodileInfo"=> $profileInfo, "message"=>"No profile is present in the session. Please log in ");
        }
        echo json_encode($data);
    }
    else
    {
        echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
    }

?>