<?php
session_start();
    if($_SERVER["REQUEST_METHOD"]=="GET")
    {
        if(isset($_SESSION["profile"]))
        {
            session_unset();
            session_destroy();
            $data = array("responseCode"=>200,  "message"=>"Logged out!");
        }
        else{
            $data = array("responseCode"=>404,  "message"=>"no session present!");
        }
        
        echo json_encode($data);
    }
    else
    {
        echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
    }

?>