//Esta va a ser la ruta o el tipo de ruta de ejemplo para el proyecto

const express = require("express");
const { render } = require("timeago.js");
const router = express.Router();

const pool = require("../database");
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth')

router.get("/shop", isLoggedIn, async (req, res) => {
  const products = await pool.query("SELECT * FROM products;");
  const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const contadorCarrito = caritoActual.length;
  res.render("profile/shop.hbs", { products, contadorCarrito });
});

router.get("/addcart/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?;",
      [id]
    );

    const {
      ProductName,
      Category,
      ProductPrice,
      UnitsInStock,
      descripcion,
      ManufactureYear,
      imagen,
      ProductSlug,
    } = product[0];
    const newProduct = {
      ProductName,
      Category,
      ProductPrice,
      UnitsInStock,
      descripcion,
      ManufactureYear,
      imagen,
      ProductSlug,
      user_id: req.user.id
    };
    const shopProduct = await pool.query("INSERT INTO cartshop SET ?", [
      newProduct,
    ]);

    const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
    const contadorCarrito = caritoActual.length;

    const products = await pool.query("SELECT * FROM products;");
    res.redirect("/shop");

  } catch (error) {
    console.log(error);
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const cartProduct = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const contadorCarrito = caritoActual.length;
  res.render("profile/cart", { cartProduct,contadorCarrito });
});

router.get("/cart/delete/:id",isLoggedIn,  async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM cartshop WHERE ProductID = ?", [id]);
  // req.flash('success', 'Link Removed successfuly')
  res.redirect("/cart");
});

//filtro por busqueda de nombre
router.post("/filter/name/",isLoggedIn,  async (req, res) => {
  const { ProductName } = req.body;

  const products = await pool.query(
    "SELECT * FROM products WHERE ProductName = ? ",
    [ProductName]
  );

  res.render("profile/shop", { products });
});

//rutas para el domicilio o direccion

router.post("/domicilio/add",isLoggedIn,  async (req, res) => {
  const { nombreCompleto, telefono, ciudad, municipio, direccion, detalle } =
    req.body;
  const newDomicilio = {
    nombreCompleto,
    telefono,
    ciudad,
    municipio,
    direccion,
    detalle,
    user_idDomicilio: req.user.id
  };
  await pool.query("INSERT INTO domicilios set ?", [newDomicilio]);
  res.redirect("/cart");
});

router.get("/domicilio/add",isLoggedIn,  (req, res) => {
  res.render("profile/formDomicilio");
});

//editar domicilio
router.get("/domicilio/cambiar/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const domicilio = await pool.query(
    "SELECT * FROM domicilios WHERE domicilioID = ?",
    [id]
  );
  res.render("profile/cambiar", { domicilio: domicilio[0] });
});

router.post("/domicilio/cambiar/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { nombreCompleto, telefono, ciudad, municipio, direccion, detalle } =
    req.body;
  const newDomicilio = {
    nombreCompleto,
    telefono,
    ciudad,
    municipio,
    direccion,
    detalle,
  };
  await pool.query("UPDATE domicilios set ? WHERE domicilioID = ?", [
    newDomicilio,
    id,
  ]);

  res.redirect("/cart");
});

//Ruta para comprar un producto

router.get("/cart/comprar/:id",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  let productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  module.exports = productoAComprar;
  const precioproducto = parseFloat(productoAComprar[0].ProductPrice);
  const envio = 10;
  const total = envio + precioproducto;

  const domicilio = await pool.query("SELECT * FROM domicilios WHERE user_idDomicilio = ?", [req.user.id]);

  const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const contadorCarrito = caritoActual.length;
  res.render("profile/compra", {
    productoAComprar,
    domicilio,
    envio,
    total,
    contadorCarrito,
  });
});

// pagos en inox

router.post("/pagar/inox/:id",isLoggedIn, async (req, res) => {
  const { Correo, Contraseña } = req.body;
  const { id } = req.params;
  const productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  const domicilio = await pool.query("SELECT * FROM domicilios WHERE user_idDomicilio = ?", [req.user.id]);

  newOrden = {
    correo: Correo,
    contraseña: Contraseña,
    nombreCompleto: domicilio[0].nombreCompleto,
    telefono: domicilio[0].telefono,
    ciudad: domicilio[0].ciudad,
    municipio: domicilio[0].municipio,
    direccion: domicilio[0].direccion,
    detalle: domicilio[0].detalle,
    ProductName: productoAComprar[0].ProductName,
    ProductPrice: productoAComprar[0].ProductPrice,
    imagen: productoAComprar[0].imagen,
    user_idOrden: req.user.id
  };
  await pool.query("INSERT INTO orden set ?", [newOrden]);

  // res.render('profile/ordenLista')
  res.redirect("/pagar/inox");
});

router.get("/pagar/inox",isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const orden = await pool.query("SELECT * FROM orden WHERE user_idOrden = ? ORDER BY ordenID DESC", [req.user.id]);
  ordenUnica = orden[0];
  newOrden = {
    correo: ordenUnica.correo,
    contraseña: ordenUnica.contraseña,
    nombreCompleto: ordenUnica.nombreCompleto,
    telefono: ordenUnica.telefono,
    ciudad: ordenUnica.ciudad,
    municipio: ordenUnica.municipio,
    direccion: ordenUnica.direccion,
    detalle: ordenUnica.detalle,
    ProductName: ordenUnica.ProductName,
    ProductPrice: ordenUnica.ProductPrice,
    imagen: ordenUnica.imagen
  };
  res.render("profile/factura", {newOrden});
});


//pagos en efecty
router.post("/pagar/efecty/:id",isLoggedIn, async (req, res) => {
  const { Correo} = req.body;
  const { id } = req.params;
  const productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  const domicilio = await pool.query("SELECT * FROM domicilios WHERE user_idDomicilio = ?", [req.user.id]);

  newOrden = {
    correo: Correo,
    nombreCompleto: domicilio[0].nombreCompleto,
    telefono: domicilio[0].telefono,
    ciudad: domicilio[0].ciudad,
    municipio: domicilio[0].municipio,
    direccion: domicilio[0].direccion,
    detalle: domicilio[0].detalle,
    ProductName: productoAComprar[0].ProductName,
    ProductPrice: productoAComprar[0].ProductPrice,
    imagen: productoAComprar[0].imagen,
    user_idOrden: req.user.id
  };
  await pool.query("INSERT INTO orden set ?", [newOrden]);

  // res.render('profile/ordenLista')
  res.redirect("/pagar/efecty");
});

router.get("/pagar/efecty",isLoggedIn, async (req, res) => {
  const orden = await pool.query("SELECT * FROM orden WHERE user_idOrden = ? ORDER BY ordenID DESC", [req.user.id]);
  ordenUnica = orden[0];
  newOrden = {
    correo: ordenUnica.correo,
    nombreCompleto: ordenUnica.nombreCompleto,
    telefono: ordenUnica.telefono,
    ciudad: ordenUnica.ciudad,
    municipio: ordenUnica.municipio,
    direccion: ordenUnica.direccion,
    detalle: ordenUnica.detalle,
    ProductName: ordenUnica.ProductName,
    ProductPrice: ordenUnica.ProductPrice,
    imagen: ordenUnica.imagen
  };
  res.render("profile/facturaEfecty", {newOrden});
});

router.get('/profile/ordenes',isLoggedIn, async(req, res)=> {

  const user = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
  const ordenes = await pool.query('SELECT * FROM orden WHERE user_idOrden = ?', [req.user.id])

  const caritoActual = await pool.query("SELECT * FROM cartshop WHERE user_id = ?", [req.user.id]);
  const contadorCarrito = caritoActual.length;
  res.render('profile/profileUser', {user, ordenes, contadorCarrito})
})

module.exports = router;
