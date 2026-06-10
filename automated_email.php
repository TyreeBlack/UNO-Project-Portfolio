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


// email content
$mail->isHTML(true);
$mail->addEmbeddedImage('C:\Users\Terry Black\Documents\My_PlayList\my-app\src\assets\uno_logo.png', 'image_cid');
$mail->CharSet = 'UTF-8';
$mail->setFrom('unopartyonline.services@gmail.com');
$mail->addAddress('tyreeblack01@gmail.com');

$mail->Subject = 'UNO Party Online v.1 Update Notes July 12th, 2026';

$mail->Body = '<html>
<body>
<div style="background-color:rgb(61, 60, 60); padding: 30px; border-radius: 12px; box-shadow: 0 0 4px blue, 0 0 4px blue;">
<img src="cid:image_cid" style="width:160px; height:160px; position: relative; align-item: center;">
<h1 style="font-weight: bold; color: white; font-size: 39px; text-align:center;">🎊 Welcome to UNO Party Online v.1! 🎊</h1><br> 
<p style="color: white; font-family: Roboto, sans-serif; font-weight: normal; font-size: 19px; text-align:center;">Since this game is still fairly new and still in development, bare with me, as the game is still in development. So in these patch notes there are things that are being resolved and still in the works.Expect more bugs/errors for the time being.</p><br>

<div style="background-color: rgb(61, 60, 60); border-left: 4px solid blue;">
<h1 style="color: white; font-size: 21px; text-align:center;"> 📜 Patch Notes & Updates Coming:</h1><br>

<p style="text-align:center;">All 4 players can now commit a turn when playing a card.</li><br>
<p style="text-align:center;">Competitive Mode will be implemented for the game in the next upcoming of months.</p><br>
<p style="text-align:center;">Will be implementing starter card packs that can be bought with game currency.</p><br>
</div>

<div style="background-color: rgb(61, 60, 60); border-left: 4px solid red;">
<h2 style="color:white; font-size: 21px; text-align:center;">👾 Bugs/Errors:</h2>

<p style="text-align:center;">Server Room not functional & displaying the correct usernames for owners of a party room.</p><br>
<p style="text-align:center;">Audio Overlapping from Main Lobby to Main Game Room</p><br>
<p style="text-align:center;">Store UI design still in initial layout phase.</p><br>

</div>

<h2 style="color: darkblue; font-size:35px; text-align: center;">**PLEASE DO NOT REPLY**</h2><br> 
<p style="color: white; font-size: 17px; text-align:center;"><strong>Disclaimer:</strong> This is an automated email</p><br>
<p style="color: white; font-size: 17px; text-align:center;">If you received this email it is because you requested you would like to receive patch note notifications. To unsubscribe <a href="#" style="font-size: 17px;">click here</a>.</p>

</div>
</body>
</html>';

try {
$mail->send();
echo 'Email was successfully sent!';
}
catch (Exception $e) {
    echo $mail->ErrorInfo;
}
?>
