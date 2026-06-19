const http = require("http");
const { Server } = require("socket.io"); // importing the socket.io module 
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
     }
  });

const UserMapID = new Map(); // a user map for storing connections
const party_rooms = {}; // mutuable object for storing key pairs
const stored_friends = {};
const stored_inventory = {};

 card_deck = [ 
        {id: 1, color: "green", name: 6, description: "UNO Green Card"},
        {id: 2, color: "red",  name: 2, description: "UNO Red Card"},
        {id: 3, color: "yellow", name: 3, description: "UNO Yellow Card"},
        {id: 4, color: "blue", name: 4, description: "UNO Blue Card"},
        {id: 5, color: "black", name:"+4", description: "Draw 4 UNO Card"},
        {id: 6, color: "green", name: 5, description: "UNO Green Card"},
        {id: 7, color: "red", name: 6, description: "UNO Red Card"},
        {id: 8, color: "yellow", name: 7, description: "UNO Yellow Card"},
        {id: 9, color: "blue", name: 8, description: "UNO Blue Card"},
        {id: 10, color: "green", name: 1, description: "UNO Red Card"},

        {id: 11, color: "blue", name: 2, description: "UNO Blue Card"},
        {id: 12, color: "red", name: "+2", description: "Draw 2 UNO Card"},
        {id: 13, color: "green", name: 3, description: "UNO Green Card"},
        {id: 14, color: "yellow", name: 4, description: "UNO Yellow Card"},
        {id: 15, color: "green", name: "+2", description: "Draw 2 UNO Card"},
        {id: 16, color: "red", name: 5, description: "UNO Red Card"},
        {id: 17, color: "blue", name: 6, description: "UNO Blue Card"},

        {id: 18, color: "yellow", name: "+2", description: "Draw 2 UNO Card"},
        {id: 19, color: "blue", name: "+2", description: "Draw 2 UNO Card"},
        {id: 20, color: "red", name: 1, description: "UNO Red Card"},
        {id: 21, color: "green", name: 2, description: "Uno Green Card"},
        {id: 22, color: "yellow", name: 3, description: "UNO Yellow Card"},
        {id: 23, color: "red", name: "skip", description: "UNO Skip Card"},
        {id: 24, color: "blue", name: "skip", description: "UNO Skip Card"},

        {id: 25, color: "green", name: 4, description: "UNO Green Card"},
        {id: 26, color: "yellow", name: "reverse", description: "UNO Reverse Card"},
        {id: 27, color: "red", name: 7, description: "UNO Red Card"},
        {id: 28, color: "green", name: 6, description: "UNO Green Card"},
        {id: 29, color: "green", name: "skip", description: "UNO Skip Card"},
        {id: 30, color: "yellow", name: "skip", description: "UNO Skip Card"},
        {id: 31, color: "yellow", name: 5, description: "UNO Yellow Card"},

        {id: 32, color: "blue", name: "reverse", description: "UNO Reverse Card"},
        {id: 33, color: "green", name: "reverse", description: "UNO Reverse Card"}
        ];

function generatePartyRoomCode(username) {
    let partycode;

    do {
        // generates a randomize code between 1000 and 9000
        partycode = Math.floor(1000 + Math.random() * 9000).toString();
    }
    while (party_rooms[partycode]);

    // inserting data into the array object 
    party_rooms[partycode] = {
        host: username,
        players: [username],
        maxPlayers: 4,
        roomCode: partycode,

    gameState: {
        turnLogic: 0,
        direction: 1,
        currentCard: null,
        activeColor: null,     
        chosenColor: null,
        reverseAnimation: null,
        colorSelectionPending: false,
        colorSelector: null,
        pendingSpecialFour: false,
        discardPile: [],
        deck: [],
        PlayHands: {},
        start: false,
        winCondition: false,
        winner: null
      }
    };
    return partycode;
}

// connection handler for the server connection
io.on("connection", (socket) => { 
    console.log("User is connected: ", socket.id); // prints the socket identifier to the console

socket.on("create_party", (username, cb) => {

    const roomCode = generatePartyRoomCode(username);
    socket.roomCode = roomCode;
    socket.join(roomCode);
    cb(party_rooms[roomCode]);

    socket.emit("joined the party!", party_rooms[roomCode]);
   });

socket.on("register", (username) => {
    UserMapID.set(username, socket.id);
    socket.username = username; // assigns the user to the socket instance
    console.log(`Mapped the user ${username} to ${socket.id}`);
}); 

socket.on('disconnect', () => {
    // finds the username by the socket.id and removes it 
    UserMapID.delete(socket.username);
 });


socket.on("send_request", (targetUsername, received_request) => {
    console.log("Friend Request sent from: ", socket.username, "to", targetUsername);

    // sends the friend request to the username mapped from the socket identifier
    const targetSocketID = UserMapID.get(targetUsername);
if (targetSocketID) {
    io.to(targetSocketID).emit('receive_friend_request', {
        from: socket.username
    });

    if (received_request) received_request({status: "success"});
}  else {

    if (received_request) received_request({status: "Error", message: "User could not be found or offline"});
}

})

socket.on("accept_request", (username, targetUsername, request_callback) => {

    // initalizes arrays for both users
    stored_friends[username] = stored_friends[username] || [];
    stored_friends[targetUsername] = stored_friends[targetUsername] || [];

    // checks for dulplicates if the users already have each other added
    if(!stored_friends[targetUsername].includes(username)) {
         stored_friends[targetUsername].push(username);
    }

    if(!stored_friends[username].includes(targetUsername)) {
        stored_friends[username].push(targetUsername);
    }

    // checks if a function exists and calls it
    if(typeof request_callback === "function") {
        request_callback({
            status: "Accepted",
            with: username
        });
    }

    console.log(`Status: Accepted[*] ${targetUsername} has accepted friend request from ${username}`);

    const SenderID = UserMapID.get(username);

    if(SenderID) {
    io.to(SenderID).emit("friend_status", {
        acceptedBy: targetUsername
    });
    console.log(`Notification Sent: you and ${username} are now friends.`);
    }
    else {
        console.log(`Notification could not be sent to : ${username}, user may be offline. `);
    }
})

socket.on("party_request", (targetUsername, party_sent) => {

    const PartySender = socket.username;
    const PartyRequestID = UserMapID.get(targetUsername);
    console.log(`Hello ${targetUsername}, ${PartySender} has sent you a request to join their party`);
    if(PartyRequestID) {
        io.to(PartyRequestID).emit("party_sent_invitation", {
            from: PartySender,
            roomCode: socket.roomCode,
            to: targetUsername
        });

    if (party_sent) party_sent({status: "Success"});
    } 
    else {
        if (party_sent) party_sent({status: "Error", message: "The user could not be found or they are not online"});
    }

});

socket.on("accepting_party_requests", (roomCode, getparty) => {

    socket.join(roomCode);
    socket.roomCode = roomCode;

    // checks if the room exists
    if (party_rooms.hasOwnProperty(roomCode)) {

    if(!party_rooms[roomCode].players.includes(socket.username)) { // prevents dulplicates 
        party_rooms[roomCode].players.push(socket.username); // adds the player to the party room
      }
    io.to(roomCode).emit("accepting_party_request", {
        roomCode: roomCode,
        PlayerSlot: party_rooms[roomCode].players
    });
    if (getparty) getparty({status: "Accepted Invite!",
                            players: party_rooms[roomCode].players
    });
    }
    else {
        if (getparty) getparty({status: "Error", message: "User could not be found or they are not online"});
    }
});

// stores a get event for maintaining the friend list
socket.on("get_friends", (username, save_friends) => {
    save_friends(stored_friends[username] || []);
})


socket.on("start_game",  (roomCode, roomFull) => {
    const party_room = party_rooms[roomCode];

     if (!party_room) {
        console.log("Checking if room exists:", party_room);
        return;
    }
    const currentPlayers = party_room.players.length;
    const maxPlayers = party_room.maxPlayers;

  
    // compares the length of players to the room
    if(currentPlayers < maxPlayers) {
        console.log("\n[*] Waiting for more players to join the party.");

    if(roomFull) {
        roomFull({
            status: `Player Capacity Needed: ${currentPlayers}/${maxPlayers}`, 
            maxPlayers:  maxPlayers,
            currentPlayers: currentPlayers
        });
        return;   
      }
    
    } 

    let deck =  [
        {id: 1, color: "green", name: 6, description: "UNO Green Card"},
        {id: 2, color: "red",  name: 2, description: "UNO Red Card"},
        {id: 3, color: "yellow", name: 3, description: "UNO Yellow Card"},
        {id: 4, color: "blue", name: 4, description: "UNO Blue Card"},
        {id: 5, color: "black", name:"+4", description: "Draw 4 UNO Card"},
        {id: 6, color: "green", name: 5, description: "UNO Green Card"},
        {id: 7, color: "red", name: 6, description: "UNO Red Card"},
        {id: 8, color: "yellow", name: 7, description: "UNO Yellow Card"},
        {id: 9, color: "blue", name: 8, description: "UNO Blue Card"},
        {id: 10, color: "green", name: 1, description: "UNO Red Card"},

        {id: 11, color: "blue", name: 2, description: "UNO Blue Card"},
        {id: 12, color: "red", name: "+2", description: "Draw 2 UNO Card"},
        {id: 13, color: "green", name: 3, description: "UNO Green Card"},
        {id: 14, color: "yellow", name: 4, description: "UNO Yellow Card"},
        {id: 15, color: "green", name: "+2", description: "Draw 2 UNO Card"},
        {id: 16, color: "red", name: 5, description: "UNO Red Card"},
        {id: 17, color: "blue", name: 6, description: "UNO Blue Card"},

        {id: 18, color: "yellow", name: "+2", description: "Draw 2 UNO Card"},
        {id: 19, color: "blue", name: "+2", description: "Draw 2 UNO Card"},
        {id: 20, color: "red", name: 1, description: "UNO Red Card"},
        {id: 21, color: "green", name: 2, description: "Uno Green Card"},
        {id: 22, color: "yellow", name: 3, description: "UNO Yellow Card"},
        {id: 23, color: "red", name: "skip", description: "UNO Skip Card"},
        {id: 24, color: "blue", name: "skip", description: "UNO Skip Card"},

        {id: 25, color: "green", name: 4, description: "UNO Green Card"},
        {id: 26, color: "yellow", name: "reverse", description: "UNO Reverse Card"},
        {id: 27, color: "red", name: 7, description: "UNO Red Card"},
        {id: 28, color: "green", name: 6, description: "UNO Green Card"},
        {id: 29, color: "green", name: "skip", description: "UNO Skip Card"},
        {id: 30, color: "yellow", name: "skip", description: "UNO Skip Card"},
        {id: 31, color: "yellow", name: 5, description: "UNO Yellow Card"},

        {id: 32, color: "blue", name: "reverse", description: "UNO Reverse Card"},
        {id: 33, color: "green", name: "reverse", description: "UNO Reverse Card"}
        ];

        // shuffles the cards from the server-side 
        for(let i = deck.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
        }

        // handles the deck for giving user's their cards
        party_room.players.forEach(username => {
            party_room.gameState.PlayHands[username] = deck.splice(0, 8);
        });
        party_room.gameState.currentCard = deck.shift(); // defines the top card as the starter card
        party_room.gameState.activeColor = party_room.gameState.currentCard.color; 
        party_room.gameState.deck = deck; // the rest of the cards will go towards the deck
        party_room.gameState.start = true;

        console.log("Server attempting to emit start_game: *", roomCode, party_room.gameState);
        io.to(roomCode).emit("start_game", {
            gameState: party_room.gameState,
            players: party_room.players
        });
   });



   socket.on("playing_card", (roomCode, cardPlayed) => {
    console.log("Playing Card Event Fired.");
    console.log("From:", socket.username);

    console.log("Room Code", roomCode);
    console.log("Room Object: ", party_rooms[roomCode]);
    
    const room = party_rooms[roomCode];
    if(!room) return;
    
    const state = room.gameState;
    console.log("Checkpoint 1");

    console.log("username: ", socket.username);
    console.log("card played: ", cardPlayed);
    console.log("Play Hands: ", Object.keys(state.PlayHands));
    console.log("The Player Hand: ", state.PlayHands[socket.username]);

    if (state.winCondition) {
    return;
    }
    console.log("Checkpoint 2");

    const players = room.players;

    if(!players || !players[state.turnLogic]) {
        console.log("Error: You are not the active player. Not your turn");
        return;
    }
    console.log("Checkpoint 3");

    console.log("Before Card Turn Update: ", state.turnLogic);

    const currentPlayer = players[state.turnLogic];

    console.log("After Card Turn Update: ", state.turnLogic);
    console.log("The Next Active Player: ", players[state.turnLogic]);

 // handling if deck is empty
    const checkDeckPile = (state) => {
         if(state.deck.length === 0) {
            const firstCard = state.discardPile.pop();

    // moves everything to the new deck pile and shuffles
    const newDeckPile = [...state.discardPile];
    for( let i = newDeckPile.length - 1; i > 0; --i) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newDeckPile[i], newDeckPile[randomIndex]] = [newDeckPile[randomIndex], newDeckPile[i]];
    }

    state.deck = newDeckPile;

     // places the top card back so that the game continues
        state.discardPile = [firstCard];
        console.log("\n*Deck is empty. Reshuffling the discard pile into the draw pile. *");
      }
    }

    console.log("Players:", players);
    console.log("TurnLogic: ", state.turnLogic);
    console.log("Live Player: ", players[state.turnLogic]);
    console.log("Username:", socket.username);
    console.log("Card Direction: ", state.direction);

 // validates only if the current player has a turn
if(socket.username !== currentPlayer) {
console.log("Turn not completed: Not this player's turn.");
return;
} 
console.log("Checkpoint 4");

// handling drawing card logic if player doesn't have the corresponding item needed
  if(!cardPlayed) {
    checkDeckPile(state);
    const drawnCard = state.deck.shift();
   
if(!drawnCard) {
    console.log("Error Log: Player Deck is undefined.");
    return;
}
 state.PlayHands[socket.username].push(drawnCard);

const cantPlayCard = drawnCard.color === state.activeColor ||
                       drawnCard.name === state.currentCard.name ||
                       drawnCard.color === "black";
 if(!cantPlayCard) {
    state.turnLogic = (state.turnLogic + state.direction + room.players.length) % room.players.length;
 }

return io.to(roomCode).emit("update_game_state", state);
}

console.log("Player: ", players);
console.log("turnLogic: ", state.turnLogic);
console.log("Current Player: ", currentPlayer);
console.log("socket username: ", socket.username);
console.log("roomcode: ", roomCode);


    // validates the incoming card
    if(!cardPlayed || !cardPlayed.id) {
        console.log("Invalid Card being played: ", cardPlayed);
        return;
    }
    console.log("Checkpoint 5");

    if(!state.PlayHands[socket.username]) {
        console.log("No hand was found for the player: ", socket.username);
        return;
    }
    console.log("Checkpoint 6");
    
    // determines if the player has the corresponding card needed
    const hasValidCard = state.PlayHands[socket.username].some(c => c.id === cardPlayed.id);

    // establishing a rule that cards may only match by color or number
    const isMatch =  hasValidCard && (cardPlayed.color === state.activeColor ||
    cardPlayed.name == state.currentCard.name || cardPlayed.color === "black"
    );

    console.log("Active Color:", state.activeColor);
    console.log("Current Card:", state.currentCard);
    console.log("Card Played: ", cardPlayed);
    console.log("Matching Card: ", isMatch);

    if (isMatch) {
        if(cardPlayed.color === "black") {
            state.colorSelectionPending = true;
            state.colorSelector = socket.username;
        if(cardPlayed.name === "+4") {
            state.pendingSpecialFour = true;
        }
        }
        // updating the card deck state
        state.currentCard = cardPlayed;
        state.activeColor = cardPlayed.color;
        state.discardPile.push(cardPlayed);

        console.log("After Current Card is set: ", state.currentCard);
        checkDeckPile(state);

        console.log("Card being played: ", cardPlayed);
        // removes the card from players deck
        state.PlayHands[socket.username] = state.PlayHands[socket.username].filter(c => c.id !== cardPlayed.id);
        console.log("After filter takes place: ", state.PlayHands[socket.username]);
        console.log("Card Length: ", state.PlayHands[socket.username].length);

        if(cardPlayed.color === "black") {
            io.to(roomCode).emit("update_game_state", state);
            console.log("\nPending Color Selection..");
            return;
        }

    // handles functionality for each player's turn wether clockwise or counter-clockwise
    let nextPlayerTurn = (state.turnLogic + state.direction + room.players.length) % room.players.length;
    let nextPlayerID = room.players[nextPlayerTurn];

     // establishing the win condition
    if(state.PlayHands[socket.username] && state.PlayHands[socket.username].length === 0) {
        state.winCondition = true;
        state.winner = socket.username;

        // receives everyone's hand
        io.to(roomCode).emit("update_game_state", state);
        console.log(`${socket.username} has won the game!`);

    setTimeout(() => {
    io.to(roomCode).emit("game_over", {
        winner: socket.username,
        finalPlay: state.PlayHands    
    });
}, 100);
    return;
}

        // handling special card logic
        let skipNext = false;
    if(cardPlayed.name === "skip") {
        skipNext = true;
    }
    else if(cardPlayed.name === "reverse") {
        state.direction *= -1; // reverses the turn order
        if (players.length === 2) skipNext = true;
    return;
    }
    // increments 2 draw cards to the player's hand
    else if(cardPlayed.name === "+2") {
        for(let i = 0; i < 2; ++i) {
            checkDeckPile(state);
            const drawnCard = state.deck.shift();
            state.PlayHands[nextPlayerID].push(drawnCard); // pushes the cards to the player's deck
        }
        skipNext = true;
    }


    // formula for handling the turn logic for each player's consecutive move
    const step = skipNext ? 2 : 1;

    console.log("Current Card Turn: ", state.turnLogic);
    console.log("Direction:", state.direction);
    console.log("Step: ", step);
    console.log("Player's Length: ", players.length);
    state.turnLogic = (state.turnLogic + (state.direction * step) + players.length) % players.length;

    console.log("\nAfter Turn Formula: ", state.turnLogic);
    console.log("\nNext Player in turn: ", players[state.turnLogic]);

    io.to(roomCode).emit("update_game_state", state);
    console.log(`${socket.username} has committed a turn.`);
    console.log("hasValidCard: ", hasValidCard);
    console.log("itsMatch: ", isMatch);
    console.log("Card Played: ", cardPlayed);
    console.log("Current Card Played: ", state.currentCard);
    console.log("Active Color: ", state.activeColor);
    console.log("Player's Hand: ", state.PlayHands[socket.username]);
    }
});

socket.on("color_selector", (roomCode, chosenColor) => {
    const room = party_rooms[roomCode];
    if (!room) return;

    const state = room.gameState;
    // defining the players here
    const players = room.players;

    // check inplace to ensure the correct player uses the color selector
    if(state.colorSelector !== socket.username) {
    console.log(`\n${socket.username} has attempted to select the color for the next turn, but it is ${state.colorSelector}'s turn.`);
    return;
    }

    room.gameState.activeColor = chosenColor;
    room.gameState.chosenColor = chosenColor;


    let nextPlayerTurn = (state.turnLogic + state.direction + players.length) % players.length;
    let nextPlayerID = players[nextPlayerTurn];
    
    if(state.pendingSpecialFour) {
        for(let i = 0; i < 4; ++i) {
            if(state.deck.length === 0) break;
            const drawnCard = state.deck.shift();
            state.PlayHands[nextPlayerID].push(drawnCard);
        }
         state.turnLogic = (state.turnLogic + state.direction * 2 + players.length) % players.length;
         state.pendingSpecialFour = false;
    }

    state.colorSelectionPending = false;
    state.colorSelector = null;
    io.to(roomCode).emit("update_game_state", {
        ...state,
        message: `${socket.username} has changed the card to the color ${chosenColor}`
       }
     );
   });
});

// establishing listening on port
server.listen(3001, () => {
    console.log("Server is running!");
});
