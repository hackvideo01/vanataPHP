<?php
/**
 * VANATA Co.,Ltd - Email Sending Script
 * Author: Nguyễn Lực
 * Created: January 28, 2026
 * © 2026 VANATA Co.,Ltd
 * Using PHPMailer for secure email delivery
 */

include "PHPMailer/src/PHPMailer.php";
include "PHPMailer/src/SMTP.php";
include "PHPMailer/src/POP3.php";
include "PHPMailer/src/OAuthTokenProvider.php";
include "PHPMailer/src/OAuth.php";
include "PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$email = new PHPMailer(true);
// print_r($mail);

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return;
    }
    $type = $_POST['type'] ?? '';
    $name = $_POST['name'] ?? '';
    $emailAddr = $_POST['email'] ?? '';
    $company = $_POST['company'] ?? '';
    $tel = $_POST['tel'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Server settings
    $email->SMTPDebug = 2;                      // Enable verbose debug output
    $email->isSMTP();                                            // Send using SMTP
    $email->Host       = 'mail32.onamae.ne.jp';                    // Set the SMTP server to send through
    $email->SMTPAuth   = true;                                   // Enable SMTP authentication
    $email->Username   = 'sendmailer@vanata.co.jp';                     // SMTP username
    $email->Password   = 'matkhauso123!!';                               // SMTP password
    $email->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $email->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    // Recipients
    $email->setFrom('sendmailer@vanata.co.jp', 'Mailer');

    $email->addAddress('info@vanata.co.jp', 'Vanata Mailer');     // Add a recipient
    // $email->addAddress('');               // Name is optional
    // $email->addReplyTo('', 'Information');
    // $email->addCC('');
    // $email->addBCC('');

    // Attachments
    // $email->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $email->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $email->CharSet  = 'UTF-8';
    $email->Encoding = 'base64';
    $email->isHTML(true);                                  // Set email format to HTML
    $email->Subject = "VANTA '" .$type . "'";
    $email->Body    = 'From: '.$name .'<br>'
                    . '<br>Subject: ' .$type . '<br>'
                    . 'Name: ' .$name . '<br>'
                    . 'Email: ' .$emailAddr . '<br>'
                    . 'Company: ' .$company . '<br>'
                    . 'Tel: ' .$tel . '<br>'
                    . 'Message: ' .$message . '<br>'
                    . '<p style=\"font-size: 12px; color: #bbbbbb;\">--</p>'
                    . "<p style=\"font-size: 12px; color: #666;\">This e-mail was sent from a contact form on VANATA (https://www.vanata.co.jp)</p>";
    // $email->AltBody = 'This e-mail was sent from a contact form on VANATA (https://www.vanata.co.jp)';

    $email->send();
    echo 'Message has been sent';

}catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$email->ErrorInfo}";
}

?>