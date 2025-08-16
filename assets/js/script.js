document.addEventListener('DOMContentLoaded', () => {
  const carritoFlotante = document.getElementById('carrito-flotante');
  const panelCarrito = document.getElementById('panel-carrito');
  const cerrarCarrito = document.getElementById('cerrar-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPrecio = document.getElementById('total-precio');
  const enviarWhatsapp = document.getElementById('enviarWhatsapp');

  // Restringir campos numéricos
  ["cedulaCliente", "telefonoCliente"].forEach(id => {
    document.getElementById(id).addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, ""); // Solo dígitos
    });
  });

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

      // 🔹 Verificar si ya existe
      let existente = carrito.find(item => item.nombre === nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ nombre, precio, cantidad: 1 });
      }
      actualizarCarrito();
    });
  });

  // Añadir producto desde el panel del carrito
  document.querySelectorAll('#productos-disponibles .agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = btn.closest('.producto-carrito');
      const nombre = prod.dataset.nombre;
      const precio = parseInt(prod.dataset.precio);

      let existente = carrito.find(item => item.nombre === nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ nombre, precio, cantidad: 1 });
      }
      actualizarCarrito();
    });
  });

  // Actualizar HTML del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="item-carrito">
          <span class="nombre">${item.nombre} - $${item.precio.toLocaleString()}</span>
          
          <div class="cantidad-control">
            <button onclick="cambiarCantidad(${index}, -1)">−</button>
            <span>${item.cantidad}</span>
            <button onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>

          <button class="btn-eliminar" onclick="eliminarProducto(${index})" aria-label="Eliminar">🗑</button>
        </div>
        <div class="subtotal">Subtotal: $${subtotal.toLocaleString()}</div>
      `;
      listaCarrito.appendChild(li);

      total += subtotal;
    });

    totalPrecio.textContent = `$${total.toLocaleString()}`;
  }

  // Cambiar cantidad (+ / -)
  window.cambiarCantidad = function(index, delta) {
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1); // Eliminar si llega a 0
    }

    actualizarCarrito();
  };

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
      mensaje += `• ${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toLocaleString()}\n`;
    });

    mensaje += `\n💰 Total: ${totalPrecio.textContent}`;

    const numero = "573226731446"; // Número de WhatsApp
    let url;

    // Detectar si es móvil o escritorio
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
    }

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
