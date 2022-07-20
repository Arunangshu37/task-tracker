<?php
include_once("config.php");
include_once("DbConnection.php");
include_once("CalendarV2.php");
if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $conn = new DbConnection($ENVIRONMENT);
    
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{
        $calendar = new CalendarV2(null, null,$conn->get_connection());
        $date = $_GET['date'];
        $calendar->date = $date;
        echo json_encode($calendar->get_marked_dates());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>