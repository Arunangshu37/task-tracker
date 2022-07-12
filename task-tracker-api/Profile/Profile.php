<?php

error_Reporting(0);
class Profile{
    public $id = 0;
    public $email = "";
    public $password = "";
    public $firstName ="";
    public $lastName = "";
    public $createdOn = "";

    private $conn= null;

    function __construct($conn)
    {
        $this->conn = $conn;
        $this->id = $_SESSION['prodile'];
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
                session_start();
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

    function get_full_profile_information()
    {
        try
        {
            
            $query = "SELECT `id`, `firstName`, `lastName`, `createdOn`, `token`, `imagePath` FROM `profile` WHERE `id` = ?";
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
}
?>