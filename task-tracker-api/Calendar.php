<?php
session_start();
class CalendarV2{

    private $month;
    private $year;
    private $week_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    function __construct($month, $year)
    {
        if(is_numeric($month) && is_numeric($year))
        {
            $this->month  = $month > 0 && $month < 13 ? $month : date("m");
            $this->year  = $year > 0 && $year < 10000 ? $year : date("Y");
        }
        else
        {
            echo "Month or year provided is not a number. Setting month and year to current month and yeat value.";
            $this->month = date("m");
            $this->year = date("Y");
        }
    }

    function get_calender()
    {
        $_SESSION["test"]= "bla ";
        $first_date = $this->year."-".$this->month."-1";
        $first_date_time = new DateTime($first_date);
        $first_week_day = $first_date_time->format("N");

        //finding last day of the month from the first date 
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
    }
}


$calendar = new CalendarV2(7, 2022);
$calendar->get_calender();
?>