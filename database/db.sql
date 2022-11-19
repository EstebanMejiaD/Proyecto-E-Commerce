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



--
-- Table structure for table `products`
--

CREATE TABLE products(
  ProductID INT(11) NOT NULL,
  ProductName VARCHAR(40) NOT NULL,
  Category VARCHAR(40) DEFAULT NULL,
  ProductPrice DECIMAL(10,2) DEFAULT 0.00,
  UnitsInStock INT(11) DEFAULT 0,
  descripcion VARCHAR(40) NOT NULL,
  ManufactureYear INT(6) NOT NULL,
  imagen VARCHAR(50) NOT NULL,
  ProductSlug VARCHAR(50) NOT NULL
);
DESCRIBE products;
--
-- Dumping data for table `products`
--
INSERT INTO `products` (`ProductID`, `ProductName`, `Category`, `ProductPrice`, `UnitsInStock`, `descripcion`, `ManufactureYear`, `imagen`, `ProductSlug`) VALUES
(1, 'Iphone 13', 'smartphone', '999.92', 17, 'Lateast', 2015, '1.png', 'Iphone-13'),
(2, 'MacBook Pro', 'laptop', '3999.92', 15, 'Newer', 2014, '2.png', 'MacBook-Pro'),
(3, 'AirPods pro', 'headset', '299.92', 10, 'Sony Full HD', 2013, '3.png', 'AirPods-pro'),
(4, 'Mac Mini', 'pc', '699.92', 12, 'Samsung LED', 2012, '4.png', 'Mac-Mini'),
(5, 'Imac 24-inch', 'pc', '1299.92', 8, 'Intel-NVIDA-Logitech', 2011, '5.png', 'Imac-24-inch'),
(6, 'Pro Display XDR', 'tv', '4999.92', 6, 'Apple Early 2010', 2010, '6.png', 'Pro-Display-XDR'),
(7, 'Ipad Pro', 'tablet', '799.92', 12, 'Microsoft Future', 2009, '7.png', 'Ipad-Pro'),
(8, 'Apple Watch Series 8', 'smartwatch', '399.92', 12, 'Microsoft Future', 2009, '8.png', 'Apple-Watch-Series-8');


--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `ProductName` (`ProductName`);

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;







--
-- Table structure for table `cartshop`
--

CREATE TABLE cartshop(
  ProductID INT(11) NOT NULL,
  ProductName VARCHAR(40) NOT NULL,
  Category VARCHAR(40) DEFAULT NULL,
  ProductPrice DECIMAL(10,2) DEFAULT 0.00,
  UnitsInStock INT(11) DEFAULT 0,
  descripcion VARCHAR(40) NOT NULL,
  ManufactureYear INT(6) NOT NULL,
  imagen VARCHAR(50) NOT NULL,
  ProductSlug VARCHAR(50) NOT NULL,
  user_id INT(11),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO `cartshop` (`ProductID`, `ProductName`, `Category`, `ProductPrice`, `UnitsInStock`, `descripcion`, `ManufactureYear`, `imagen`, `ProductSlug`) VALUES
(1, 'Iphone 13', 'smartphone', '999.92', 17, 'Lateast', 2015, '1.png', 'Iphone-13');

--
-- Indexes for table `products`
--
ALTER TABLE `cartshop`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `ProductName` (`ProductName`);


--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `cartshop`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE cartshop;

--
-- Crete table of domicilio
--
CREATE TABLE domicilios(
  domicilioID INT(11) NOT NULL,
  nombreCompleto VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  ciudad VARCHAR(40) NOT NULL,
  municipio VARCHAR(40) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  detalle VARCHAR(200) NOT NULL,
  user_idDomicilio INT(11),
  CONSTRAINT fk_userID FOREIGN KEY (user_idDomicilio) REFERENCES users(id)
);

--
-- Indexes for table `domicilio`
--
ALTER TABLE `domicilios`
  ADD PRIMARY KEY (`domicilioID`),
  ADD KEY `nombreCompleto` (`nombreCompleto`);

--
-- AUTO_INCREMENT for table `domicilio`
--
ALTER TABLE `domicilios`
  MODIFY `domicilioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE domicilios;

-- creacion de la tabla orden
CREATE TABLE orden(
  ordenID INT(11) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contraseña VARCHAR(20) NOT NULL,
  nombreCompleto VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  ciudad VARCHAR(40) NOT NULL,
  municipio VARCHAR(40) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  detalle VARCHAR(200) NOT NULL,
  ProductName VARCHAR(40) NOT NULL,
  ProductPrice DECIMAL(10,2) DEFAULT 0.00,
  imagen VARCHAR(50) NOT NULL,
  user_idOrden INT(11),
  CONSTRAINT fk_userIDOrden FOREIGN KEY (user_idOrden) REFERENCES users(id)
);

ALTER TABLE `orden`
  ADD PRIMARY KEY (`ordenID`);

  ALTER TABLE `orden`
  MODIFY `ordenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE orden;
ALTER TABLE `orden`
  MODIFY `contraseña` VARCHAR(20);
  