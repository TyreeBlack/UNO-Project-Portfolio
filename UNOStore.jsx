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
        faGift,
        faSnowflake,
        faEye, 
        faSpiral, 
        faBolt,
        faMagnet, 
        faShield
} 
       from  "@fortawesome/free-solid-svg-icons";

import './store.css'


function UNOStore({username, socket, friends}) {


const [RewardScreen, setRewardScreen] = useState(null);

const [previewPack, setPreviewPack] = useState(null);
const [previewPack2, setPreviewPack2] = useState(null);
const [previewPack3, setPreviewPack3] = useState(null);
const [previewPack4, setPreviewPack4] = useState(null);
const [previewPack5, setPreviewPack5] = useState(null);
const [previewPack6, setPreviewPack6] = useState(null);
const [previewPack7, setPreviewPack7] = useState(null);
const [previewPack8, setPreviewPack8] = useState(null);
const [previewPack9, setPreviewPack9] = useState(null);
const [previewPack10, setPreviewPack10] = useState(null);
const [previewPack11, setPreviewPack11] = useState(null);
const [previewPack12, setPreviewPack12] = useState(null);

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
<button type="submit" className="btn-submit" onClick={() => { setPayState("paymentWall"), setRewardScreen("pack_reveal")}}>Buy Now!</button>
</div>

<div className="uno_container_2">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_2" onMouseEnter={() => setPreviewPack2("preview_interface_2")} >Preview</button>
<button type="submit" className="btn-submit-two" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_3">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_3" onMouseEnter={() => setPreviewPack3("preview_interface_3")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_4">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_4"  onMouseEnter={() => setPreviewPack4("preview_interface_4")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_5">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_5"  onMouseEnter={() => setPreviewPack5("preview_interface_5")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_6">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_6"  onMouseEnter={() => setPreviewPack6("preview_interface_6")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_7">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_7"  onMouseEnter={() => setPreviewPack7("preview_interface_7")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_8">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_8"  onMouseEnter={() => setPreviewPack8("preview_interface_8")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_9">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_9" onMouseEnter={() => setPreviewPack9("preview_interface_9")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_10">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_10" onMouseEnter={() => setPreviewPack10("preview_interface_10")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_11">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_11"  onMouseEnter={() => setPreviewPack11("preview_interface_11")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>

<div className="uno_container_12">
<h1 className="starter_pack">Starter Pack</h1>
<button type="button" className="preview_pack_12" onMouseEnter={() => setPreviewPack12("preview_interface_12")}>Preview</button>
<button type="submit" className="btn-submit-three" onClick={() => setPayState("paymentWall")}>Buy Now!</button>
</div>


{RewardScreen === "pack_reveal" && (
    <div className="pack_reveal">
    <div className="spotlight"></div>
    <FontAwesomeIcon icon={faGift} className="fa-gift"></FontAwesomeIcon>
    <button type="button" className="reveal_button">Click to Reveal</button>
    </div>
)}

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

{previewPack2 === "preview_interface_2" && (
      <div className="preview_interface_2" onMouseEnter={() => setPreviewPack2("preview_interface_2")} onMouseLeave={() => setPreviewPack2("")}>
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
    <div className="freeze_card">
    <div className="top_freeze_circle"><FontAwesomeIcon icon={faSnowflake} className="snow_icon"></FontAwesomeIcon></div>
      <div className="bottom_freeze_circle"><FontAwesomeIcon icon={faSnowflake} className="snow_icon_2"></FontAwesomeIcon></div>
    <div className="freeze_circle">
        <FontAwesomeIcon icon={faSnowflake} className="main_snow_icon"></FontAwesomeIcon>
    </div>
    </div>
    </div>
)}

{previewPack3 === "preview_interface_3" && (
       <div className="preview_interface_3" onMouseEnter={() => setPreviewPack3("preview_interface_3")} onMouseLeave={() => setPreviewPack3("")}>
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
    <div className="overseer_card">
    <FontAwesomeIcon icon={faSpiral} className="fa-spiral"></FontAwesomeIcon>
        <div className="spike_1"></div>
        <div className="spike_2"></div>
        <div className="spike_3"></div>
        <div className="spike_4"></div>
        <div className="overseer_circle">
        <div className="overseer_gold_circle"></div>
        <div className="overseer_pupile"></div>
        <div className="overseer_iris"></div>
        <div className="top_eye_icon"><FontAwesomeIcon icon={faEye} className="eye_icon"></FontAwesomeIcon>
        </div>
        <div className="spike_5"></div>
        <div className="spike_6"></div>
        <div className="spike_7"></div>
        <div className="spike_8"></div>
        <div className="spike_9"></div>
        <div className="spike_10"></div>
        </div>
        <div className="bottom_eye_icon"><FontAwesomeIcon icon={faEye} className="eye_icon_2"></FontAwesomeIcon>
        </div>
    </div>
    </div>
)}

{previewPack4 === "preview_interface_4" && (
    <div className="preview_interface_4" onMouseEnter={() =>  setPreviewPack4("preview_interface_4")} onMouseLeave={() => setPreviewPack4("")}>
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
    <div className="magnet_card">
    <div className="magnet_circle">
    <FontAwesomeIcon icon={faMagnet} className="main-magnet"></FontAwesomeIcon>
    </div>
    <FontAwesomeIcon icon={faBolt} className="bolt-1"></FontAwesomeIcon>
    <FontAwesomeIcon icon={faBolt} className="bolt-2"></FontAwesomeIcon>
    <FontAwesomeIcon icon={faBolt} className="bolt-3"></FontAwesomeIcon>
    <FontAwesomeIcon icon={faBolt} className="bolt-4"></FontAwesomeIcon>
    <FontAwesomeIcon icon={faBolt} className="bolt-5"></FontAwesomeIcon>
    <FontAwesomeIcon icon={faBolt} className="bolt-6"></FontAwesomeIcon>
    <div className="top_magnet_icon"><FontAwesomeIcon icon={faMagnet} className="magnet-top"></FontAwesomeIcon></div>
    <div className="bottom_magnet_icon"><FontAwesomeIcon icon={faMagnet} className="magnet-bottom"></FontAwesomeIcon></div>
    </div>
    </div>
)}

{previewPack5 === "preview_interface_5" && (
    <div className="preview_interface_5" onMouseEnter={() =>  setPreviewPack5("preview_interface_5")} onMouseLeave={() => setPreviewPack5("")}>
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
    <div className="deflect_card"> 
    <FontAwesomeIcon icon={faShield} className="fa-shield"></FontAwesomeIcon>
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