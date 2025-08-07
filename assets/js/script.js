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

  // Añadir producto
  document.querySelectorAll('.producto').forEach(prod => {
    prod.addEventListener('click', () => {
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
        ${item.nombre} - $${item.precio.toLocaleString()}
        <button class="boton-eliminar" onclick="eliminarProducto(${index})">❌</button>
      `;
      listaCarrito.appendChild(li);
      total += item.precio;
    });

    totalPrecio.textContent = `$${total.toLocaleString()}`;
  }

  // Eliminar producto
  window.eliminarProducto = function(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

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
    const url = `https://wa.me/573052794613?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });

  // Reels de Instagram ya se muestran automáticamente con el script embed.js
});
