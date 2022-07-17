<?php

// error_reporting(0);
class Profile{
    public $id = 0;
    public $email = "";
    public $password = "";
    public $firstName ="";
    public $lastName = "";
    public $createdOn = "";
    public $token = 0;
    public $imagePath = "";
    private $conn= null;

    function __construct($conn)
    {
        $this->conn = $conn;
        $this->id = isset($_SESSION['profile']) ? $_SESSION['profile'] : 0;
    }

    function sign_in_with_email_and_password(){
        try
        {
            
            $query = "SELECT `id`, `firstName`, `lastName` FROM `profile` WHERE `email` = ? AND `password` = ? ";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ss", $this->email, $this->password);
            $stmt->execute();
            $profile = $stmt->get_result();
            if($profile->num_rows > 0)
            {
                $row = $profile->fetch_assoc();
                $_SESSION["profile"] = $row["id"];
                $_SESSION["username"] = $row["firstName"]. " " . $row["lastName"]; 
                return array("responseCode"=>200, "message"=> "Profile found", "profileInfo"=>array("profile"=>$row['id'], "username"=>$_SESSION["username"]));
            }
            else
            {
                return array("responseCode"=>401, "message"=> "Invalid credentials supplied");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"An exception occcured  :".$exception);
        }
    }

    function get_current_profile_information()
    {
        try
        {
            
            $query = "SELECT `id`, `firstName`, `lastName`, `createdOn`, `token`, `imagePath`, `email` FROM `profile` WHERE `id` = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i", $this->id);
            $stmt->execute();
            $profile = $stmt->get_result();
            if($profile->num_rows > 0)
            {
                $profileInfo = $profile->fetch_assoc();
                return array("responseCode"=>200, "message"=> "Profile found", "profileInfo"=>$profileInfo);
            }
            else
            {
                return array("responseCode"=>401, "message"=> "No profile exists with the id provided : ".$this->id, "profileInfo"=>[]);
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"An exception occcured  :".$exception);
        }
    }

    function update_profile_info()
    {
        try
        {
            $query = "";
            $stmt = NULL;
            $query = "SELECT `imagePath` FROM `profile` WHERE `id` =  ".$this->id;
            $result = $this->conn->query($query);
            $row = "";
            if($result->num_rows  > 0)
            {
                $row  = $result->fetch_assoc();
            }
            $this->imagePath = $row['imagePath'];

            if($this->image!=null)
            {
                
                $fileUploadResponse = array();
                $fileUploadResponse = $this->try_upload_file($this->image,$row["imagePath"]);
                if($fileUploadResponse["fileUploadStatus"] !=200)
                {
                    return array("responseCode"=>500, "message"=>"File upload ws not successfull : ".$fileUploadResponse["message"]);
                }
                else
                {
                    $this->imagePath  = $fileUploadResponse["imagePath"];
                }
            }
            
            

            $stmt = null;
            $query = "";
            if($this->token==1)
            {
                // currently not considering 
            }
            else
            {
                $query="UPDATE `profile` SET `firstName` =  ? ,`lastName` =  ? , `email`= ?, `imagePath` = ? WHERE `id` = ? ";
                $stmt = $this->conn->prepare($query);
                $stmt->bind_param("ssssi", $this->firstName, $this->lastName, $this->email, $this->imagePath, $this->id);
            }
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"ProfileUpdated Successfully!");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"There was an error while updating your profile . ".$this->conn->error);
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"An exception occured : ".$exception);
        }
    }
    private function  try_upload_file($image, $previosImage){
        if($image['error']!=0)
        {
            return array("fileUploadStatus"=>500, "message"=>"There was an error in provessing the file  : ".$image['file']['error']);
        }
        $fileNameArray = explode(".", $image['name']);
        $fileExtension = strtolower(end($fileNameArray));
        $allowedExtension = array("jpg", "jpeg", "png");
        $fileSize = (int)$image['size'];
        if(!in_array($fileExtension, $allowedExtension))
        {
            return array("fileUploadStatus"=>500, "message"=>"File extension is not allowed. ");
        }
      
        $fileNewName = uniqid('', true).".".$fileExtension;
        unlink("../".$previosImage);
        $destination = "../Profile/ProfileImages/".$fileNewName;
        move_uploaded_file($image['tmp_name'], $destination);
        return array("fileUploadStatus"=>200, "message"=> "File was uploaded successfully", "imagePath"=>substr($destination, 3,strlen($destination)));
    }
}
?>