// Lista completa de productos
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

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");

  productos.forEach((producto,index)=>{
    let controlesHTML = "";

    if(producto.fijo){
      controlesHTML = `
        <button onclick="ponerFijo(${index},${producto.fijo})">📌</button>
        <input type="text" id="cantidad-${index}" class="cantidad" readonly value="0">
      `;
    } else {
      controlesHTML = `
        <div class="controles">
          <button onclick="cambiarCantidad(${index},-1)">➖</button>
          <input type="text" id="cantidad-${index}" class="cantidad" readonly value="0">
          <button onclick="cambiarCantidad(${index},1)">➕</button>
        </div>
      `;
    }

    contenedor.innerHTML += `
      <div class="card">
        <div class="producto">
          <div class="nombre">
            <b>${producto.nombre}</b><br>
            <small>${producto.fijo ? "Fijo: "+producto.fijo : producto.maximo ? "Máximo: "+producto.maximo : "Sin límite"}</small>
          </div>
          ${controlesHTML}
        </div>
      </div>
    `;
  });
});


function cambiarCantidad(index,delta){
  const producto = productos[index];
  const input = document.getElementById(`cantidad-${index}`);
  let valor = parseInt(input.value,10);

  if(isNaN(valor)) valor = 0;
  valor += delta;

  if(producto.maximo){
    if(valor > producto.maximo) valor = producto.maximo;
    if(valor < 0) valor = 0;
  } else {
    if(valor < 0) valor = 0;
  }

  input.value = valor;
}

function ponerFijo(index,cantidad){
  const input = document.getElementById(`cantidad-${index}`);
  input.value = cantidad;
}

function guardarPedido(){
  const nombre = document.getElementById("nombre").value.trim();
  const adicional = document.getElementById("adicional").value.trim();

  if(!nombre){
    alert("Por favor ingresa tu nombre.");
    return;
  }

  const pedido = {
    tecnico: nombre,
    adicional: adicional,
    materiales: [],
    fecha: new Date().toLocaleString(),
    estado: "Pendiente"
  };

  // Recorremos los productos y guardamos cantidades
  productos.forEach((producto,index)=>{
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value,10);
    if(cantidad > 0){
      pedido.materiales.push(`${producto.codigo} x${cantidad}`);
    }
  });

  // Guardamos en localStorage
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.unshift(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  alert("✅ Pedido guardado correctamente");

}
function mostrarProductos() {
  const contenedor = document.getElementById("productos");

  productos.forEach((producto,index)=>{
    let controlesHTML = "";

    if(producto.fijo){
      controlesHTML = `
        <button onclick="ponerFijo(${index},${producto.fijo})">📌</button>
        <input type="text" id="cantidad-${index}" class="cantidad" readonly value="0">
      `;
    } else {
      controlesHTML = `
        <div class="controles">
          <button onclick="cambiarCantidad(${index},-1)">➖</button>
          <input type="text" id="cantidad-${index}" class="cantidad" readonly value="0">
          <button onclick="cambiarCantidad(${index},1)">➕</button>
        </div>
      `;
    }

    contenedor.innerHTML += `
      <div class="card">
        <div class="producto">
          <div class="nombre">
            <b>${producto.nombre}</b><br>
            <small>${producto.fijo ? "Fijo: "+producto.fijo : producto.maximo ? "Máximo: "+producto.maximo : "Sin límite"}</small>
          </div>
          ${controlesHTML}
        </div>
      </div>
    `;
  });
}

