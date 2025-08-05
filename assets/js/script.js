const carritoFlotante = document.getElementById('carrito-flotante');
const panelCarrito = document.getElementById('panel-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalPrecio = document.getElementById('total-precio');
const enviarWhatsapp = document.getElementById('enviarWhatsapp');

let carrito = [];

// Añadir producto al carrito
document.querySelectorAll('.producto').forEach(prod => {
  prod.addEventListener('click', () => {
    const nombre = prod.dataset.nombre;
    const precio = parseInt(prod.dataset.precio);
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

// Mostrar carrito
carritoFlotante.addEventListener('click', () => {
  panelCarrito.classList.add('visible');
});

// Cerrar carrito
cerrarCarrito.addEventListener('click', () => {
  panelCarrito.classList.remove('visible');
});

// Actualizar lista carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()} 
      <button class="btn-eliminar" onclick="eliminarProducto(${index})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio;
  });
  totalPrecio.textContent = `$${total.toLocaleString()}`;
}

// Eliminar producto
function eliminarProducto(index) {
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

  let mensaje = `Pedido de ${nombreCliente} (Cédula: ${cedulaCliente})\n`;
  mensaje += `Dirección: ${direccionCliente}\n`;
  mensaje += `Teléfono: ${telefonoCliente}\n`;
  mensaje += `Ciudad: ${ciudadCliente}\n\n`;
  carrito.forEach(item => {
    mensaje += `- ${item.nombre}: $${item.precio.toLocaleString()}\n`;
  });
  mensaje += `Total: ${totalPrecio.textContent}`;

  const url = `https://wa.me/573052794613?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});
document.querySelectorAll(".youtube-video").forEach(el => {
  const videoId = el.dataset.id;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Poner la imagen de fondo como thumbnail
  el.style.backgroundImage = `url(${thumbnail})`;

  // Reemplazar por el iframe al hacer clic
  el.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    el.innerHTML = "";
    el.appendChild(iframe);
  });
});
