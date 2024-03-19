drop database if exists todo;

create database todo;

use todo;

create table task (
  id serial primary key,  
  description varchar(225) not null
);
insert into task (description) values ("My Test Task 01");
insert into task (description) values ("My Test Task 02");