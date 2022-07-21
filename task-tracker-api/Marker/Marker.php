<?php
class Marker{
    private $conn;
    public $id = 0;
    public $profileId = 0;
    public $name = "";
    public $ink = "";
    public $description = "";

    public function __construct($conn, $profileId)
    {
        $this->conn = $conn;
        $this->$profileId = $profileId;
    }

    public function get_all_markers()
    {
        try
        {
            $query = "SELECT `id`, `name`, `description`, `ink` FROM `marker` WHERE `profileId`=?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $this->profileId);
            $stmt->execute();
            $result = $stmt->get_result();
            $markers = array();
            if($result->num_rows>0)
            {
                while($row = $result->fetch_assoc())
                {
                    $markers[] = $row;
                }
                return array("responseCode"=> 200, "message"=> "Result found", "markers"=>$markers);
            }
            else
            {
                return array("responseCode"=> 404, "message"=> "No result found", "markers"=>$markers);
            }

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
            $query = "INSERT INTO `marker` ( `name`, `description`, `ink`, `profileID`) VALUES(?,?,?,?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("sssi",$this->name, $this->description, $this->ink, $this->profileId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"marker created!");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing marker creation. ".$exception);
        }
    }

    public function update()
    {
        try
        {
            $query = "UPDATE `marker` SET  `name` = ? , `description` = ?, `ink` = ?  WHERE `id` = ? AND `profileId`=? ";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("sssii",$this->name, $this->description, $this->ink, $this->id, $this->profileId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"marker updated successfully!");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing marker creation. ".$exception);
        }
    }

    public function delete()
    {
        try
        {
            $query = "DELETE FROM  `marker` WHERE `id` =  ? AND `profileId` = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ii",$this->id, $this->profileId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"marker deleted");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing marker creation. ".$exception);
        }
        
    }

}
?>