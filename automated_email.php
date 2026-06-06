<?php   
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->SMTPDebug = SMTP::DEBUG_SERVER; 
$mail->Username = 'unopartyonline.service@gmail.com';
$mail->Password = 'opov nanh lwjd kbdn';
$mail->SMTPSecure = 'tls'; // this will enable TLS encrpytion for safe transfer of emails
$mail->Port = 587; // this is the standard port for secure email transmission

$mail->setFrom('unopartyonline.services@gmail.com');
$mail->addAddress('tyreeblack01@gmail.com');

$mail->Subject = 'UNO Party Online v.1 Update Notes July 12th, 2026';

$mail->Body = 'Welcome to UNO Party Online v.1! since this game is still fairly new and still in development, bare with me, as the game is still in development. So in these patch notes, except more bugs/errors for the time being. 

Patch Notes & Updates Coming:
- All 4 players can now commit a turn when playing a card.
- Competitive Mode will be implemented for the game in the next upcoming of months.
- Will be implementing starter card packs that can be bought with game currency.

Bugs/Errors:
- Server Room not functional.
- Audio Overlapping from Main Lobby to Main Game Room
- Store UI design still in initial layout phase.

**PLEASE DO NOT REPLY** 
Disclaimer: This is an automated email';

try {
$mail->send();
echo 'Email was successfully sent!';
}
catch (Exception $e) {
    echo $mail->ErrorInfo;
}
?>
