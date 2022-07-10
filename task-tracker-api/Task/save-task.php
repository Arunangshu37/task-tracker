<?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Task.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{

        $task = new Task($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $task->title = $data->title;
        $task->description = $data->description;
        $task->status = $data->status;
        $task->profileId = $data->profileId;
        $task->priority = $data->priority;
        $task->createdOn = $data->createdOn;
        echo json_encode($task->save());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}
?><?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Task.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{

        $task = new Task($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $task->title = $data->title;
        $task->description = $data->description;
        $task->status = $data->status;
        $task->profileId = $data->profileId;
        $task->priority = $data->priority;
        $task->createdOn = $data->createdOn;
        echo json_encode($task->save());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}
?><?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Task.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{

        $task = new Task($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $task->title = $data->title;
        $task->description = $data->description;
        $task->status = $data->status;
        $task->profileId = $data->profileId;
        $task->priority = $data->priority;
        $task->createdOn = $data->createdOn;
        echo json_encode($task->save());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}
?><?php
include_once("../config.php");
include_once("../Connection.php");
include_once("Task.php");
if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $conn = new Connection($ENVIRONMENT);
    if(!isset($_SESSION["profile"]))
    {
        echo json_encode(array("responseCode"=>401, "message"=> "No user is logged in at present. Please login to access this page"));
    }
    else{

        $task = new Task($conn->get_connection());
        $data = json_decode(file_get_contents("php://input"));
        $task->title = $data->title;
        $task->description = $data->description;
        $task->status = $data->status;
        $task->profileId = $data->profileId;
        $task->priority = $data->priority;
        $task->createdOn = $data->createdOn;
        echo json_encode($task->save());
    }
}
else
{
    echo json_encode(array("responseCode"=>405, "message"=> "Method not allowed"));
}
?>