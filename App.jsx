
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck

} from "@fortawesome/free-solid-svg-icons";
import { io } from 'socket.io-client';

import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";

import './App.css'

import Scribble from "./assets/scribble.svg?react";
import ArrowDown from "./assets/arrow_down.svg?react";
import Ribbon from "./assets/ribbon.svg?react";
import Sparkle from "./assets/sparkle.svg?react";

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
    <h3 className="main_title">UNO<br />
      <span>PARTY</span><br />
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

        <ArrowDown className="arrow_content" /><h1 className="scroll_for_more">Scroll Down For Extra Content</h1>
        <Scribble className="scribble"/>

        <div className="news_layout">
        <hr className="news_line"></hr>
        <h1 className="news_header">NEWS</h1>
        <hr className="news_line_2"></hr>
        <div className="feature_spotlight">
        <h1 className="spotlight_header">FEATURE SPOTLIGHT</h1>
        <h1 className="seperate_game">SEPERATE GAME MODES</h1>
        <h1 className="coming_soon">COMING SOON!</h1>
        <button type="button" className="learn_more">LEARN MORE</button>
        </div>
        <div className="patch_container">
        <h1 className="patch_notes">🎉PATCH NOTES 🎉</h1>
          <h1 className="latest_news">Latest News:</h1>
          <ul className="version_revision">
          <li>v1.0 Releasing in December 2026</li>
          <li>UI Improvements</li>
          <li>Integration of seperate game modes</li>
          </ul>
        </div>
        <div className="news_feed">
           <h1 className="newsfeed_header">NEWS FEED</h1>
           <h1 className="view_all_news">VIEW ALL NEWS </h1>
        <div className="news_container"></div>
        <div className="news_container2"></div>
        <div className="news_container3"></div>
        <div className="news_container4"></div>
        </div>
        </div>

        <div className="road_map_layout">
        <Ribbon className="road_ribbon" />
        <i className="fa-solid fa-star"></i>
          <h1 className="road_map">ROADMAP</h1>
          <div className="road_circle"></div>
          <hr className="road_tracker"></hr>
          <hr className="road_tracker2"></hr>
          <hr className="road_tracker3"></hr>
           <div className="road_circle2"></div>
          <div className="phase_1">
            <h1 className="phase_1_header">PHASE 1</h1>
            <p className="phase_1_notes">Account System Integration<br></br>Friend List & Invites<br></br>Class UNO Game In-Progress<br></br>Daily Missions In-Progress</p>
          </div>

          
          <div className="phase_circle">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="phase_2">
             <h1 className="phase_2_header">PHASE 2</h1>
          <div className="phase_2_banner">
            <h1 className="expect_phase_2">EXPECTED 2027</h1></div>
          </div>

             <div className="phase_circle2">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
           <div className="phase_3">
             <h1 className="phase_3_header">PHASE 3</h1>
          </div>

          <div className="social_media_container">
          <h1 className="social">Its a community, Thank you for being apart of it! |     Stay Updated here: <a href="https://discord.gg/G4zWzJGVr"></a><i className="fa-brands fa-discord"></i>  | Roadmaps are suspected to change based off suggestions & feedback.</h1>
          </div>
        <Sparkle className="sparkle_1" />
        <Sparkle className="sparkle_2" />
        </div>

        <footer className="signature"> Privacy Terms & Service | 2026 @UNO Party Online v.1 | Created by Tyree Black</footer>
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