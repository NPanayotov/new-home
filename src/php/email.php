<?php

//https://www.cloudways.com/blog/send-emails-in-php-using-phpmailer/

namespace App\Controllers;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class MailController extends Controller
{
    /**
     * __invoke function
     *
     * @param array $recievers
     * @param string $subject
     * @param string $body
     */
    public function __invoke(
        array  $recipients,
        string $subject,
        string $message,
        array  $attachments = [],
        array  $from = [
            'email' => '',
            'name'  => ''
        ],
        string $non_html_message = ''
    ) {
        if ($this->config['environment'] == 'local') {
            return; // Leave this for now until get local Mail server
        }

        $mail = new PHPMailer(true);
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = $this->config['email']['host'];         //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $this->config['email']['server_user'];  //SMTP username
        $mail->Password   = $this->config['email']['server_pass'];  //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        // From
        (empty($from['email']) ? $mail->setFrom($this->config['email']['from'], $this->config['app_name']) : $mail->setFrom($from['email'], $from['name']));

        //Recipients
        foreach ($recipients as $recipient) {
            $mail->addAddress($recipient);     //Add a recipient
        }

        //Attachments
        foreach ($attachments as $attachment) {
            $mail->addAttachment($attachment);
        }

        //Content
        $mail->isHTML(true);
        //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = $non_html_message;

        return $mail->send();
    }
}
