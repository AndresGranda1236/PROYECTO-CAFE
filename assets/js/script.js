document.addEventListener('DOMContentLoaded', () => {
  const carritoFlotante = document.getElementById('carrito-flotante');
  const panelCarrito = document.getElementById('panel-carrito');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecio = document.getElementById('total-precio');
  const enviarWhatsapp = document.getElementById('enviarWhatsapp');

  let carrito = [];

  // Mostrar panel del carrito
  carritoFlotante.addEventListener('click', () => {
    panelCarrito.classList.add('visible');
  });

  // Cerrar carrito
  cerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('visible');
  });

  // Añadir producto desde el panel principal
  document.querySelectorAll('.producto').forEach(prod => {
    if (prod.closest('#compra')) return;
    prod.addEventListener('click', () => {
      const nombre = prod.dataset.nombre;
      const precio = parseInt(prod.dataset.precio);
      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  // Añadir producto desde el panel del carrito
  document.querySelectorAll('#productos-disponibles .agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = btn.closest('.producto-carrito');
      const nombre = prod.dataset.nombre;
      const precio = parseInt(prod.dataset.precio);
      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  // Actualizar HTML del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
     li.innerHTML = `
  <div class="item-carrito">
    <span class="nombre">${item.nombre} - $${item.precio.toLocaleString()}</span>
    <button class="btn-eliminar" onclick="eliminarProducto(${index})" aria-label="Eliminar">🗑</button>
  </div>
`;

      listaCarrito.appendChild(li);
      total += item.precio;
    });

    totalPrecio.textContent = `$${total.toLocaleString()}`;
  }

  // Eliminar producto del carrito (lista)
  window.eliminarProducto = function(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  };

  // 🔹 Eliminar producto desde el panel de productos disponibles
  window.eliminarProductoPanel = function(boton) {
    const producto = boton.closest('.producto-carrito');
    const nombre = producto.dataset.nombre;
    carrito = carrito.filter(item => item.nombre !== nombre);
    producto.remove();
    actualizarCarrito();
  };

  // Enviar a WhatsApp
  enviarWhatsapp.addEventListener('click', () => {
    const nombreCliente = document.getElementById('nombreCliente').value;
    const cedulaCliente = document.getElementById('cedulaCliente').value;
    const direccionCliente = document.getElementById('direccionCliente').value;
    const telefonoCliente = document.getElementById('telefonoCliente').value;
    const ciudadCliente = document.getElementById('ciudadCliente').value;

    if (!nombreCliente || !cedulaCliente || !direccionCliente || !telefonoCliente || !ciudadCliente) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let mensaje = `🛒 Pedido de ${nombreCliente} (Cédula: ${cedulaCliente})\n📍 Dirección: ${direccionCliente}\n📞 Tel: ${telefonoCliente}\n🌆 Ciudad: ${ciudadCliente}\n\n`;

    carrito.forEach(item => {
      mensaje += `• ${item.nombre}: $${item.precio.toLocaleString()}\n`;
    });

    mensaje += `\n💰 Total: ${totalPrecio.textContent}`;
    const url = `https://wa.me/573226731446?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });
});

// Click en reels para abrir en nueva ventana
document.querySelectorAll('.reel').forEach(reel => {
  reel.addEventListener('click', () => {
    const url = reel.getAttribute('data-url');
    window.open(url, '_blank');
  });
});

// Scroll en productos
function scrollProductos(direction) {
  const container = document.getElementById('productosScroll');
  const scrollAmount = container.offsetWidth * 0.8;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner-descuento");
  const btnCerrar = document.getElementById("cerrar-banner");

  // Cierra el banner manualmente
  btnCerrar.addEventListener("click", () => {
    banner.style.display = "none";
  });

  // Cierra automáticamente después de 6 segundos
  setTimeout(() => {
    banner.style.display = "none";
  }, 4000);
});
