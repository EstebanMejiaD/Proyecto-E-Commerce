//Esta va a ser la ruta o el tipo de ruta de ejemplo para el proyecto

const express = require("express");
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
    await pool.query("UPDATE domicilios set ? WHERE domicilioID = ?", [newDomicilio, id]);
   
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
        const precioproducto = parseFloat(productoAComprar[0].ProductPrice)
        const envio = 10
        const total = envio + precioproducto
        
    const domicilio = await pool.query("SELECT * FROM domicilios;");
    

 
    res.render("profile/compra", {
      productoAComprar,
      domicilio,
      envio,
      total
    });

  });

  
module.exports = router;
