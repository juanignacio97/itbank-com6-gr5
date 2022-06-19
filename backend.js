window.addEventListener("load", () => {
   const api_url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';


async function getData() {
   const fetching = await fetch(api_url);
   const data = await fetching.json();
   let datos = document.getElementById("datos");
  let sacarultimo = data.pop();
  let sacarultimo2 = data.pop()

   console.log(data)
   datos.innerHTML = "";
  
   for (let casa of data){
      datos.innerHTML+= `
    
       <tr style="text-align: center;justify-content:center;border:2px solid red; class="table"> 
         <td style="text-align: center;justify-content:center;" >${casa.casa.nombre}</td>
         <td style="text-align: center;justify-content:center;" > <p>compra</p> ${casa.casa.compra}</td>
         <td style="text-align: center;justify-content:center;"> <p>venta</p>  ${casa.casa.venta}</td>
         <td style="text-align: center;justify-content:center;" > <p>variación</p> ${casa.casa.variacion}</td>
      </tr>
     
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
getData();
getFecha();
} )


