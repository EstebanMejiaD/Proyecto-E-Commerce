const mysql = require("mysql");
const { database } = require("./keys");
const {promisify} = require('util')



// Aqui creamos la conexion a la base de datos
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("LA CONEXION CON LA BASE DE DATOS FUE CERRADA");
    }
    if (err.code === "ER_CON_ERROR") {
      console.error("LA BASE DE DATOS TIENE MUCHAS CONECCIONES");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("CONECCION A LA BASE DE DATOS RECHAZADA");
    }
  }

  if (connection) connection.release()
  console.log('LA BASE DE DATOS ESTA CONECTADA')
  return;
});

// promisify nos sirve convertir codigo de promesas a asincronos para poder usar async - await
pool.query = promisify(pool.query);

module.exports = pool;