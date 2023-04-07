 create database matchmaker;

 create table users(
  id int(8) unsigned not null auto_increment,
  name varchar(50) not null,
  email varchar(50),
  filename varchar(50),
  description tinytext,
  age int(3) unsigned not null,
  posted timestamp not null default current_timestamp,
  primary key(id),
  unique key unique_email(email)
) engine = INNODB;