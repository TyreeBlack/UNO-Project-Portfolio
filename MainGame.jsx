import { useState, useEffect, useRef } from 'react';
import { useDragAndDrop } from "./DragAndDrop";

import YourCooked from './assets/hand_on_shoulder.png';
import GameSoundTrack from './assets/Gaming Sountrack.mp3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown
}
from "@fortawesome/free-solid-svg-icons";

import './MainGame.css'
import UserInitialIcon  from './UserInitialIcon';

function MainGame({username, players, socket, roomCode, initialGameState}) {
    
    console.log("Main Game Player: ", username);
    console.log("Main Game Roomcode: ", roomCode);

    const [gameState, setGameState] = useState(initialGameState || null);
 
    const {handleDragCard, handleDragEnter, handleDragOver, handleDragEnd} = useDragAndDrop(onDrop);

    const [XPBoard, setXPBoard] = useState(null);
    const [MinimizeXPBoard, setMinimizeXPBoard] = useState(false);
    const [ReturnLobby, setReturnLobby] = useState(null);

    const [PlayerTurn, setPlayerTurn] = useState(false);

    const [onCardAnimation] = useState(true);
    const [isCardRevealed, setCardRevealed] = useState(false);

    const [ColorWheel, setColorWheel] = useState(false);
    const [HandOnShoulderMeme, setHandOnShoulderMeme] = useState(false);

    const [Winner, setWinner] = useState(null);



function MyGameSound() {
    const audioRef = useRef(null);

useEffect(() => {
    const unlockAudio = () => {
        if(audioRef.current) {
           audioRef.current.play();
        }
        document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
}, []);
return (
    <>
    <audio ref={audioRef} autoPlay loop src={GameSoundTrack}></audio>
    </>
  );
}

function SpecialDraw4Moment() {
    return (
        <img src={YourCooked} alt="hand_on_shoulder" />
    )
}

useEffect(() => {
    const StartHandler = ({gameState, players}) => {
        setGameState(gameState);
        setPlayers(players);
    };

    const UpdateGameHandler = (state) => {
        setGameState(state);
    if(state.colorSelectionPending && state.colorSelector === username) {
        setColorWheel(true);
    }
    else {
        setColorWheel(false);
    }
    };

    const ColorHandler = (colorSelection) => {
        setGameState(prev => ({
            ...prev,
            activeColor: colorSelection.activeColor
        }));
        };
        
    const GameOver = (gameEnded) => {
        console.log("Winner of the game is: ", gameEnded);
        setWinner(gameEnded.winner);
       };

    socket.on("start_game", StartHandler);
    socket.on("update_game_state", UpdateGameHandler);
    socket.on("updated_game_state", ColorHandler);
    socket.on("game_over", GameOver);
    
    
    return () => {
        socket.off("start_game", StartHandler);
        socket.off("update_game_state", UpdateGameHandler);
        socket.off("updated_game_state", ColorHandler);
        socket.off("game_over", GameOver);
    };
    },[username]);

    useEffect(() => {
    if(gameState) {
        setPlayerTurn(gameState?.turnLogic);
    }
    },[gameState]);

    useEffect(() => {
    if (gameState) {
        const timer = setTimeout(() => {
            setCardRevealed(true);
        }, 2000);
    return () => clearTimeout(timer);
    }
    }, []);

    function onDrop(from, to) {  // from: handles where the card is dragged from, to: handles where the card is dropped; 
    if(to !== "starting_deck") return;
    console.log("Emitting from: ", from);
    socket.emit("playing_card", roomCode, from);
    console.log("Dropped Card: ", from);
    console.log("Dropped onto deck: ", to);
    console.log("gameState:", gameState);
    console.log("PlayHands", gameState?.PlayHands);
    console.log("username:", username);
    console.log("Players: ", players);
    console.log("Current Card:", gameState?.currentCard);
    console.log("Active Color: ", gameState?.activeColor);
    console.log("Hand:", gameState?.PlayHands?.[username]);
    console.log("turn logic: ", gameState?.turnLogic);
    console.log("Active Player: ", players?.[gameState?.turnLogic]);
    }

    function HandleDrawCard() {
        socket.emit("playing_card", roomCode, null);  
        console.log("Card has been drawn from the deck");
    }

    const activePlayer = players?.[gameState?.turnLogic];

    return (
    <>
    <MyGameSound />
    <div className="gaming_table">
    <div className="uno_stack">
    <h1 className="UNO_Title">UNO</h1>
    <div className="UNO_circle"></div>
     </div>
    <div className="uno_stack_2">
    <h1 className="UNO_Title_2">UNO</h1>
    <div className="UNO_circle_2"></div>
    </div>
     <div className="uno_stack_3">
    <h1 className="UNO_Title_3">UNO</h1>
    <div className="UNO_circle_3"></div>
    </div>
       <div className="uno_stack_4">
    <h1 className="UNO_Title_4">UNO</h1>
    <div className="UNO_circle_4"></div>
    </div>

    <div className="uno_stack_5">
    <h1 className="UNO_Title_5">UNO</h1>
    <div className="UNO_circle_5"></div>
    </div>

     <div className="uno_stack_6" onClick={() => HandleDrawCard()}>
    <h1 className="UNO_Title_6">UNO</h1>
    <div className="UNO_circle_6"></div>
    </div>

    {gameState && (
    <div className="player_container">

    <div className="player_icon_top">
    <div className={players[2] === activePlayer ? "indicate_glow" : ""}>
    <UserInitialIcon username={players[2]}/>
    </div>
    </div>

    <div className="player_icon_left"> 
    <div className={players[3] === activePlayer ? "indicate_glow" : ""}>
    <UserInitialIcon username={players[3]}/>
    </div>
    </div>

    <div className="player_icon_right">
    <div className={players[1] === activePlayer ? "indicate_glow" : ""}>
    <UserInitialIcon username={players[1]}/>
    </div>
    </div>

    <div className="player_icon_bottom"> 
    <div className={players[0] === activePlayer ? "indicate_glow" : ""}>
    <UserInitialIcon username={players[0]}/>
    </div>
    </div>
    </div>
    )}

    <div onDragOver={(e) => handleDragOver(e)}
    onDragEnter={() => { console.log("Card has enter drop zone"); handleDragEnter("starting_deck")}}
    className="starting_deck">
     {gameState?.currentCard && (
    <div className={`play_card ${gameState.currentCard.color}`}>
    <h1 className="play_number">{gameState.currentCard.name}</h1>
    <h1 className="main_number">{gameState.currentCard.name}</h1>
    <h1 className="secondary_number">{gameState.currentCard.name}</h1>
    <div className="play_circle"></div>
    </div>
       )}   
    </div>
    <button type="submit" className="UNO_Button" onClick={() => { setXPBoard("XP"), setWinner(gameEnded.winner)}}>UNO!</button>
    </div>


    {XPBoard === "XP" && !MinimizeXPBoard && (

    <div className="XP_Board_Container">
    <div className="victory_banner">
     <h1 className="victory"><span>V</span>
                            <span>I</span>
                            <span>C</span>
                            <span>T</span>
                            <span>O</span>
                            <span>R</span>
                            <span>Y</span>
                            <span>!</span></h1>
    </div>
    <div className="won_banner">
    <h1 className="winner">YOU WON!</h1>
    </div>
    <h6 className="player_progress">Player Progress</h6>
    <FontAwesomeIcon icon={faCaretDown} className="fa-caret" onClick={() => setMinimizeXPBoard(true)}></FontAwesomeIcon>
    <i class="fa-sharp fa-solid fa-stars"></i>
     <i class="fa-sharp fa-solid fa-star"></i>
    <h6 className="level">Level:</h6>
    <i class="fa-duotone fa-regular fa-minus"></i>
    <h6 className="games_played">Games Played:</h6>
    <h6 className="win_streak">Win Streak:</h6>
    <i class="fa-duotone fa-solid fa-fire-flame-curved"></i>
    <h6 className="xp_earned">XP Earned:</h6>
    <h6 className="credits_earned">Credits Earned:</h6>
    <button type="button" className="Return" onClick={() => setReturnLobby("lobby")}>RETURN</button>
    <button type="button" className="play_again">PLAY AGAIN</button>
    </div>
    )}
    
    <div className="player_zone">
    <h4>Player Zone</h4>
    {isCardRevealed && (
    <div className="players_cards">
    {gameState?.PlayHands[username]?.map((items) => (
    <div key={items.id} className={`render_cards ${items.color}`} 
    onDragStart={() => {
    console.log("Drag Begin: ", items); handleDragCard(items)}} draggable="true" onDragEnd={() => handleDragEnd()}>
    {items.name !== "skip" && items.name !== "reverse" && (
     <h2 className="render_header">{items.name}</h2>
    )}
    {items.name !== "skip" && items.name !== "reverse" && (
    <div className="render_circle"></div>
    )}

    {
    items.name === "+4" &&  (
    <>
     <h2 className="Draw_Special_Card">+4</h2> 
       <div className="special_circle"></div>
       <div className="draw_4_logo_blue"></div>
       <div className="draw_4_logo_red"></div>
       <div className="draw_4_logo_green"></div>
       <div className="draw_4_logo_yellow"></div>
    </>
    )}
    {HandOnShoulderMeme && (
        <img src={YourCooked}/>
    )}
    {
    items.name === "skip" && (
     <>
     <div className="skip_icon">
     <i className="fa-sharp fa-solid fa-ban"></i></div>
     <div className={`skip_circle ${items.name === "skip" ? "skip_circle" : ""}`}></div>
     <div className="skip_secondary_icon"><i class="fa-sharp fa-solid fa-ban"></i></div>
     <div className="skip_third_icon"><i class="fa-sharp fa-solid fa-ban "></i></div>
     </>
    )}

    {items.name === "reverse" && (
        <>
        <div className="reverse_icon">
        <i className="fa-sharp fa-solid fa-rotate-reverse"></i></div>
        <div className={`reverse_circle ${items.name === "reverse" ? "reverse_circle" : ""}`}></div>
        <div className="reverse_secondary_icon"><i className="fa-sharp fa-solid fa-rotate-reverse"></i></div>
        <div className="reverse_third_icon"><i className="fa-sharp fa-solid fa-rotate-reverse"></i></div>
        </>
    )}
    </div>
    ))}
    </div>
    )}

   {!isCardRevealed && (
    <div className="card_animation">
    <div className="card_animation_one" >
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>
    

    <div className="card_animation_two">
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>

     <div className="card_animation_three" >
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>

    <div className="card_animation_four">
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>

    <div className="card_animation_five">
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>

    <div className="card_animation_six">
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>

    <div className="card_animation_seven">
    <div className="card-animation-circle"></div>
    <h4 className="card_uno_title">UNO</h4>
    </div>
    </div>
    )}
    </div>

    {ColorWheel && (
    <div className="color_selector">
    <h6 className="color_header">Select a color of your choice: </h6>
    <div className="color_wild">
    <div className="wedge_red" onClick={() => { socket.emit("color_selector", roomCode, "red"); setColorWheel(false)}}></div>
    <div className="wedge_blue" onClick={() => { socket.emit("color_selector", roomCode, "blue"); setColorWheel(false)}}></div>
    <div className="wedge_yellow" onClick={() => { socket.emit("color_selector", roomCode, "yellow"); setColorWheel(false)}}></div>
    <div className="wedge_green" onClick={() => { socket.emit("color_selector", roomCode, "green"); setColorWheel(false)}}></div>
    </div>
    </div>
     )}
    
    </>
    )

}

export default MainGame