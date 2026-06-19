import {useState, useEffect} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPencil, 
    faX,
    faBirthdayCake,
    faTrophy,
    faAngleRight
}
from "@fortawesome/free-solid-svg-icons";

import './profile.css';

import UserInitialIcon from './UserInitialIcon';

function Profile({username}) {

    const [ProfileGUI, setProfileGUI] = useState(null);

    const[exitProfile, setExitProfile] = useState(false);

return (
<>
<div className="nav_bar_profile">
<h1 className="profile_header" onClick={() =>  { setProfileGUI("profile_container"), setExitProfile(false)}}>PROFILE</h1>
</div>

<div className="nav_bar_setting">
<h1 className="setting_header">SETTINGS</h1>
</div>

{ProfileGUI === "profile_container" && !exitProfile && (
    <div className="profile_container">
    <div className="exit_profile"><FontAwesomeIcon icon={faX} className="exit_panel" onClick={() => setExitProfile(true)}></FontAwesomeIcon></div>

    <div className="profile_gui_logo">
    <h1 className="profile_gui">UNO</h1>
    </div>
    <div className="profile_banner">
    <UserInitialIcon username={username} className="profile_logo" />
    <h1 className="profile_username">{username}</h1>
    <div className="edit_logo">
    <FontAwesomeIcon icon={faPencil} className="edit_pencil"></FontAwesomeIcon>
    <div className="overview_banner"><h1 className="overview_header_banner">OVERVIEW</h1></div>
    <div className="stats_banner"><h1 className="stats_header_banner">STATS</h1></div>
    <div className="achievements_banner"><h1 className="achievements_header_banner">ACHIEVEMENTS</h1></div>
    </div>
    <div className="level_banner">
    </div>
    </div>
    <div className="profile_overview">
    <h1 className="overview_header">OVERVIEW</h1>
    <div className="age_container">
    <h1 className="age_header">AGE</h1>
    <FontAwesomeIcon icon={faBirthdayCake} className="fa-cake"></FontAwesomeIcon>
    <h1 className="years_old">YEARS OLD</h1>
    </div>
    <div className="games_played_container">
    <h1 className="games_header">GAMES PLAYED</h1>
    <h1 className="games_total">TOTAL</h1>
    </div>
    
    <div className="matches_won_container">
    <h1 className="matches_won_header">MATCHES WON</h1>
    <FontAwesomeIcon icon={faTrophy} className="fa-trophy"></FontAwesomeIcon></div>
    </div>
    <div className="card_inventory">
    <h1 className="cards_owned">CARD INVENTORY</h1>

     <button type="button" className="view_cards">VIEW ALL</button><FontAwesomeIcon icon={faAngleRight} className="view_all"></FontAwesomeIcon>
    <div className="card_container">
    <div className="original_card">
    <div className="original_circle">
    <h2 className="original_logo">UNO</h2>
    </div>
    </div>
    <h1 className="classic_header">CLASSIC</h1>
    </div>

     <div className="card_container_2">
    <h1 className="common_header">COMMON</h1>

    </div>
    <div className="card_container_3">
    <h1 className="uncommon_header">UNCOMMON</h1>
    </div>

     <div className="card_container_4">
    <h1 className="rare_header">RARE</h1>
    </div>

     <div className="card_container_5">
    <h1 className="godly_header">GODLY</h1>
    </div>
    </div>
    </div>
)}
</>
)
}

export default Profile