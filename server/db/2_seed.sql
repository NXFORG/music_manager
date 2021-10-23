INSERT INTO users (fname, lname, email, pass) 
VALUES
    ('Bob', 'Smith', 'bobsmith@email.com', 'goodpass'),
    ('Sarah', 'Davidson', 'sarahdavidson@email.com', 'greatpass'),
    ('Chloe', 'Jacobs', 'cjacobs@email.com', 'epicpass');

INSERT INTO albumcollection (ownerId, relId, relTitle, relArtist, relGenre, relYear, relType, relImage, relBarcode, relHave, relWant, relLabel) 
VALUES
    (1, 1337, 'In Silico', 'Pendulum', 'DnB', 2008, 'Vinyl', 'url.com', 'barcode1', 100, 200, 'Good label');