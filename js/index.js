

const productos = [
  {
    id: "Abrigo_01",
    titulo: "Ropa de abrigo",
    imagen: "media/abrigo.jpg",
    categoria: {
        nombre: "Abrigo",
        id: "Abrigos",  

    }, 
    precio: 20000
  },
    {
        id: "Abrigo_02",
        titulo: "Ropa de abrigo",
        imagen: "media/abrigo.jpg",
        categoria: {
            nombre: "Abrigo",
            id: "Abrigos",  
    
        }, 
        precio: 20000
    },
    {
        id: "Abrigo_03",
        titulo: "Ropa de abrigo",
        imagen: "media/abrigo.jpg",
        categoria: {
            nombre: "Abrigo",
            id: "Abrigos",  
    
        }, 
        precio: 20000
    }
]


const contenedorProductos = document.querySelector("#product-grid");
const numCantidad = document.querySelector(".cantidad-carrito");
// const botonComprar = document.querySelectorAll(".boton-comprar");


function cargarProductos() {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.id}">
      <h3>${producto.titulo}</h3>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum tempora atque maxime nemo, aspernatur quae soluta provident voluptate vel nesciunt quod, a tempore deleniti saepe assumenda, ullam omnis ratione quo.</p>
      <button class="boton-comprar" >Comprar</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

cargarProductos();


// Agregar evento a los botones de comprar

const productosEnCarrito = [];

function agregarAlCarrito() {
    const botonesComprar = document.querySelectorAll(".boton-comprar");
    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const productoCard = boton.parentElement;
            const productoId = productoCard.querySelector("img").getAttribute("alt");
            const producto = productos.find((prod) => prod.id === productoId);
            
            if (producto) {
                productosEnCarrito.push(producto);
                console.log(productosEnCarrito);
                numCantidad.innerText = productosEnCarrito.length;
                //alert(`Agregaste ${producto.titulo} al carrito`);

            } else {
                console.error("Producto no encontrado");
            }
        // console.log(productoCard);
        // console.log(productoId);
        // console.log(producto);            
        });
    });
}
agregarAlCarrito();

/*
            {
        id: "Abrigo_03",
        titulo: "Ropa de abrigo",
        imagen: "media/abrigo.jpg",
        categoria: {
            nombre: "Abrigo",
            id: "Abrigos",  
    
        }, 
        precio: 20000
    }
              
*/
