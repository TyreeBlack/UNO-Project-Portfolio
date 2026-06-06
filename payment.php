
<?php 



function HandlingUserTransaction() {
$full_name = INPUT_POST['full_name'];
if(empty($full_name)) {
    echo "A name is required for processing payment.";
}

$email_field = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if(empty($email_field)) {
    echo "Email Address field cannot be empty";
}

$billing_address = INPUT_POST['billing_address'];
if(empty($billing_address)) {
    echo "Billing Address field cannot be empty";
}

if (($zipCode = filter_input(INPUT_POST, 'zipCode', FILTER_VALIDATE_INTEGER)) !== False) {
    echo "Valid Numbers processed";
}
else {
    echo "Must be numeric values.";
}

$payment_transaction = fopen("transaction.txt", "w")


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer=master/src/Exception.php';

$mail->Host = '';
$mail->Username = '';

$mail->setFrom('UnoPartyOnline@support.com');
$mail->addAddress($email_field);

$email->subject('Order Transaction');
$email->body('Thank you for your purchase! your order has been processed, please return to the game to view your items.')
}

try {
$mail->send();
}
catch(Exception e) {
echo 'Error Occured: Email could not be send or Email address does not exist';
}
?>

import {useState} from 'react';


function PaymentFrontEnd() {




return (

<>
<div className="Thank_You_Container">
<h2 className="procesed_header">Your Payment has been processed!</h2>
<p>Email was sent to:<?php echo $email_field; ?></p>
</div>



</>

  ) 
}

export default PaymentFrontEnd