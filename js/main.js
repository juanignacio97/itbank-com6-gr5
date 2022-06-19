const api_url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

let sectionCotizaciones=document.querySelector('#cotizacion-dolar .container .row');



async function getData() {
   const fetching = await fetch(api_url);
   const data = await fetching.json();
   console.log("data original")
   console.log(data);
   let datos = document.getElementById("datos");

   let fecha = data.pop();
   sacarultimo = data.pop();
   let bitcoin =data.splice(5, 1);

   console.log(data);

   /*
for (let casa of data){
      datos.innerHTML+= `
    
       <tr style="text-align: center;justify-content:center;border:2px solid red; class="table"> 
         <td style="text-align: center;justify-content:center;" >${casa.casa.nombre}</td>
         <td style="text-align: center;justify-content:center;" > <p>compra</p> ${casa.casa.compra}</td>
         <td style="text-align: center;justify-content:center;"> <p>venta</p>  ${casa.casa.venta}</td>
         <td style="text-align: center;justify-content:center;" > <p>variación</p> ${casa.casa.variacion}</td>
      </tr>    
` 
};
*/


//Pendiente agregar en formato
//  <p>Variacion: ${caso.casa.variacion}</p>

for (let caso of data) {
   //trtando corregir que solo hayan 2 decimales
   let correccionDecimal =caso.casa.compra;
   if (typeof correccionDecimal != "string") {
      correccionDecimal = Number(caso.casa.compra).toFixed(2)
   }
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
`

}


// el tr afecta a toda la casilla y el td solo a las partes, dejo marcado con un borde para la edición 
// hace el fetch de los valores del dolar
}
async function getFecha(){
   const fetching2 = await fetch(api_url);
   const data2 = await fetching2.json();

   console.log(data2);
   document.getElementById("fecha").textContent= data2[8].casa.fecha;
   // trae la fecha solamente por que estaba en el ultimo objeto y si no me aparecia en la lista de los precios con valores indefinidos
}

getFecha()


document.addEventListener("DOMContentLoaded", getData, false);