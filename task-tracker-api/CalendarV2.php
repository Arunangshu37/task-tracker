<?php
class CalendarV2{

    private $month;
    private $year;
    private $conn;

    public $date;

    function __construct($month, $year, $conn)
    {
        if(is_numeric($month) && is_numeric($year))
        {
            $this->month  = $month > 0 && $month < 13 ? $month : date("m");
            $this->year  = $year > 0 && $year < 10000 ? $year : date("Y");
        }
        else
        {
            $this->month = date("m");
            $this->year = date("Y");
        }
        $this->conn = $conn;
    }

    private function printData($data)
    {
        foreach($data as $week)
        {
            foreach($week as $day)
            {
                echo $day." ";
            }
            echo"<br>";
        }
    }
    
    function get_calendar()
    {
        $first_date = $this->year."-".$this->month."-1";
        $first_date_time = new DateTime($first_date);
        //N stands for ISO 8601 numeric representation of the day of the week 
        //1 (for Monday) through 7 (for Sunday)
        $first_week_day = $first_date_time->format("N");

        //finding last day of the month from the first date 
        // t stands for : Number of days in the given month
        $last_day_of_month = $first_date_time->format("t");
        $month_data = array();
        // counter is used to separate week 
        $counter = $first_week_day == 7 ? 0 : $first_week_day;
        $week = array();
        //boundary case : Sunday => 1st eg. 01 May 2022 is a Sunday then no need to add extra zeros
        if($first_week_day != 7 )
        {
            for($index = 0; $index < $first_week_day; $index++)
            {
                array_push($week, 0 );
            }
        }
        
        for($day = 1; $day <= $last_day_of_month; $day++ )
        {
            array_push($week, $day);
            $counter++;
            if($counter == 7 || $day == $last_day_of_month)
            {
                while($counter!=7)
                {
                    array_push($week, 0);
                    $counter++;
                }
                $month_data[] = $week;
                $week = array();
                $counter = 0;
            }
        }
        // $this->printData($month_data);
        return $month_data;
        
    }

    function get_marked_dates_of_month_and_year(){
        try{
            $query = "SELECT `marked_date`.id, `marker`.`name`, `marker`.`ink` , DAY(`marked_date`.`date`) as day FROM `marked_date`, `marker` WHERE `marked_date`.`markerId` =`marker`.`id` AND MONTH(`marked_date`.`date`)= ? AND YEAR(`marked_date`.`date`) = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("ii", $this->month, $this->year);
            $stmt->execute();
            $markedDays=array();
            $result = $stmt->get_result();
            if($result->num_rows>0)
            {
                while($row = $result->fetch_assoc())
                {
                    $markedDays[] = $row;
                }
                return $markedDays;
            }
            else{
                return $markedDays;
            }
        }catch(Throwable $exception){
            return array();
        }
    }

    function get_marked_dates()
    {
        try
        {
            $query = "SELECT `marked_date`.`date` AS `date`, `marked_date`.`id` AS `id`  , `marker`.`name` AS `name`, `marker`.`ink` AS `ink` "
            ." FROM `marked_date`, `marker`"
            ." WHERE `marked_date`.`markerId` = `marker`.`id`"
            ." AND `marked_date`.`date` = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("s", $this->date);
            $stmt->execute();
            $result = $stmt->get_result();
            $markedDates = array();
            if($result->num_rows>0)
            {
                while($row = $result->fetch_assoc())
                {
                    $markedDates[] = $row;
                }
                return array("responseCode"=>200, "message"=>"Result found", "markedDates"=>$markedDates);
            }
            else{
                return array("responseCode"=>404, "message"=>"No result found", "daysMarked"=>$markedDates);
            }
            
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing task creation. ".$exception);
        }
    }

    function mark_date($date, $instanceId){
        try
        {
            $query = "INSERT INTO `marked_date` ( `date`, `markerId`) VALUES(?,?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("si",$date,$instanceId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"Date has been marked");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!".$this->conn->error);
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while marking the date with the specified marker ".$exception);
        }
    }
    function remove_marker_from_date($instanceId){
        try
        {
            $query = "DELETE FROM  `marked_date` WHERE `id` =  ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("i",$instanceId);
            if($stmt->execute())
            {
                return array("responseCode"=>200, "message"=>"Marker removed from this date");
            }
            else
            {
                return array("responseCode"=>500, "message"=>"something went wrong!");
            }
        }
        catch(Throwable $exception)
        {
            return array("responseCode"=>500, "message"=>"There was an exception while processing marker removal".$exception);
        }
    }
}
// $calendar = new CalendarV2(7,2022, null);
// $calendar->get_calendar();
?>