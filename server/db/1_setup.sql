DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    fname varchar(12) NOT NULL,
    lname varchar(12) NOT NULL,
    email varchar(30) NOT NULL,
    pass varchar(300) NOT NULL
);

DROP TABLE IF EXISTS albumcollection;

CREATE TABLE albumcollection (
    id serial PRIMARY KEY,
    ownerId int NOT NULL,
    relId int NOT NULL,
    relTitle varchar(200),
    relArtist varchar(50),
    relGenre varchar(50),
    relYear int,
    relType varchar(30) NOT NULL,
    relImage varchar,
    relBarcode varchar,
    relHave int,
    relWant int,
    relLabel varchar
);

