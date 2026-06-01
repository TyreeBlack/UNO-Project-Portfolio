import {useState, useEffect} from 'react';

import './store.css'

function UNOStore({username, socket}) {

const [payState, setPayState] = useState(null);


return (
<>
<div className="uno_container">
<h1 className="starter_pack">Starter Pack</h1>
<button type="submit" className="btn-submit" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>
{payState === "paymentWall" && (
    <form action="payment.php" method="POST" className="paymentWall">
    
    <label className="credit_handler">Credit Card Holder:</label>
    <input type="text" class="full_name_field" name="full_name" placeholder="Enter full name"></input>

    <label className="email_header">Email Address:</label>
    <input type="email" className="email_field" name="email_address" placeholder="Enter email address" required={true} ></input>
    
    <label className="billing_header">Billing Address:</label>
    <input type="text" className="billing_address_field" name="billing_address" placeholder="Enter billing address" required={true} ></input>
    
    <label className="credit_card_header">Credit Card Number:</label>
    <input type="number" class="credit_card_field" name="credit_card" placeholder="Enter credit card number"></input>
    <select className="credit_card_option">
    <option value="visa">Visa</option>
    <option value="discover">Discover</option>
    <option value="mastercard">MasterCard</option>
    <option value="paypal">PayPal</option>
    </select>

    <input type="number" className="zipCode_field" name="zipCode" placeholder="Enter zip code" required={true} ></input>
    <button type="submit" className="submit_payment">Submit Payment</button>
    </form>
)}
</>
)
}

export default UNOStore