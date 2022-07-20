<?php
include_once("config.php");
include_once("DbConnection.php");
include_once("CalendarV2.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new DbConnection($ENVIRONMENT);
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{
        $calendar = new CalendarV2(null, null, $conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        echo json_encode($calendar->remove_marker_from_date($data->body->instanceId));
    }
}
else
{
    echo json_encode(array("response"=>405, "message"=> "Method not allowed"));
}
?>