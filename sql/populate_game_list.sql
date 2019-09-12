\connect game_library

BEGIN;

INSERT INTO collection(name, description, publisher, year) values('Super Mario Brothers','Super Mario Bros. is a platform game. In the game, Mario must race through the Mushroom Kingdom and save Princess Toadstool (later Princess Peach) from Bowser. Mario jumps, runs, and walks across each level. The worlds are full of enemies and platforms, and open holes.','Nintendo',1985);

INSERT INTO collection(name, alternate_name, description, publisher, year) values('Pac-Man','Puck Man', 'Pac-Man is a maze arcade game developed and released by Namco in 1980. The original Japanese title of Puck Man was changed to Pac-Man for international releases as a preventative measure against defacement of the arcade machines. Outside Japan, the game was published by Midway Games as part of its licensing agreement with Namco America. The player controls Pac-Man, who must eat all the dots inside an enclosed maze while avoiding four colored ghosts. Eating large flashing dots called energizers causes the ghosts to turn blue, allowing Pac-Man to eat them for bonus points. It is the first game to run on the Namco Pac-Man arcade board.','Namco',1980);

COMMIT;
