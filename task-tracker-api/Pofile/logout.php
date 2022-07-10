<?php
    if($_SERVER["REQUEST_METHOD"]=="GET")
    {
        if(isset($_SESSION["profile"]))
        {
            session_destroy();
           
        }
        $data = array("responseCode"=>200,  "message"=>"Session has been cleaned");
        echo json_encode($data);
    }
    else
    {
        echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
    }

?><?php
    if($_SERVER["REQUEST_METHOD"]=="GET")
    {
        if(isset($_SESSION["profile"]))
        {
            session_destroy();
           
        }
        $data = array("responseCode"=>200,  "message"=>"Session has been cleaned");
        echo json_encode($data);
    }
    else
    {
        echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
    }

?>