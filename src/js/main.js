const api_url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';   //API para las cotizaciones

let sectionCotizaciones = document.querySelector('#cotizacion-dolar .container .row');


//Función que agrega dinámicamente a la página contenido de cotizaciones
async function cotizacionDolar(){
   const fetching = await fetch(api_url);
   const data = await fetching.json();

   //Extrae el último elemento del array que contiene la fecha y hora de actualización
   let fecha = data.pop();
   //Extrae el último elemento del array que contiene una cotización sin nombre
   let dolar = data.pop();
   //Extrae la cotización del bitcoin que no aplica
   let bitcoin =data.splice(5, 1);
   console.log(data);

   //Pendiente agregar en formato
   //  <p>Variacion: ${caso.casa.variacion}</p>
   sectionCotizaciones.innerHTML = "";
   for (let caso of data) {
      let correccionDecimal =caso.casa.compra;
      console.log(typeof correccionDecimal !== "string");
      //tratando corregir que solo hayan 2 decimales, no hubo cambios
      if (typeof correccionDecimal !== "string") {
         correccionDecimal = Number(caso.casa.compra).toFixed(2);
      };
   sectionCotizaciones.innerHTML+= `
   <div class="col-12 col-sm-6 col-md-4">
      <div class="card text-center m-2">
         <div class="card-header">
            <i class="fa-solid fa-money-bill-wave" style="color:green"></i> 
            ${caso.casa.nombre.toUpperCase()}
         </div>
         <div class="row card-body">
            <div class="col-6 col-sm-12 col-xl-6">
                  <p class="card-text">COMPRA</p>
                  <h3 class="card-title">${correccionDecimal}</h3>
            </div>
            <div class="col-6 col-sm-12 col-xl-6">
                  <p class="card-text">VENTA</p>
                  <h3 class="card-title">${caso.casa.venta}</h3>
            </div>
         </div>
         <div class="card-footer text-muted">
         ACTUALIZADO: ${fecha.casa.fecha} ${fecha.casa.recorrido}
         </div>
      </div>
   </div>`
}};

//Función que agrega la funcionalidad de descargar el pdf del ID seleccionado. Utiliza la librería HTML2PDF
//HTML2PDF: junta las 2 librerías html2canvas y jsPDF
function descargarPdf() {
   const descargar = document.getElementById("cotizacion-dolar");

   html2pdf()
      .set({
         margin: 1,
         filename: "Cotizaciones.pdf",
         image: {
            type: "jpeg",
            quality: 0.90,
         },
         //Configuraciones del estilo del pdf (para mantener el original del HTML). Librería html2canvas
         html2canvas: {     
            scale: 7,
            letterRendering: true,
         },
         //Configuraciones del propio pdf. Librería jsPDF
         jsPDF: {           
            unit: "cm",
            format: "a4",
            orientation: "portrait",
         }
      })
      .from(descargar)
      .save()
      .finally();
};


async function saldoCuenta(){
   let saldoCuenta = document.querySelector('#saldo-cuenta .card');
   const fetching = await fetch('./src/data/saldoCuenta.json');
   const data = await fetching.json();

   saldoCuenta.innerHTML = `
   <div class="card-header d-flex align-items-center">
      <span class="me-auto fs-4 fw-semibold">Caja de Ahorro</span>
      <span class="text-muted">Último acceso: ${data.ultimo_acceso.fecha} ${data.ultimo_acceso.fecha}Hs</span>
   </div>
   <div class="card-body">
      <p class="card-text mb-3">
         <span class="fw-semibold">${data.tipo_de_cuenta}</span>
         &nbsp;
         <span>${data.id}</span>
      </p>
      <h4 class="card-text mb-2">$ <span class="fw-bold">${data.saldo.ars}</span></h4>

      <h5 class="card-text text-success mb-3">U$S <span class="fw-bold">${data.saldo.usd}</span></h5>

      <p class="card-text">CBU: <span class="fw-semibold">${data.cbu}</span></p>

      <p class="card-text">Alias: <span class="fw-semibold">${data.alias}</span></p>
   </div>
   `;
};
   


document.addEventListener("DOMContentLoaded", saldoCuenta, cotizacionDolar, false);
