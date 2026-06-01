
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