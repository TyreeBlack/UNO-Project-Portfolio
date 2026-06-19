
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck} from "@fortawesome/free-solid-svg-icons";
import { io } from 'socket.io-client';

import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";

import './App.css'
import MainLobby from "./MainLobby"; 
import UNOStore from "./UNOStore";
import Profile from "./Profile";

const socket = io("http://localhost:3001"); // connects to the server_side.js file

// listens for the connection event from the server side
socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

function App() { 
  const [count, setCount] = useState(0)

  const[friends, SaveFriends] = useState([]);

  const [username, setUserName] = useState(() => {
    return localStorage.getItem("username") || "";  // stores the username in a presistence storage for data retentio
  });


  useEffect(() => {
   if (username) {
     // set the local storage as string data
   localStorage.setItem("username", username);
   }

  }, [username]);


  useEffect(() => {
   if (username) {
    RegisterID(username);


  socket.emit("get_friends", username, (friendList) => {
    SaveFriends(friendList);
  });
   }
  }, []);

  function RegisterID(username) {
     socket.emit("register", username);
  }

  return (
    <>
    <div className="color_wheel">
    </div>
    <h3>UNO<br />
      PARTY<br />
      ONLINE</h3>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
            <div className="ROE">
        <h1 className="rules_title">ROE</h1>
        <ul className="list_of_engagements">
        <li><FontAwesomeIcon icon={faCheck} className="check"></FontAwesomeIcon>Setup: Deal 7 cards to each player, turn one card up to start the discard pile, and place the rest face-down to draw.</li><br></br>
        <li><FontAwesomeIcon icon={faCheck} className="check"></FontAwesomeIcon>Matching: Match color, number, or symbol (Action cards).</li><br></br>
        <li><FontAwesomeIcon icon={faCheck} className="check"></FontAwesomeIcon>Draw Rule: If you cannot play, you must draw one card. If it is playable, you may play it immediately; otherwise, turn passes.</li><br></br>
        <li><FontAwesomeIcon icon={faCheck} className="check"></FontAwesomeIcon>UNO Penalty: When down to one card, you must press the button that will say "UNO!" If caught by another player before the next person begins their turn, you must draw 2 cards.</li>
        </ul>
        <label htmlFor="username" className="username_header">Enter username:</label>
        <input type="text" className="input_field" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter username here" required={true}></input>      
        <label htmlFor="password" className="password_header">Create a password:</label>
        <input type="password" className="password_field" name="password_value" placeholder="Ingnore this for now" required={true}></input>
        <NavLink to="/MainLobby" end><button type="submit" className="create-account" onClick={() => RegisterID(username)}>Create Account</button></NavLink>
        </div>
         <div className="UNO_Card">
        <h2>UNO</h2>
        <div className="circle"></div>
        </div>

        <div className="UNO_Card2">
        <h2 className="UNO_Title2">UNO</h2>
        <div className="circle_2"></div>
        </div>


        <div className="UNO_Card3">
        <h2 className="UNO_Title3">UNO</h2>
        <div className="circle_3"></div>
        </div>
        </>}
        />
        <Route path="/MainLobby" element={<MainLobby username={username} socket={socket} friends={friends} />} />
        <Route path="/UNOStore" element={<UNOStore username={username} socket={socket} friends={friends} />} />
        <Route path="/Profile" element={<Profile username={username} socket={socket} friends={friends} />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App