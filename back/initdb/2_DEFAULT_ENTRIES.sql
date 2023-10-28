/*
INSERT INTO majors (id, name, description) VALUES (1, 'Ingéniérie du Numérique', 'Ouaiiis du code partout');
INSERT INTO majors (id, name, description) VALUES (2, 'Structure & Matériaux', 'Beaucoup de béton et des poutres (snif elle a été renomée)');
INSERT INTO majors (id, name, description) VALUES (3, 'Aéronautique & Espace', 'Vive le vent');
INSERT INTO majors (id, name, description) VALUES (4, 'Data Engineering', 'Trop cool plein de données à ordonner');
INSERT INTO majors (id, name, description) VALUES (5, 'Energie & Environnement', 'On est full green');
INSERT INTO majors (id, name, description) VALUES (6, 'Engineering Management', 'Des managers de qualité');
INSERT INTO majors (id, name, description) VALUES (7, 'Ingénierie & Santé', 'On connait tous les os et tous les muscles du corps humain');
INSERT INTO majors (id, name, description) VALUES (8, 'Ingénierie & Architecture durable', 'Objectif 0 carbon');
INSERT INTO majors (id, name, description) VALUES (9, 'Design Industriel Durable', 'Ca existait pas pour la P2022 ça');

INSERT INTO students (id, first_name, last_name, birthdate, major_id) VALUES (1, 'Paul', 'Harrohide', '2002-06-15', 1);
INSERT INTO students (id, first_name, last_name, birthdate, major_id) VALUES (2, 'Jean', 'Bonbeur', '2001-08-21', 1);
INSERT INTO students (id, first_name, last_name, birthdate, major_id) VALUES (3, 'Alain', 'Térieur', '2000-01-11', 1);

INSERT INTO courses (id, name, hours) VALUES (1, 'Spanish', 30);
INSERT INTO courses (id, name, hours) VALUES (2, 'German', 30);
INSERT INTO courses (id, name, hours) VALUES (3, 'Internet of Things', 30);
INSERT INTO courses (id, name, hours) VALUES (4, 'Thermodynamic', 30);
INSERT INTO courses (id, name, hours) VALUES (5, 'Anatomy', 30);
INSERT INTO courses (id, name, hours) VALUES (6, 'Maths', 30);
INSERT INTO courses (id, name, hours) VALUES (7, 'Java', 30);
INSERT INTO courses (id, name, hours) VALUES (8, 'Lean Management', 30);
INSERT INTO student_course (id, student_id, course_id) VALUES (1, 1, 7);*/


/* Thème : nourriture*/
INSERT INTO cards (reponse) VALUES ('chocolatine');
INSERT INTO cards (reponse) VALUES ('pain au chocolat');
INSERT INTO cards (reponse) VALUES ('pizza');
INSERT INTO cards (reponse) VALUES ('burger');
INSERT INTO cards (reponse) VALUES ('sushi');
INSERT INTO cards (reponse) VALUES ('tacos');
INSERT INTO cards (reponse) VALUES ('fruit');
INSERT INTO cards (reponse) VALUES ('legumes');
INSERT INTO cards (reponse) VALUES ('sucré');
INSERT INTO cards (reponse) VALUES ('salé');
INSERT INTO cards (reponse) VALUES ('cuisine française');
INSERT INTO cards (reponse) VALUES ('cuisine italienne');
INSERT INTO cards (reponse) VALUES ('cuisine asiatique');
INSERT INTO cards (reponse) VALUES ('cuisine mexicaine');

INSERT INTO liaison (id_1, id_2) VALUES (1, 2);
INSERT INTO liaison (id_1, id_2) VALUES (3, 4);
INSERT INTO liaison (id_1, id_2) VALUES (5, 6);
INSERT INTO liaison (id_1, id_2) VALUES (7, 8);
INSERT INTO liaison (id_1, id_2) VALUES (9, 10);
INSERT INTO liaison (id_1, id_2) VALUES (11, 12);
INSERT INTO liaison (id_1, id_2) VALUES (13, 14);

INSERT INTO themes (name) VALUES ('Nourriture');

INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,1);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,2);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,3);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,4);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,5);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,6);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (1,7);

/* Thème : loisirs*/
INSERT INTO cards (reponse) VALUES ('cinéma');
INSERT INTO cards (reponse) VALUES ('théâtre');
INSERT INTO cards (reponse) VALUES ('musique');
INSERT INTO cards (reponse) VALUES ('sport');
INSERT INTO cards (reponse) VALUES ('lecture');
INSERT INTO cards (reponse) VALUES ('jeux vidéos');
INSERT INTO cards (reponse) VALUES ('plage');
INSERT INTO cards (reponse) VALUES ('montagne');
INSERT INTO cards (reponse) VALUES ('ville');
INSERT INTO cards (reponse) VALUES ('campagne');
INSERT INTO cards (reponse) VALUES ('voyage');
INSERT INTO cards (reponse) VALUES ('vacances à la maison');
INSERT INTO cards (reponse) VALUES ('activités en plein air');
INSERT INTO cards (reponse) VALUES ('activités en intérieur');
INSERT INTO cards (reponse) VALUES ('activités solitaires');
INSERT INTO cards (reponse) VALUES ('activités sociales');

INSERT INTO liaison (id_1, id_2) VALUES (15, 16);
INSERT INTO liaison (id_1, id_2) VALUES (17, 18);
INSERT INTO liaison (id_1, id_2) VALUES (19, 20);
INSERT INTO liaison (id_1, id_2) VALUES (21, 22);
INSERT INTO liaison (id_1, id_2) VALUES (23, 24);
INSERT INTO liaison (id_1, id_2) VALUES (25, 26);
INSERT INTO liaison (id_1, id_2) VALUES (27, 28);
INSERT INTO liaison (id_1, id_2) VALUES (29, 30);

INSERT INTO themes (name) VALUES ('Loisirs');

INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,8);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,9);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,10);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,11);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,12);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,13);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,14);
INSERT INTO themes_liaisons(theme_id, liaison_id) VALUES (2,15);


INSERT INTO perso(id, prenom) VALUES (1, 'Micheal');
INSERT INTO perso (id, prenom) VALUES (2, 'Jim');
INSERT INTO perso (id, prenom) VALUES (3, 'Dwight');
INSERT INTO perso (id, prenom) VALUES (4, 'Meredith');
INSERT INTO perso(id, prenom) VALUES (5, 'Pam');
INSERT INTO perso (id, prenom) VALUES (6, 'Standley');
INSERT INTO perso (id, prenom) VALUES (7, 'Angela');
INSERT INTO perso (id, prenom) VALUES (8, 'Kevin');
INSERT INTO perso(id, prenom) VALUES (9, 'Kelly');
INSERT INTO perso (id, prenom) VALUES (10, 'Tobby');
INSERT INTO perso (id, prenom) VALUES (11, 'Phyllis');
INSERT INTO perso (id, prenom) VALUES (12, 'Ryan');
INSERT INTO perso(id, prenom) VALUES (13, 'Creed');
INSERT INTO perso (id, prenom) VALUES (14, 'Oscars');
INSERT INTO perso (id, prenom) VALUES (15, 'Andy');

