<?php
    use PHPMailer\PHPMailer\PHPMailer;
    function sendMail($mailSubject, $receiverEmailId, $message){

        $name = "Task-Tracker Admin";
        $to = $receiverEmailId;
        $subject = $mailSubject;
        $from = "arunangshu.biswas.x@gmail.com";
        $password = "jonjgyyvfkdvcgzu";

        require_once("PHPMailer/PHPMailer.php");
        require_once("PHPMailer/SMTP.php");
        require_once("PHPMailer/Exception.php");

        $mail = new PHPMailer();


        $mail->isSMTP();
        $mail->Host ="smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = $from;
        $mail->Password = $password;
        $mail->Port = 587;
        $mail->SMTPSecure = "tls";
        $mail->smtpConnect(["ssl"=>[
                "verify_peer"=>false,
                "verify_peer_name"=>false,
                "allow_self_signed"=>false
            ]
        ]);
        
        $mail->setFrom($from, $name);
        $mail->addAddress($to);
        $mail->Subject = ("$subject");
        $mail->Body = $message;

        if($mail->send())
        {
            return array("responseCode"=>200, "message"=>"Mail sent");
        }else{
            
            return array("responseCode"=>500, "message"=>"Problem");
        }

        
    }
?>