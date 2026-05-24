// Lista completa de productos con nombre y código
const productos = [
  { nombre:"ATADOR DE IDENTIFICACION DE ABONADO", codigo:"1002950", maximo:10 },
  { nombre:"CABLE COAXIAL BLANCO RG-6 S/MENSAJERO", codigo:"1004705", fijo:305 },
  { nombre:"CABLE COAXIAL RG-6 AUTOSOPORTADO", codigo:"1003101", fijo:305 },
  { nombre:"CABLE UTP CAT5E FTP 4PR/24AWG", codigo:"1004692", fijo:100 },
  { nombre:"CABLE HDMI CHD1-6 MALE TO MALE 2M", codigo:"1004838", maximo:6 },
  { nombre:"CONTROL REMOTO AN-4803 ECOSS", codigo:"1051697", maximo:6 },
  { nombre:"CONECTOR DE CONTINUIDAD RG6 EX6XL-PLUS", codigo:"1062712", maximo:30 },
  { nombre:"CONECTOR PLUG RJ-45", codigo:"1002900", maximo:16 },
  { nombre:"DIVISOR INTERIOR 2 VIAS", codigo:"1003254", maximo:3 },
  { nombre:"DIVISOR INTERIOR 3 VIAS", codigo:"1003253", maximo:3 },
  { nombre:"ROSETA TELEFONICA CON GEL", codigo:"1004529", maximo:2 },
  { nombre:"SUJETADOR DE ANCLAJE", codigo:"1004521", maximo:6 },
  { nombre:"TARUGO NYLON 3/8 NARANJA", codigo:"MATE-0020", maximo:6 },
  { nombre:"SUJETADOR DE TRAMO-CHAPA Q", codigo:"1004520", maximo:6 },
  { nombre:"CONECTOR FIBRA OPTICA FTTH PPC", codigo:"1066116", maximo:10 },
  { nombre:"ROSETA ATB3101 SIN PIGTAIL", codigo:"1042681", maximo:5 },
  { nombre:"CONTROL REMOTO C3401 ZTE", codigo:"1063890", maximo:6 },
  { nombre:"CABLE FO FASTCONNECT DROP 50M", codigo:"1062883", maximo:2 },
  { nombre:"CABLE FO FASTCONNECT DROP 80M", codigo:"1062884", maximo:2 },
  { nombre:"CABLE FO FASTCONNECT DROP 100M", codigo:"1062885", maximo:2 },
  { nombre:"CABLE FO FASTCONNECT DROP 150M", codigo:"1062886", maximo:2 },
  { nombre:"CABLE FO FASTCONNECT DROP 220M", codigo:"1062887", maximo:1 },
  { nombre:"CABLE FO FASTCONNECT DROP 300M", codigo:"1063812", maximo:1 },
  { nombre:"TELEFONO ECS622 ECOSS", codigo:"1053621", maximo:4 },
  { nombre:"DECODIFICADOR MOTOROLA HD DCX-525", codigo:"4007984", maximo:5 },
  { nombre:"MODEM SAGEMCOM V2.2 3686 24X8 3.0 S/BAT", codigo:"4045541" },
  { nombre:"MODEM ARRIS TG2482 24X8 3.0 S/BAT", codigo:"4048528" },
  { nombre:"MODEM INFINITY 601 32X8 3.1 CASTLENET", codigo:"4074174" },
  { nombre:"MODEM SAGEMCOM F3890V3 32X8SB DOCSIS 3.1", codigo:"4050441" },
  { nombre:"MODEM ARRIS TG3442A 32x8 3.1", codigo:"4059271" },
  { nombre:"ROUTER F6600P 180000493829 ZTE", codigo:"4071122" },
  { nombre:"ROUTER ONT HG8145X6-13 50088770 HUAWEI", codigo:"4076358" },
  { nombre:"ROUTER K562E-10 50087708 HUAWEI", codigo:"4073653" },
  { nombre:"REPETIDOR ZXHN H3601P 180000528400 ZTE", codigo:"4076224" },
  { nombre:"DECODIFICADOR ZXV10 B866V2-H-RCU ZTE", codigo:"4076547" },
  { nombre:"SWITCH D-LINK DGS-1008A", codigo:"4068259" },
  { nombre:"SWITCH 8 PUERTOS FT8002SW FHTEK", codigo:"4074656" }
];

// Mostrar pedidos en la página (nombre + cantidad)
function mostrarPedidos(){
  const contenedor = document.getElementById("tablaPedidos");
  contenedor.innerHTML = "";

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if(pedidos.length === 0){
    contenedor.innerHTML = "<p>No hay pedidos guardados.</p>";
    return;
  }

  // Separar pedidos por estado
  const pendientes = pedidos.filter(p => p.estado === "Pendiente");
  const hechos = pedidos.filter(p => p.estado === "Hecho");

  // Renderizar pendientes
  contenedor.innerHTML += "<h2>📌 Pendientes</h2>";
  pendientes.forEach((p,index)=>{
    contenedor.innerHTML += renderPedido(p,index);
  });

  // Renderizar hechos
  contenedor.innerHTML += "<h2>✅ Hechos</h2>";
  hechos.forEach((p,index)=>{
    contenedor.innerHTML += renderPedido(p,index);
  });
}

// Función auxiliar para renderizar un pedido
function renderPedido(p,index){
  let bloque = `
    <div class="pedido-bloque">
      <h3>👷 Técnico: ${p.tecnico} - ${p.estado}</h3>
      <p><b>Fecha:</b> ${p.fecha}</p>
      <ul>
  `;

  p.materiales.forEach(m=>{
    const partes = m.split(" x");
    const codigo = partes[0];
    const cantidad = partes[1];
    const producto = productos.find(prod => prod.codigo === codigo);
    const nombre = producto ? producto.nombre : codigo;
    bloque += `<li>${nombre} - ${cantidad}</li>`;
  });

  bloque += "</ul>";

  if(p.adicional && p.adicional.trim() !== ""){
    bloque += `<p><b>📝 Adicional:</b> ${p.adicional}</p>`;
  }

  bloque += `
    <button onclick="copiarPedido(${index})">📋 Copiar</button>
    <button onclick="marcarHecho(${index})">✅ Hecho</button>
    <button onclick="eliminarPedido(${index})">🗑️ Eliminar</button>
  </div>
  `;

  return bloque;
}


// Copiar pedido en formato código*cantidad
function copiarPedido(index){
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const pedido = pedidos[index];

  let texto = "";
  pedido.materiales.forEach(m=>{
    const partes = m.split(" x");
    const codigo = partes[0];
    const cantidad = partes[1];
    texto += `${codigo}*${cantidad}\n`;
  });

  navigator.clipboard.writeText(texto);
  alert("Pedido copiado al portapapeles");
}

// Marcar pedido como hecho
function marcarHecho(index){
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos[index].estado = "Hecho";
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  mostrarPedidos();
}

// Eliminar pedido
function eliminarPedido(index){
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.splice(index,1);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  mostrarPedidos();
}

// Mostrar pedidos al cargar
mostrarPedidos();
