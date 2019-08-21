// Este snippet contiene algunas herramientas básicas que manipulan el DOM a través de D3

// En primer lugar, imprimiremos la versión de d3 en consola para mostrar que la librería está importada

console.log(d3.version);

// En primer lugar, seleccionaremos un elemento ya creado en el archivo HTML (index.html), y editaremos su contenido y estilo

///////////////////////////////////////////////

// let header = d3.select('#select-this');            // Seleccionamos por 'id'.
// header.style('color', 'blue');                       // Podemos cambiar el estilo, siguiendo el formato css
// header.text(`Estamos utilizando D3 v${d3.version}`);  // Cambia el texto.


///////////////////////////////////////////////
// Cuando realizamos una acción como ".style()", este retorna el mismo objeto
// Por lo tanto, podemos concatenar las acciones, y el resultado será el mismo que en el caso anterior
let header = d3.select('#select-this')
                 .style('color', '#424bed')          // Podemos usar hex para determinar el color
                 .style('text-align', 'center') 
                 .text(`Estamos utilizando D3 v${d3.version}`);
