/*
Aquí se estará escribiendo toda la sintaxis de MySQL es decir, vamos a crear las tablas y todo-
el comportamiento de la base de datos. 
*/

CREATE DATABASE database_store;

USE database_store;


-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    telefono INT(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;    

-- TRANSACCIONS TABLE


