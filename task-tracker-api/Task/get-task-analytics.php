<?php
include_once("../config.php");
include_once("../DbConnection.php");
include_once("Task.php");
if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $conn = new DbConnection($ENVIRONMENT);

    if(!isset($_SESSION["username"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page  "));
    }
    else
    {
        $task = new Task($conn->get_connection());
        echo json_encode($task->get_task_analytics());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}

?>