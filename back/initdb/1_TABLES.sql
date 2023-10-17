create table cards
(
    id SERIAL PRIMARY KEY,
    reponse TEXT not null
);

CREATE TABLE liaison
(
    id SERIAL PRIMARY KEY,
    id_1 INTEGER not null,
    id_2 INTEGER not null
);

create table perso
(
    id SERIAL PRIMARY KEY,
    prenom TEXT not null
);
/*
create table majors
(
    id SERIAL PRIMARY KEY,
    name TEXT not null,
    description TEXT not null
);

create table courses
(
    id SERIAL PRIMARY KEY,
    name TEXT not null,
    hours int not null
);

create table student_course
(
    id SERIAL PRIMARY KEY,
    student_id int not null,
    course_id int not null
);*/
