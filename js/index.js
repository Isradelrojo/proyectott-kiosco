
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


    /* Utilizacion de javascript para hacer interactiva la pagina de contacto. */

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("form-contacto");
    
        const nombreInput = document.getElementById("nombre");
        const emailInput = document.getElementById("email");
        const asuntoInput = document.getElementById("asunto");
        const mensajeInput = document.getElementById("mensaje");
        const sugerenciasMensaje = document.getElementById("sugerencias-mensaje");
    
        // Sugerencias predefinidas para el campo "asunto"
        const sugerenciasAsunto = [
            "Consulta sobre productos",
            "Problema con mi pedido",
            "Reclamo o devolución",
            "Solicitud de contacto",
            "Otro motivo"
        ];
    
        // Autocompletado básico para "asunto"
        asuntoInput.addEventListener("input", () => {
            const valor = asuntoInput.value.toLowerCase();
            const sugerencia = sugerenciasAsunto.find(s => s.toLowerCase().startsWith(valor));
            if (sugerencia && valor.length > 1) {
                asuntoInput.value = sugerencia;
            }
        });
    
        // Sugerencias en vivo para "mensaje"
        mensajeInput.addEventListener("input", () => {
            const texto = mensajeInput.value.toLowerCase();
            let sugerencia = "";
    
            if (texto.includes("hola") && !texto.includes("buen")) {
                sugerencia = "¿Querías decir: 'Hola, buenos días. Me gustaría...'?";
            } else if (texto.includes("precio")) {
                sugerencia = "¿Querías consultar sobre el precio de un producto?";
            } else if (texto.length > 100) {
                sugerencia = "Tu mensaje es muy claro, ¡podés enviarlo!";
            } else {
                sugerencia = "";
            }
    
            sugerenciasMensaje.textContent = sugerencia;
        });
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
    
            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const asunto = asuntoInput.value.trim();
            const mensaje = mensajeInput.value.trim();
    
            if (!nombre || !email || !mensaje) {
                alert("Por favor completá todos los campos obligatorios.");
                return;
            }
    
            console.log("Formulario enviado:");
            console.log("Nombre:", nombre);
            console.log("Email:", email);
            console.log("Asunto:", asunto);
            console.log("Mensaje:", mensaje);
    
            alert("Gracias por tu mensaje. Pronto nos pondremos en contacto.");
            form.reset();
            sugerenciasMensaje.textContent = "";
        });
    });

    /* Vamos a cargar las funciones de los botones de cerrar y abrir del hamburguesa.*/
    const boton_abrir = document.querySelector("#abrir")
    const boton_cerrar = document.querySelector("#cerrar")
    const nav = document.querySelector("#nav-list")
    
    boton_abrir.addEventListener("click", ()=>{
        nav.classList.add("visible");
        boton_abrir.classList.add("hidden")
    })

    boton_cerrar.addEventListener("click", ()=>{
        nav.classList.remove("visible")
        boton_abrir.classList.remove("hidden")
    })

    // Inicializamos según página
    cargarProductos();
    mostrarCarrito();
    actualizarContador();

})();



