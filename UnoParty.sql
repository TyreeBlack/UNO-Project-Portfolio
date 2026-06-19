 
CREATE DATABASE IF NOT EXISTS (
    use unoparty;
)

-- creates a user from a specific host w/ random password 
CREATE USER uno_backend@localhost IDENTIFIED BY 'stygyy-qwrggg-ttreewdf';

-- grants privileges for a specific table in the database 
GRANT SELECT, UPDATE ON unoparty.USERS TO uno_backend@localhost;

CREATE TABLE IF NOT EXISTS USERS (
    username INT NOT NULL PRIMARY_KEY AUTO_INCREMENT, 
    partyTokens INT NOT NULL,
    equip_inventory VARCHAR(260) NOT NULL,
    friends VARCHAR(260) NOT NULL,
    accept_friends VARCHAR(260) NOT NULL
);

INSERT INTO USERS(username, friends, partyTokens, equip_inventory, friends, accept_friends) VALUES
(?, ?, ?, ?, ?, ?);


UPDATE USERS 

CREATE TABLE IF NOT EXISTS USERINFO (
    usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    age INT NOT NULL,
    password VARCHAR(266) NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    accountCreated DATETIME NOT NULL,
    UNIQUE INDEX(emailAddress) emailAddress
);

INSERT INTO USERINFO(usernameID, age, password, emailAddress, accountCreated) VALUES 
(?, ?, ?, ?, 'yyyy-mm-dd hh:mi:ss');


CREATE TABLE IF NOT EXISTS USERSTATS (
usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
username VARCHAR(60) NOT NULL,
winHistory INT NOT NULL,
matchHistory DATETIME NOT NULL
);

INSERT INTO USERSTATS(usernameID, username, winHistory, matchHistory) VALUES
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss');

CREATE TABLE IF NOT EXISTS PROFILE (
    userProfile PRIMARY_KEY INT NOT NULL AUTO_INCREMENT,
    gender VARCHAR(60) NOT NULL,
    AccountStatus TEXT NOT NULL
);

INSERT INTO PROFILE(userProfile, gender, AccountStatus) VALUES
(?, ?, ?)

SELECT *FROM PROFILE
WHERE gender IN('Male', 'Female');


CREATE TABLE IF NOT EXISTS SUBSCRIPTION (
    subscriberID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    name VARCHAR(260) NOT NULL,
    INDEX emailAddress INT NOT NULL,
    subscription_submitted DATETIME NOT NULL
);

INSERT INTO SUBSCRIPTION(subscriberID, name, emailAddress, subscription_submitted) VALUES 
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss');


-- creating table to track statistics for UNO game

CREATE TABLE IF NOT EXISTS STATISTICS (
    playerlevel INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    xpEarned INT NOT NULL,
    gamesPlayed INT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    longest_win_streak INT NOT NUll
);

INSERT INTO STATISTICS(playerlevel, xpEarned, gamesPlayed, wins, losses, longest_win_streak) VALUES
(?, ?, ?, ?, ?);


CREATE TABLE IF NOT EXISTS EQUIPED_CARDS (
    equipCard INT NOT NULL PRIMARY_KEY AUTO_INCREMENT, 
    username VARCHAR(260) NOT NULL
);