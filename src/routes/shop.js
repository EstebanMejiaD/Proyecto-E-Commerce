//Esta va a ser la ruta o el tipo de ruta de ejemplo para el proyecto

const express = require("express");
const { render } = require("timeago.js");
const router = express.Router();

const pool = require("../database");

router.get("/shop", async (req, res) => {
  const products = await pool.query("SELECT * FROM products;");

  res.render("profile/shop.hbs", { products });
  console.log(products);
});

router.get("/addcart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("respuesta body: ", id);
    const product = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?;",
      [id]
    );
    console.log("producto: ", { product: product[0] });

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
    };
    console.log("nombre del producto:", newProduct);
    const shopProduct = await pool.query("INSERT INTO cartshop SET ?", [
      newProduct,
    ]);
    console.log("producto en carrito: ", shopProduct);
    const products = await pool.query("SELECT * FROM products;");
    res.render("profile/shop.hbs", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/cart", async (req, res) => {
  const cartProduct = await pool.query("SELECT * FROM cartshop;");
  console.log(cartProduct);
  res.render("profile/cart", { cartProduct });
});

router.get("/cart/delete/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM cartshop WHERE ProductID = ?", [id]);
  // req.flash('success', 'Link Removed successfuly')
  res.redirect("/cart");
});

//filtro por busqueda de nombre
router.post("/filter/name/", async (req, res) => {
  const { ProductName } = req.body;

  const products = await pool.query(
    "SELECT * FROM products WHERE ProductName = ? ",
    [ProductName]
  );

  res.render("profile/shop", { products });
});

//rutas para el domicilio o direccion

router.post("/domicilio/add", async (req, res) => {
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
  await pool.query("INSERT INTO domicilios set ?", [newDomicilio]);
  res.redirect("/cart");
});

router.get("/domicilio/add", (req, res) => {
  res.render("profile/formDomicilio");
});

//editar domicilio
router.get("/domicilio/cambiar/:id", async (req, res) => {
  const { id } = req.params;
  const domicilio = await pool.query(
    "SELECT * FROM domicilios WHERE domicilioID = ?",
    [id]
  );
  res.render("profile/cambiar", { domicilio: domicilio[0] });
});

router.post("/domicilio/cambiar/:id", async (req, res) => {
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

router.get("/cart/comprar/:id", async (req, res) => {
  const { id } = req.params;
  let productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  module.exports = productoAComprar;
  const precioproducto = parseFloat(productoAComprar[0].ProductPrice);
  const envio = 10;
  const total = envio + precioproducto;

  const domicilio = await pool.query("SELECT * FROM domicilios;");

  res.render("profile/compra", {
    productoAComprar,
    domicilio,
    envio,
    total,
  });
});

// pagos en inox

router.post("/pagar/inox/:id", async (req, res) => {
  const { Correo, Contraseña } = req.body;
  const { id } = req.params;
  const productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  const domicilio = await pool.query("SELECT * FROM domicilios;");

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
  };
  await pool.query("INSERT INTO orden set ?", [newOrden]);

  // res.render('profile/ordenLista')
  res.redirect("/pagar/inox");
});

router.get("/pagar/inox", async (req, res) => {
  const { id } = req.params;
  const orden = await pool.query("SELECT * FROM orden ORDER BY ordenID DESC");
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
router.post("/pagar/efecty/:id", async (req, res) => {
  const { Correo} = req.body;
  const { id } = req.params;
  const productoAComprar = await pool.query(
    "SELECT * FROM cartshop WHERE ProductID = ?",
    [id]
  );
  const domicilio = await pool.query("SELECT * FROM domicilios;");

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
  };
  await pool.query("INSERT INTO orden set ?", [newOrden]);

  // res.render('profile/ordenLista')
  res.redirect("/pagar/efecty");
});

router.get("/pagar/efecty", async (req, res) => {
  const orden = await pool.query("SELECT * FROM orden ORDER BY ordenID DESC");
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

router.get('/profile/ordenes', async(req, res)=> {

  const user = await pool.query('SELECT * FROM users')
  const ordenes = await pool.query('SELECT * FROM orden')

  res.render('profile/profileUser', {user, ordenes})
})

module.exports = router;
