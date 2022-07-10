<?php
 error_reporting(0);
 
class Task{
    private $conn;
    public $id;
    public $title;
    public $description;
    public $status;
    public $profileId;
    public $createdOn;
    public $priority    ;

   
    public function __construct($conn)
    {
        $this->conn = $conn;
        $this->profileId = $_SESSION["profile"] || 1;
    }

    public function get_all_tasks()
    {
        try
        {
            $query = "SELECT `id`, `title`, `description`, `status`, `profileId`, `createdOn`, `priority` FROM `task` WHERE profileId = ? ";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $this->profileId);
            $stmt->execute();
            $result = $stmt->get_result();
            $task_array = array();
            if($result->num_rows>0)
            {
                while($row = $result->fetch_assoc())
                {
                    $task_array[] = $row;
                }
                return array("responseCode"=> 200, "message"=> "Result found", "data"=>$task_array);
            }
            else
            {
                return array("responseCode"=> 404, "message"=> "No result found", "data"=>$task_array);
            }

        }
        catch(Throwable $exception)
        {   
            return array("responseCode"=>500, "message"=>"An exception occured : ".$exception);
        }
    }

    public function get_task_analytics()
    {
        $customMessage ="";
        try
        {
            $queryStatusCount = "SELECT COUNT(id)  AS taskCount, `status`  FROM `task` WHERE `profileId` = ".$this->profileId." GROUP BY `status` ";
            $resultStatusCount = $this->conn->query($queryStatusCount);
            $statusAnalytics = array();
            if($resultStatusCount->num_rows>0)
            {
                while($row = $resultStatusCount->fetch_assoc())
                {
                    $statusAnalytics[] = $row;
                }
            }
            else
            {
                return array("responseCode"=> 404, "message"=> "No result found : ".$this->conn->real_escape_string($this->conn->error), "data"=>$task_array);
            }
        
            $queryPriorityCount = "SELECT COUNT('id') AS taskCount, `priority` FROM `task`  WHERE `profileId` = ".$this->profileId." GROUP BY `priority`";
            $resultPriorityCount = $this->conn->query($queryPriorityCount);
            $priorityAnalytics = array();
            if($resultPriorityCount->num_rows > 0)
            {
                while($row = $resultPriorityCount->fetch_Assoc())
                {
                    $priorityAnalytics[] = $row;
                }
            }
            else
            {
                return array("responseCode"=> 404, "message"=> "No result found", "data"=>$task_array);
            }
            return array("responseCode"=> 200, "message"=> "Result found", "statusAnalytics"=>$statusAnalytics, "priorityAnalytics"=> $priorityAnalytics);

        }
        catch(Throwable $exception)
        {   
            return array("responseCode"=>500, "message"=>"An exception occured : ".$exception);
        } 
    }

    public function save()
    {
        try
        {
            $query = "INSERT INTO `task` ( `title`, `description`, `status`, `profileId`, `createdOn`) VALUES(?,?,?,?,?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ssiis",$this->title, $this->description, $this->status, $this->profileId, $this->createdOn);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"Task created!");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing task creation. ".$exception);
        }
    }

    public function update()
    {
        try
        {
            $query = "UPDATE `task` SET  `title` = ? , `description` = ?, `status`= ?,  `createdOn`= ?,`priority` = ? WHERE `id` = ? AND `profileId`= ?  ";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ssiisii",$this->title, $this->description, $this->status, $this->createdOn,$this->priority, $this->id, $this->profileId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"Task updated successfully!");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing task creation. ".$exception);
        }
    }

    public function delete()
    {
        try
        {
            $query = "DELETE FROM  `task` WHERE `id` =  ? AND `profileId` = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ii",$this->id, $this->profileId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"Task deleted");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing task creation. ".$exception);
        }
    }

}
?>