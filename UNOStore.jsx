import {useState, useEffect} from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,
        faGlobe,
        faEnvelope,
        faAngleRight,
        faAngleUp,
        faAngleDown,
        faPlus,
        faUser,
        faPersonCirclePlus,
        faStore,
        faFlag,
        faGripLines,
        faGear,
        faX,
        faXmark,
        faMessage, 
        faAward,
        faPaperPlane,
} 
       from  "@fortawesome/free-solid-svg-icons";

import './store.css'

function UNOStore({username, socket, friends}) {

const [previewPack, setPreviewPack] = useState(null);
const [payState, setPayState] = useState(null);


return (
<>
<div className="navigation_bar">
<h1 className="username_title">{username}</h1>
<FontAwesomeIcon icon={faEnvelope}className="fa_envelope"></FontAwesomeIcon>
</div>
<div className="uno_container">
<h1 className="starter_pack">Starter Pack</h1>
<div className="card_pack">
<h1 className="card_pack_title">UNO</h1>
<div className="pack-circle">
</div>
</div>
<button type="button" className="preview_pack" onMouseEnter={() => setPreviewPack("preview_interface")}>Preview</button>
<h1 className="party_tokens">Party Tokens</h1>
<button type="submit" className="btn-submit" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_2">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_2">Preview</button>
<button type="submit" className="btn-submit-two" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_3">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_3">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_4">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_4">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_5">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_5">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_6">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_6">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_7">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_7">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_8">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_8">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_9">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_9">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_10">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_10">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_11">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_11">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_12">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_12">Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

{previewPack === "preview_interface" &&  (
    <div className="preview_interface" onMouseEnter={() => setPreviewPack("preview_interface")} onMouseLeave={() => setPreviewPack("")}>
    <h1 className="pack_content">Pack Contents</h1>
    <div className="common_preview"></div>
    <h1 className="common">Common: 50%</h1>
    <div className="uncommon_preview"></div>
    <h1 className="uncommon">Uncommon: 30%</h1>
    <div className="rare_preview"></div>
    <h1 className="rare">Rare: 25%</h1>
    <div className="godly_preview">
    <h1 className="mystery">??</h1>
    </div>
    <h1 className="godly">Godly: 5%</h1>
    <div className="chroma_gradient">
    <div className="chroma_card">
    <h1 className="chroma_title">0</h1>
    <h1 className="top_chroma_title">0</h1>
    <h1 className="bottom_chroma_title">0</h1>
    <div className="chroma_circle">
    </div>
    </div>
    </div>
    </div>
)}

{payState === "paymentWall" && (
    <form action="payment.php" method="POST" className="paymentWall">
    
    <label className="credit_handler">Credit Card Holder</label>
    <input type="text" class="full_name_field" name="full_name" placeholder="Enter full name"></input>

    <label className="email_header">Email Address</label>
    <input type="email" className="email_field" name="email_address" placeholder="Enter email address" required={true} ></input>
    
    <label className="billing_header">Billing Address</label>
    <input type="text" className="billing_address_field" name="billing_address" placeholder="Enter billing address" required={true} ></input>
    
    <label className="credit_card_header">Credit Card Number</label>
    <input type="number" class="credit_card_field" name="credit_card" placeholder="Enter credit card number"></input>
    <select className="credit_card_option">
    <option value="visa">Visa</option>
    <option value="discover">Discover</option>
    <option value="mastercard">MasterCard</option>
    <option value="paypal">PayPal</option>
    </select>

    <label className="expiration_date_header">Expiration</label>
    <input type="date" className="expiration_date_field" name="date" placeholder="MM/YY"></input>

    <label className="security_code_header">Security Code</label>
    <input type="number" className="security_code_field" name="security_code" placeholder="CVC"></input>

    <input type="number" className="zipCode_field" name="zipCode" placeholder="Enter zip code" required={true} ></input>
    <button type="submit" className="submit_payment">Submit Payment</button>
    </form>
)}
</>
)
}

export default UNOStore