<?php
include_once("../config.php");
include_once("../DbConnection.php");
include_once("Marker.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new DbConnection($ENVIRONMENT);
    
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{
        $marker = new Marker($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $marker->id = $data->body->markerId;
        echo json_encode($marker->delete());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>