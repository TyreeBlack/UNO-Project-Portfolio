
import { useState, useEffect, useRef, Fragment } from 'react'; 

import mySoundtrack from './assets/Elevator Music.mp3';

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


import './MainLobby.css'
import MainGame from "./MainGame";
import UNOStore from "./UNOStore";
import UserInitialIcon from "./UserInitialIcon";

import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";

// declares a prop and fetches for objects
function MainLobby({username, socket, friends}) {

const [initialGameState, setInitialGameState] = useState(null);
const [onscreen, setScreen] = useState("sidebar_menu");
const [activePanel, setActivePanel] = useState(null);
const [FriendsPanel, setFriendsPanel] = useState(null);
const [MinimizeFriendPanel, setMinimizeFriendPanel] = useState(false);

const [MinimizeServerPanel, setMinimizeServerPanel] = useState(false);

const [UnoStore, setUnoStore] = useState(null);

const [PartyRoom, setPartyRoom] = useState(null);
const [MinimizedPartyUI, setMinimizedParty] = useState(false);
const [MinimizedInviteUI, setMinimizeInviteUI] = useState(false);

const[InviteBubble, setInviteBubble] = useState(null);
const[PartyRequestSent, setPartyRequestSent] = useState(null);
const[ReceivedPartyRequest, setReceivedPartyRequest] = useState(null);
const[ClearPartyRequest, setClearPartyRequest] = useState(false);

const[AcceptPartyRequest, setAcceptPartyRequest] = useState(null);
const [PartySlotPanel, setPartySlotPanel] = useState(false);


const [ServerRoom, setServerRoom] = useState(null);
const [unoparty, setUnoParty] = useState(null);
const [roomPanel, setRoomPanel] = useState(null);
const [inviteFriend, setInviteFriend] = useState(null);

const[MissionBoard, setMissionBoard] = useState(null);

const[targetUsername, setTargetUsername] = useState("");

const[RequestFriend, setRequestFriend] = useState(null);
const[ReceivedFriendRequest, setReceivedFriendRequest] = useState(null);


const[AcceptFriendRequest, setAcceptRequest] = useState(null);
const[FriendStatus, setFriendStatus] = useState(null);

const[SettingUI, setSettingUI] = useState(null);
const[MinimizeSettingUI, setMinimizeSettingUI] = useState(false);

const[StartGame, setStartGame] = useState(false);
const[maxPlayer, setmaxPlayer] = useState(false);


console.log("Current UnoParty: ", unoparty);
console.log("Curremt RoomCode: ", unoparty?.roomCode);


useEffect(() => {
  console.log("UnoParty Changed State: ", unoparty);
}, [unoparty]);

function LogOut() {

  socket.on('disconnect', username, (log_out) => {
  setLogOut(log_out);
  });

}

function SoundTrackComponent() {

  // manages DOM elements in a mutuable state, in this case, implemented for audio rendering
  const audioRef = useRef(null);

  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
    };
    
    document.addEventListener("click", unlockAudio);
    return() => {
      document.removeEventListener("click", unlockAudio);
    
      if(audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
      audioRef.current.src = " ";
      audioRef.current.removeAttribute('src'); // clears the audio cache 
      audioRef.current.load();
      }
    }
  }, []);
  return (
  <>
    <audio  ref={audioRef} autoPlay loop src={mySoundtrack}></audio>
</>
  );
}

// func for handling the party room
function createUnoParty() {

socket.emit("create_party", username, (unoparty) => {
console.log(unoparty);
setUnoParty(unoparty);
  });

  setPartyRoom("partyRoom");
}

// func for handling friend request system
function sendFriendRequest() {
  socket.emit("send_request", targetUsername, received_request =>{
    console.log(received_request);
    setRequestFriend(received_request);
  }); 
}

useEffect(() => {
  socket.on("receive_friend_request", (get_request) => {
    setReceivedFriendRequest(get_request);
  });
}, []);

// broadcasts the receiver received the friend request from the sender
function Accepting_Requests() {
socket.emit("accept_request", ReceivedFriendRequest.from, username, (request_accepted) => {
  setAcceptRequest(request_accepted);
  });

}
useEffect(() => {
  socket.on("friend_status", (friendship) => {   
  setFriendStatus(friendship);
  });
}, []);

useEffect(() => {
  socket.on("party_sent_invitation", (party_received) => {
  console.log("RECEIVED PARTY INVITE:", party_received);
    setReceivedPartyRequest(party_received);
  });
}, []);

function PartyRequestInvitation(friend) {
  socket.emit("party_request", friend, party_sent =>  {
    console.log(party_sent);
    setPartyRequestSent(party_sent);
  });
}

function HandleAcceptPartyRequest() {
  socket.emit("accepting_party_requests", ReceivedPartyRequest.roomCode, (accept_invite_request) => {
    console.log(accept_invite_request);
    console.log("Whats this object: ", accept_invite_request);
    console.log("Accept Callback: ", accept_invite_request);
    console.log("Room Code From Invite: ", ReceivedPartyRequest.roomCode);

    console.log("Setting Accept Invite Object: ", accept_invite_request);
    setActivePanel("party");
  });
}

useEffect(() => {
  socket.on("accepting_party_request", (UpdatedParty) => {
    console.log("Party Room Updated: ", UpdatedParty);
    console.log("Updated Party: ", UpdatedParty);
    setUnoParty(prev => {
      console.log("Prev UnoParty: ", prev);
      console.log("Updated Party: ", UpdatedParty);
    return {
      ...prev,
      roomCode: UpdatedParty.roomCode,
      players: UpdatedParty.PlayerSlot // maps the players array to the object from the server side
    };
  });
});
},[]);

function HandleGameInitialization() {
  if(!unoparty?.roomCode) {
    console.error("No room code was found in the party state. ");
    return;
  }
  socket.emit("start_game", unoparty.roomCode, (roomFull) => {
    console.log("Player Limit: ", roomFull);
    setmaxPlayer(roomFull);
  });
}

useEffect(() => {
  socket.on("start_game", (player_state) => {
    console.log("Start Game Uno Party: ", unoparty);
    console.log("UnoParty during Start Phase: ", unoparty);
    console.log("Game Initialization: ", player_state);
    setInitialGameState(player_state.gameState);
    setStartGame(true);
    setScreen("GameRoom");
  });
return () => {
  socket.off("start_game");
};
},[]);

return (
    <>
    <SoundTrackComponent />
    <div className="nav-bar">
    <h1 className="extras">Competitive (At a later date)</h1>
    <h1 className="store_title" onClick={() => setUnoStore("StoreFront")}><FontAwesomeIcon icon={faStore} className="fa-store"></FontAwesomeIcon>Store</h1>
   <h1 className="username-title">{username}</h1>
   <FontAwesomeIcon icon={faEnvelope} className="fa-envelope"></FontAwesomeIcon>
   <FontAwesomeIcon icon={faGripLines} className="fa-grip-lines"></FontAwesomeIcon>
   <button type="button" className="sign_out" onClick={() => LogOut()}>Sign Out</button>
    </div>
    {onscreen === "sidebar_menu" && (
    <>
    <div className="sidebar_menu">
    <div className="sidebar_tab">
    </div>
    < UserInitialIcon  username={username}/>
    <div className="create_item">
    <h6 className="create_party_title" onClick={() => setActivePanel("party")}><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Create party</h6><br></br>
    </div>
    <FontAwesomeIcon icon={faGlobe} className="fa-search"></FontAwesomeIcon><h1 onClick={() => { setServerRoom("server"), setMinimizeServerPanel(false)}} className="join_party_header">Join Party</h1><br></br>
     <hr className="tabname_divider"/>
    <hr className="tabname_divider_two"/>
    <h1 className="missions_title" onClick={() => setMissionBoard("mission_board_UI")}><FontAwesomeIcon icon={faFlag} className="fa-flag"></FontAwesomeIcon>Objectives</h1>
    <hr className="tab_objective_divider"/>
    <h1 className="friends_title" onClick={() => { setFriendsPanel("friend_UI"), setMinimizeFriendPanel(false)}}><FontAwesomeIcon icon={faPersonCirclePlus} className="fa-friends"></FontAwesomeIcon>Friends</h1>
    <h1 className="settings_title" onClick={() => {setSettingUI("setting_UI"), setMinimizeSettingUI(false)}}><FontAwesomeIcon icon={faGear} className="fa-gear"></FontAwesomeIcon>Settings</h1>
    <hr className="tabname_divider_three" />
     <hr className="tabname_divider_four"/>
    </div>
    {activePanel === "party" && (
    <div className="game_room">
    <div className="slot_container">
    <button type className="decrement_slot">{unoparty?.players?.[0] ?< UserInitialIcon username={unoparty.players[0]} /> : "+"}</button>
    </div>
    <div className="slot_container_2">
    <button type className="increment_slot">{unoparty?.players?.[1] ?<UserInitialIcon username={unoparty.players[1]}/> : "+"}</button>
    </div>
    <div className="slot_container_3">
    <button type className="increment_slot_3">{unoparty?.players?.[2] ? <UserInitialIcon username={unoparty.players[2]}/> : "+"}</button>
    </div>
    <div className="slot_container_4">
    <button type className="increment_slot_4">{unoparty?.players?.[3] ? <UserInitialIcon username={unoparty.players[3]}/> : "+"}</button>
    </div>
    <button type="submit" className="create_room" onClick={createUnoParty}>Create Party</button>
    <button type="submit" className="readyup" onClick={() => HandleGameInitialization()}>Ready</button>
    <h1 className="player_limit">Maxmium Limit: {maxPlayer?.status || `0/${unoparty?.maxPlayers || 4}`}</h1>
    </div>
    )}

    {SettingUI === "setting_UI" && !MinimizeSettingUI && (
      <div className="setting_UI_container">
      <i className="fa-duotone fa-solid fa-grip-lines" onClick={() => setMinimizeSettingUI(true)}></i>
      <input type="range" min="0" max="10" className="volume_range"></input>
      <h1 className="adjust_lobby_vol_header">Lobby SFX Volume</h1>
      <h1 className="accessibility">Accessibility</h1>
      <div className="accessibility_dropdown">
      <h1 className="auto_play">Auto Play:</h1>
      <i className="fa-solid fa-toggle-large-on"></i>
      </div>
      </div>
    )}

     {PartyRoom === "partyRoom" && !MinimizedPartyUI && (
      <div className="partyRoom_container">
      <FontAwesomeIcon icon={faAngleDown} className="minimize_PartyUI" onClick={() => setMinimizedParty(true)}></FontAwesomeIcon>
      <h1 className="party_leader">{username}'s party</h1>
      <h7 className="room_title">Room Code: {unoparty && unoparty.roomCode}</h7>
      <p className="max_player_title">Player Limit: 1/4</p>
      <div className="invite_slots" onClick={() => setInviteBubble("invite_UI")}><FontAwesomeIcon icon={faUser} className="fa-user"></FontAwesomeIcon><FontAwesomeIcon icon={faPlus} className="fa-plus"></FontAwesomeIcon><h5 className="invite_header">Invite</h5><FontAwesomeIcon icon={faAngleRight} className="fa-angle-right"></FontAwesomeIcon></div>
      {InviteBubble === "invite_UI" && (
        <div className="invite_message_container">
        <h5 className="send_request_header" onClick={() => { setInviteFriend("invite_friend_party"), setMinimizeInviteUI(false)}}>Send Request</h5>
        <hr className="request_divider"/>
        <h5 className="cancel_request_header">Cancel Request</h5>
        <FontAwesomeIcon icon={faMessage} className="invite_chat_UI"></FontAwesomeIcon>
        </div>
      )}
      <div className="invite_slots_2"><FontAwesomeIcon icon={faUser} className="fa-user"></FontAwesomeIcon><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon><h5 className="invite_header">Invite</h5><FontAwesomeIcon icon={faAngleRight} className="fa-angle-right"></FontAwesomeIcon></div>
      <div className="invite_slots_3"><FontAwesomeIcon icon={faUser} className="fa-user"></FontAwesomeIcon><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon><h5 className="invite_header">Invite</h5><FontAwesomeIcon icon={faAngleRight} className="fa-angle-right"></FontAwesomeIcon></div>
      <div className="invite_slots_4"><FontAwesomeIcon icon={faUser} className="fa-user"></FontAwesomeIcon><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon><h5 className="invite_header">Invite</h5><FontAwesomeIcon icon={faAngleRight} className="fa-angle-right"></FontAwesomeIcon></div>
      </div>
    )}

   {inviteFriend === "invite_friend_party" && !MinimizedInviteUI &&  (
          <div className="friend_container">
          <h6 className="select_friend_header">Select a friend to invite to your party:</h6>
          
          {Array.isArray(friends) && (
          friends.map((friend, index) => (
            <Fragment key={index}>
            <h6 className="friend_container_header" onClick={() => PartyRequestInvitation(friend)}>{friend}</h6>
          {PartyRequestSent && PartyRequestSent?.status === "Success" && PartyRequestSent?.to === friend && (
            <div className="party_invite_container"><h6 className="party_request_sent">Party Request has been sent to you by: {friend}</h6>
            </div>
          )}
          </Fragment>
            ))
            )}
            <button type="button" className="close_friend_request" onClick={() => setMinimizeInviteUI(true)}>Close</button> 
            </div>
        )}
    {ReceivedPartyRequest?.from && !ClearPartyRequest && (
      <div className="received_invite_container"><i className="fa-sharp fa-solid fa-sparkles"></i><i className="fa-sharp fa-solid fa-sparkles sparkles-2"></i>
      <h6 className="received_request_header"><strong className="bold_request_header">{ReceivedPartyRequest.from}</strong> invited you to a party</h6>
      <button type="button" className="accept_party_request" onClick={() => { HandleAcceptPartyRequest(), setClearPartyRequest(true)}}>Accept</button>
      <button type="button" className="decline_party_request">Decline</button>
      </div>
     )}

    {ClearPartyRequest && (
     <div className="clear_accept_party"></div>
    )}


     
    {MinimizedPartyUI && (
        <div className="minimized_panel" onClick={() => setMinimizedParty(false)}>
        <FontAwesomeIcon icon={faAngleUp} className="fa-angle-up"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faAngleUp} className="fa-angle-up-2"></FontAwesomeIcon>
        </div>
      )}

    {ServerRoom === "server" && !MinimizeServerPanel && (
    <div className="server_room">
    <FontAwesomeIcon icon={faXmark} className="minimize_server" onClick={() => setMinimizeServerPanel(true)}></FontAwesomeIcon>
    <h5 className="server_title">Server Room</h5>
    <div className="server_panel" onClick={() => setRoomPanel("room_code")}><h6 className="server_leader">{username}'s Room</h6>
    {roomPanel === "room_code" && (
      <div className="room_code_container">
        <input type="text" className="roomCode_field" placeholder="Enter room code"></input>
      </div>
    )}
    <div className="server_panel_2"><h6 className="server_leader">{username}'s Room</h6></div>
    <div className="server_panel_3"><h6 className="server_leader">Room</h6></div>
     <div className="server_panel_4"><h6 className="server_leader">Room</h6></div>
    </div>
    </div>
    )}

    {MissionBoard === "mission_board_UI" && (
      <div className="mission_board_container"> 
      <h3 className="objective_board_title">COMING SOON</h3> 
      <input type="checkbox" className="mission_checkbox"></input>
      </div>
    )}

    {FriendsPanel === "friend_UI" && !MinimizeFriendPanel &&(
    <div className="friend_request">
    <h5 className="friends_request_header">Friend Requests</h5>
    <FontAwesomeIcon icon={faX} className="fa-X" onClick={() => setMinimizeFriendPanel(true)}></FontAwesomeIcon>
    <input type="text" className="search_bar" value={targetUsername} onChange={(e) => setTargetUsername(e.target.value)} placeholder="Enter the username"></input>
    <button type="submit" className="send_friend_request" onClick={() => sendFriendRequest()}>Send Request</button>

    {RequestFriend && RequestFriend.status === "success" && (
      <div className="notify_request_board"><FontAwesomeIcon icon={faPaperPlane} className="fa-paper-plane"></FontAwesomeIcon><h6 className="friend_sent_header"> Request sent to: {targetUsername}</h6>
      </div>
    )}
    <div className="active_tab_divider">
    <label htmlFor="friends" className="active_friend_list">Active</label>
      <div className="real_friend_list">
      {friends && (
      friends.map((friend, index) => (
      <h6 key={index} className="real_friend">{friend}</h6>
      ))
      )}
      </div>
    </div>
     <div className="request_tab_divider">
    <label htmlFor="friends" className="request_friend_list">Requests</label>
    {ReceivedFriendRequest && (
          <div className="accept_container">
    <h6 className="from_friend_list">{ReceivedFriendRequest.from}</h6>
    <h6 className="accept_button" onClick={() => Accepting_Requests()}>Accept |</h6><h6 className="decline_button">Decline</h6>
    </div>
    )}
    </div>
      {AcceptFriendRequest && AcceptFriendRequest.status === "Accepted" && (
      <div className="friend_tab_divider">
    <h6 className="friend">{AcceptFriendRequest.with}</h6>
    </div>
    )}

    {FriendStatus && FriendStatus.acceptedBy && ( 
      <div className="friend_list_divider">
      <h6 className="friend_ship">{FriendStatus.acceptedBy}</h6>
      </div>
    )}
    </div>
    )}
    </>
    )}
    {onscreen === "GameRoom" && <MainGame username={username} socket={socket} players={unoparty?.players || []} roomCode={unoparty?.roomCode} initialGameState={initialGameState} />}
    {UnoStore === "StoreFront" && <UNOStore username={username}  socket={socket}/>}
    </>
  )
}
export default MainLobby