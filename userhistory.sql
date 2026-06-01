 
CREATE DATABASE IF NOT EXISTS (
    use userhistory.db;
)

CREATE TABLE IF NOT EXISTS USERINFO (
    usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
    age INT NOT NULL,
    emailAddress VARCHAR(250) NOT NULL,
    accountCreated DATETIME NOT NULL
);

INSERT INTO USERINFO(usernameID, age, emailAddress, accountCreated) VALUES 
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss')

CREATE TABLE IF NOT EXISTS USERSTATS (

usernameID INT NOT NULL PRIMARY_KEY AUTO_INCREMENT,
username VARCHAR(60) NOT NULL,
winHistory INT NOT NULL,
matchHistory DATETIME NOT NULL
);

INSERT INTO USERSTATS(usernameID, username, winHistory, matchHistory) VALUES
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss'),
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss'),
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss'),
(?, ?, ?, 'yyyy-mm-dd hh:mi:ss')


CREATE TABLE IF NOT EXISTS PROFILE (
    userProfile PRIMARY_KEY INT NOT NULL AUTO_INCREMENT,
    gender VARCHAR(60) NOT NULL
);

INSERT INTO PROFILE(userProfile, gender) VALUES
(?, ?)

SELECT *FROM PROFILE
WHERE gender IN('Male', 'Female');



