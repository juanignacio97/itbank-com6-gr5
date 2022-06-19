const api_url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

let sectionCotizaciones=document.querySelector('#cotizacion-dolar .container .row');

async function cotizacionDolar(){
   const fetching = await fetch(api_url);
   const data = await fetching.json();
   console.log("data original");
   console.log(data);
   let datos = document.getElementById("datos");

   let fecha = data.pop();
   let dolar = data.pop();
   let bitcoin =data.splice(5, 1);

   console.log(data);

   //Pendiente agregar en formato
   //  <p>Variacion: ${caso.casa.variacion}</p>

   for (let caso of data) {
      //tratando corregir que solo hayan 2 decimales, no hubo cambios
      let correccionDecimal =caso.casa.compra;
      if (typeof correccionDecimal != "string") {
         correccionDecimal = Number(caso.casa.compra).toFixed(2)
      };
      sectionCotizaciones.innerHTML+= `
      <div class="col-6 col-lg-4 col-md-4">
         <div class="card text-center m-2">
            <div class="card-header">
               <i class="fa-solid fa-money-bill-wave" style="color:green"></i> 
               ${caso.casa.nombre.toUpperCase()}
            </div>
            <div class="row card-body">
               <div class="col-6">
                     <p class="card-text">COMPRA</p>
                     <h3 class="card-title">${correccionDecimal}</h3>
               </div>
               <div class="col-6">
                     <p class="card-text">VENTA</p>
                     <h3 class="card-title">${caso.casa.venta}</h3>
               </div>
            </div>
            <div class="card-footer text-muted">
            ACTUALIZADO: ${fecha.casa.fecha} ${fecha.casa.recorrido}
            </div>
         </div>
      </div>
`}};

document.addEventListener("DOMContentLoaded", cotizacionDolar, false);