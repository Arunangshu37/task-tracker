<?php
include_once("config.php");
include_once("DbConnection.php");
include_once('CalendarV2.php');
if($_SERVER["REQUEST_METHOD"] == "GET" && isset($_SESSION['profile']))
{
    $year = isset( $_GET["year"]) ?  $_GET["year"] : "-";
    $month = isset($_GET["month"]) ? $_GET["month"] : "-" ;
    $conn = new DbConnection($ENVIRONMENT);
    $calendar = new CalendarV2($month, $year, $conn->get_connection(), $_SESSION['profile']);
    echo json_encode(array("responseCode"=>200, "calendar"=>$calendar->get_calendar(), "markedDays"=>$calendar->get_marked_dates_of_month_and_year(),  "message"=>"Calendar found"));

}
else
{
    echo json_encode(array("responseCode"=>0, "message"=>"Please login first in order to view the calendar"));
}

?>