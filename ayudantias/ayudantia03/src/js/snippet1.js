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
// const header = d3.select('#select-this')
//                  .style('color', '#424bed')          // Podemos usar hex para determinar el color
//                  .style('text-style', 'italic')      // Podemos agregar cualquier estilo
//                  .style('text-align', 'center') 
//                  .text(`Estamos utilizando D3 v${d3.version}`);

///////////////////////////////////////////////
// Ya vimos como seleccionar un elemento ya existente y editarlo, pero obviamente nos 
// interesa también poder crear elementos en el DOM a través de javascript
// Para lograr esto, en primer lugar debemos hacer lo siguiente:
// 1. Seleccionar una sección del DOM
// 2. Agregar el elemento que queremos (esto funciona como un append en python - se agrega al final)

// ///////////////////////////////////////////////
// Vamos a agregar un elemento SVG. En primer lugar definiremos parametros generales
// const WIDTH  = 800;
// const HEIGHT = 500;

// const container = d3.select('body').append('div') // Creamos un div para que contenga el SVG (que no esté volando en el body)
//                                    .attr('align', 'center') // Lo centramos

// const svg = container.append('svg')
//                      .attr('width', WIDTH)
//                      .attr('height', HEIGHT)

// ///////////////////////////////////////////////            
// Ya tenemos creado un SVG en nuestro DOM, de dimensiones 800x500, pero en este minuto está vacío
// Agreguemos un círculo, 
// const radius = 10;

// const circle = svg.append('circle')
//                 .attr('cx', Math.floor(WIDTH/2)) // Coordena X del centro del circulo
//                 .attr('cy', Math.floor(HEIGHT/2)) // Coordena Y del centro del circulo
//                 .attr('r', radius)
//                 .style('fill', '#000');

// ///////////////////////////////////////////////
// Podemos aprovechar este metodo para generar un numero de circulos dentro de nuestro SVG que sigan cierto orden

// const n_circles = 5;

// const xscale = Math.floor(WIDTH / (n_circles + 1));
// const yscale = Math.floor(HEIGHT / (n_circles + 1));
// console.log(xscale, yscale)

// for (let i = 0; i < n_circles; i++) {
//     console.log(xscale * (i + 1), yscale * (i + 1), radium * (i + 1))
//     svg.append('circle')
//         .attr('cx', xscale * (i + 1))
//         .attr('cy', yscale * (i + 1))
//         .attr('r', radius * (i + 1))
//         .style('fill', '#000');
// }

/////////////////////////////////////////////////

// const radium2 = 3;

// const n_circles_x = 5;
// const n_circles_y = 5;

// const xscale = Math.floor(WIDTH / (n_circles_x + 1));
// const yscale = Math.floor(HEIGHT / (n_circles_y + 1));

// console.log(xscale, yscale);

// for (let i = 0; i < n_circles_x; i++) {
//     for (let j = 0; j < n_circles_y; j++) {
//         svg.append('circle')
//         .attr('cx', xscale * (i + 1))
//         .attr('cy', yscale * (j + 1))
//         .attr('r', radium2 * (i + j + 1))
//         .style('fill', 'green'); // los principales colores también se pueden representar con su nombre
//     }
// }

// // // Una de las tantas funcionalidades que tiene D3, es que es muy fácil interpolar valores, 
// // // gracias a las llamadas escalas lineares que tiene (hay de otros tipos), por ejemplo:

// const scale1 = d3.scaleLinear() // Genera una escala linear
//                  .domain([0, 10]) // Dominio va desde 0 a 10 (hay que ponerlo entre corchetes [])
//                  .range([0, 100]); // Recorrido va desde 0 a 100 (hay que ponerlo entre corchetes [])

// // ¿Que imprimen los siguientes logs?
// console.log(scale1(8.4));
// console.log(scale1(3));
// console.log(scale1(9.9));
// console.log(scale1(1));

// // También se pueden hacer escalas inversas:
// const scale2 = d3.scaleLinear()
//                  .domain([0, 10])
//                  .range([50, 0]);

// // Y estos logs, ¿Que imprimen?
// console.log(scale2(8.4));
// console.log(scale2(3));
// console.log(scale2(9.9));
// console.log(scale2(1));

// // Esto nos servirá mucho a futuro para los ejes de los gráficos, pero por ahora, 
// // ¿Qué uso le podemos dar a nuestros circulos?



// // Podemos crear una escala de colores, de manera que el color del circulo dependa de distintas variables

// var colorScale = d3.scaleLinear() // Genera una escala lineal, la que despues será llamada por colorScale(valor)
//                    .domain([0, n_circles_x + n_circles_y]) // El dominio (input) ira desde 0 a 10 en este caso
//                    .range(["red", "blue"]); // El recorrido (lo que saldrá de la función)

// for (let i = 0; i < n_circles_x; i++) {
//     for (let j = 0; j < n_circles_y; j++) {
//         svg.append('circle')
//         .attr('cx', xscale * (i + 1))
//         .attr('cy', yscale * (j + 1))
//         .attr('r', radium2 * (i + j + 1))
//         .style('fill', colorScale(i + j));
//     }
// }
