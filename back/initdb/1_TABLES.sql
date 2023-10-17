create table cards
(
    id SERIAL PRIMARY KEY,
    reponse TEXT not null
);

create table liaison
(
    id_1 SERIAL not null,
    id_2 SERIAL not null
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
