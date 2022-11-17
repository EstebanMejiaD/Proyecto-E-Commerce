// Esto es una prueba


const pool = require('../database')

const idEntrada =  document.querySelector('.idproducto')
const idConvertida= idEntrada.innerHTML

const funcionproducto = async(id)=> {
const producto = await pool.query('SELECT * FROM cartshop WHERE ProductID = ?', [id])

console.log(producto)
}
funcionproducto(idConvertida)