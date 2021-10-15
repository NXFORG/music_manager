DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    fname varchar(12) NOT NULL,
    lname varchar(12) NOT NULL,
    email varchar(30) NOT NULL,
    pass varchar(300) NOT NULL
);
