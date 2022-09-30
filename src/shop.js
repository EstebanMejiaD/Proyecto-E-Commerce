const userIcon = document.querySelector(`.user-icon-container`);
const asideLogin = document.querySelector(`.aside-login-e`);
const btnCart =  document.querySelector(`.button-cart`);
const closeLogin = document.querySelector(`.login-close`);

userIcon.addEventListener(`click`, openAsideLogin);
closeLogin.addEventListener(`click`, closeAlideLogin);

function openAsideLogin() {
    asideLogin.classList.remove(`inactive`);
    
}

function closeAlideLogin() {
    asideLogin.classList.add(`inactive`);
}



const productos = document.querySelector("#productos");

let items = [

    {
        id: "ABC1",
        nombre: "Iphone 13",
        precio: 1000,
        imagen: "components/image/iphone13promax.png",
    },
    {
        id: "ABC2",
        nombre: "MacBook Pro",
        precio: 4000,
        imagen: "components/image/macbookAirM2.png",
    },
    {
        id: "ABC3",
        nombre: "AirPods pro",
        precio: 250,
        imagen: "components/image/airPods.png",
    },
    {
        id: "ABC4",
        nombre: "Mac Mini",
        precio: 700,
        imagen: "components/image/macMini.png",
    },
    {
        id: "ABC5",
        nombre: "Imac 24-inch",
        precio: 1300,
        imagen: "components/image/imac24.png",
    },
    {
        id: "ABC6",
        nombre: "Pro Display XDR",
        precio: 5000,
        imagen: "components/image/proxDisplay.png",
    },
    {
        id: "ABC7",
        nombre: "Ipad Pro",
        precio: 800,
        imagen: "components/image/IpadPro.png",
    },
    {
        id: "ABC8",
        nombre: "Apple Watch Series 8",
        precio: 400,
        imagen: "components/image/appleWatchS8.png",
    },
    
    
];
// creacion de un localStorage: y agregar los elementos de un array en él
// let carrito = JSON.parse(localStorage.getItem("dato")) ||[];


// retorna una plantilla los productos que le pasemos por una array
let listarProductos = () => {

    return (productos.innerHTML = items.map((x) => {
    let  {id, nombre, precio, imagen} = x;
    // let buscar = carrito.find((x) => x.id === id) || [];

    return    `   
    <div class="product-card">
            <div class="nombreproduct">
                <h3>${nombre}</h3>
            </div>
            <img src="${imagen}" alt="iphone 13">
            <div class="product-info">
              <div>
                <p>$${precio}</p>
              </div>
              <figure>
                <i class="bi bi-cart-check"></i>
              </figure>
            </div>
        </div>
    
    `; 
    }).join(""));
}

listarProductos();