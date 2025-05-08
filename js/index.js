
(function Inicio() {
    console.log("Estoy funcionando de manera correcta.");

    // Productos simulados
    const productos = [
        {
            id: "Abrigo_01",
            titulo: "Ropa de abrigo",
            imagen: "media/abrigo.jpg",
            categoria: { nombre: "Abrigo", id: "Abrigos" },
            precio: 20000
        },
        {
            id: "Abrigo_02",
            titulo: "Ropa de abrigo 2",
            imagen: "media/abrigo.jpg",
            categoria: { nombre: "Abrigo", id: "Abrigos" },
            precio: 25000
        },
        {
            id: "Abrigo_03",
            titulo: "Ropa de abrigo 3",
            imagen: "media/producto1.jpeg",
            categoria: { nombre: "Abrigo", id: "Abrigos" },
            precio: 30000
        }
    ];

    // Carrito: recuperamos del localStorage si existe
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const grid = document.getElementById("product-grid");
    const contadorCarrito = document.querySelector(".cantidad-carrito");

    // Cargar productos en el DOM
    function cargarProductos() {
        if (!grid) return;
        productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <button data-id="${producto.id}">Comprar</button>
            `;
            grid.appendChild(div);
        });
        agregarEventosBotones();
    }

    // Agregar eventos a los botones de compra
    function agregarEventosBotones() {
        const botones = document.querySelectorAll(".product-card button");
        botones.forEach(boton => {
            boton.addEventListener("click", e => {
                const idProducto = e.target.getAttribute("data-id");
                agregarAlCarrito(idProducto);
            });
        });
    }

    // Agregar producto al carrito
    function agregarAlCarrito(idProducto) {
        const producto = productos.find(p => p.id === idProducto);
        const itemEnCarrito = carrito.find(item => item.id === idProducto);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarContador();
        guardarCarrito();
    }

    // Actualizar número del contador en el header
    function actualizarContador() {
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        if (contadorCarrito) contadorCarrito.textContent = total;
    }

    // Guardar carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // En página carrito.html
    function mostrarCarrito() {
        const contenedor = document.getElementById("cart-grid");
        const totalSpan = document.getElementById("total-price");
        const vacio = document.getElementById("empty-cart-message");
        const checkout = document.getElementById("checkout-message");

        if (!contenedor) return; // No estamos en carrito.html

        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            vacio.style.display = "block";
            checkout.style.display = "none";
            totalSpan.textContent = "0";
            return;
        }

        vacio.style.display = "none";

        let total = 0;
        carrito.forEach(producto => {


            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.titulo}">
    <div class="cart-item-details">
        <h4>${producto.titulo}</h4>
        <p>Precio: $${producto.precio}</p>
        <p class="cart-item-quantity">Cantidad: ${producto.cantidad}</p>
    </div>
`;






            /*const div = document.createElement("div");
            div.classList.add("product-card");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${producto.precio * producto.cantidad}</p>
            `;*/
            contenedor.appendChild(div);
            total += producto.precio * producto.cantidad;
        });

        totalSpan.textContent = total;

        // Finalizar compra
        const btn = document.getElementById("checkout-button");
        btn.addEventListener("click", () => {
            carrito = [];
            guardarCarrito();
            mostrarCarrito();
            checkout.style.display = "block";
        });
    }

    // Inicializamos según página
    cargarProductos();
    mostrarCarrito();
    actualizarContador();

})();



