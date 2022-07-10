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
    }

    function signInWithEmailAndPassword(){
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
                $_SESSION["username"] = $row["firstName"]. " ". $row["lastName"]; 
                return array("responseCode"=>200, "message"=> "Profile found");
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

}
?>