let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    const reseñasGuardadas = JSON.parse(localStorage.getItem("reseñas")) || {};

    productosElegidos.forEach(producto => {
        console.log("Ruta de imagen:", producto.imagen); // 👀 Agrega este console.log
        const div = document.createElement("div");
        div.classList.add("producto");
        const reseñas = reseñasGuardadas[producto.id] || [];
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>

             <!-- Reseñas -->
            <div class="reseñas">
                <h4>Reseñas</h4>
                <div id="lista-reseñas-${producto.id}" class="lista-reseñas">
                 ${reseñas.map(texto => `<p>🗨️ ${texto}</p>`).join("")}
                 </div>
                <textarea id="input-reseña-${producto.id}" placeholder="Escribe tu reseña..."></textarea><br>
                <button onclick="agregarReseña('${producto.id}')">Enviar Reseña</button>
      
            
            
                </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function agregarReseña(id) {
    const textarea = document.getElementById("input-reseña-" + id);
    const texto = textarea.value.trim();
    const contenedor = document.getElementById("lista-reseñas-" + id);
  
    if (texto !== "") {
      // Mostrar la nueva reseña en pantalla
      const nuevaReseña = document.createElement("p");
      nuevaReseña.textContent = "🗨️ " + texto;
      contenedor.appendChild(nuevaReseña);
  
      // Guardar en localStorage
      const reseñas = JSON.parse(localStorage.getItem("reseñas")) || {};
      if (!reseñas[id]) {
        reseñas[id] = [];
      }
      reseñas[id].push(texto);
      localStorage.setItem("reseñas", JSON.stringify(reseñas));
  
      // Limpiar textarea
      textarea.value = "";
    }
  }
  

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simular envío correcto
      Toastify({
        text: "¡Mensaje enviado con éxito! 😊",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
          color: "#000",
        },
      }).showToast();

      // Resetear el formulario
      form.reset();
    });
  }
});



// Contador de visitas con countapi
fetch("https://api.counterapi.dev/v1/hit/jkarl03.github.io/Papel-Tinta")
  .then(res => res.json())
  .then(data => {
    const el = document.getElementById('contador-visitas');
    if (el) {
      el.textContent = data.count; // "count" en lugar de "value"
    }
  })
  .catch(error => {
    console.error('Error al obtener el contador:', error);
    const el = document.getElementById('contador-visitas');
    if (el) el.textContent = '—';
  });

