<?php
include_once("config.php");
include_once("Connection.php");
include_once('Calendar.php');
if($_SERVER["REQUEST_METHOD"] == "GET" && isset($_SESSION['profile']))
{
    $year = isset( $_GET["year"]) ?  $_GET["year"] : "-";
    $month = isset($_GET["month"]) ? $_GET["month"] : "-" ;
    $conn = new Connection($ENVIRONMENT);
    $calendar = new CalendarV2($month, $year, $conn->get_connection());
    $events = $calendar->get_events();
    echo json_encode(array("responseCode"=>200, "calendar"=>$calendar->get_calendar(), "events"=>$events, "message"=>"Calendar found"));

}
else
{
    echo json_encode(array("responseCode"=>0, "message"=>"Please login first in order to view the calendar"));
}

?>