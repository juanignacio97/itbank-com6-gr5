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

document.addEventListener("DOMContentLoaded", cotizacionDolar, false);

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

function actualizar(){
   sectionCotizaciones.innerHTML="";
   cotizacionDolar();
};

document.addEventListener("DOMContentLoaded", cotizacionDolar, false);
