<?php

class DbConnection
{
    private $servername = "localhost";
    private $password = "admin@123";
    private $username = "root";
    private $database = "task_manager";

    private $conn = null;

    public function __construct($flag)
    {   
        if($flag == "PROD")
        {
            $this->servername = "sql106.epizy.com";
            $this->database = "epiz_32086682_task_tracker";
            $this->username = "epiz_32086682";
            $this->password = "FKGDRYs15e2hDw";
        }
    }

    function get_connection()
    {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) 
        {
            die("Connection failed: " . $this->conn->connect_error);
            return null;
        }
        return $this->conn;
    }
}
?>  