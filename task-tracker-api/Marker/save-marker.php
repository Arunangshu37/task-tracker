<?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Marker.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{
        $marker = new Marker($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $marker->name = $data->name;
        $marker->description = $data->description;
        $marker->ink = $data->ink;
        echo json_encode($marker->save());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>