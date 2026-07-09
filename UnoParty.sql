 
CREATE DATABASE IF NOT EXISTS (
    use unoparty;
)

-- creates a user from a specific host w/ random password 
CREATE USER IF NOT EXISTS uno_backend@localhost IDENTIFIED BY 'stygyy-qwrggg-ttreewdf';
CREATE USER IF NOT EXISTS uno_api@localhost IDENTIFIED BY 'thggh-tiyyohih-dshrhgdq~~';

-- grants privileges for a specific table in the database 
GRANT SELECT, UPDATE ON unoparty.USERS TO uno_backend@localhost;
GRANT SELECT, UPDATE ON unoparty.USERSTATS TO uno_api@localhost;

CREATE TABLE IF NOT EXISTS USERS (
    UNIQUE username INT NOT NULL PRIMARY_KEY AUTO_INCREMENT, 
    partyTokens INT NOT NULL,
    equip_inventory VARCHAR(260) NOT NULL,
    friends VARCHAR(260) NOT NULL,
    accept_friends VARCHAR(260) NOT NULL
);

INSERT INTO USERS(username, friends, partyTokens, equip_inventory, friends, accept_friends) VALUES
(?, ?, ?, ?, ?, ?);

CREATE TABLE IF NOT EXISTS USERINFO (
    usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    age INT NOT NULL,
    password VARCHAR(266) NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    accountCreated DATETIME NOT NULL,
    emailAddress VARCHAR(260) NOT NULL
);

-- gives us the table structure and data types of the data inside
DESC USERINFO;

-- create unique index to prevent duplicates & improve performance 
CREATE UNIQUE INDEX user_ID ON USERSTATS (usernameID);
CREATE UNIQUE INDEX unique_email ON USERINFO (emailAddress);

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
    age INT NOT NULL,
    AccountStatus TEXT NOT NULL
);

INSERT INTO PROFILE(userProfile, gender, AccountStatus) VALUES
(?, ?, ?);

SELECT * FROM PROFILE
WHERE gender IN('Male', 'Female');


CREATE TABLE IF NOT EXISTS SUBSCRIPTION (
    subscriberID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    orderID INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(260) NOT NULL,
    emailAddress VARCHAR(260) NOT NULL,
    subscription_submitted DATETIME NOT NULL
);
DESC SUBSCRIPTION;

INSERT INTO SUBSCRIPTION(subscriberID, orderID, name, emailAddress, subscription_submitted) VALUES 
(?, ?, ?, ?, 'yyyy-mm-dd hh:mi:ss');


-- creating table to track statistics for UNO game
CREATE TABLE IF NOT EXISTS STATISTICS (
    playerlevel INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    xpEarned INT NOT NULL,
    gamesPlayed INT NOT NULL,
    wins INT NOT NULL,
    losses INT NOT NULL,
    longest_win_streak INT NOT NUll
);
DESC STATISTICS;

INSERT INTO STATISTICS(playerlevel, xpEarned, gamesPlayed, wins, losses, longest_win_streak) VALUES
(?, ?, ?, ?, ?, ?);


CREATE TABLE IF NOT EXISTS EQUIPPED_CARDS (
    usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    equipCard VARCHAR(260) NOT NULL, 
);


-- creates a backup of the original database 
BACKUP unoparty_backupDB
TO DISK = 'C:\Users\Terry Black\My-App\BackUp\unoparty_backupDB.bak';