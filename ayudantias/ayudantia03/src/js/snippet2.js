///////////////////////////////////////////////
// Ya vimos como seleccionar un elemento ya existente y editarlo, pero obviamente nos 
// interesa también poder crear elementos en el DOM a través de javascript
// Para lograr esto, en primer lugar debemos hacer lo siguiente:
// 1. Seleccionar una sección del DOM
// 2. Agregar el elemento que queremos (esto funciona como un append en python - se agrega al final)
// Para SVG, se agrega en la posición que se le entregue, dentro de las dimensiones del SVG

// ///////////////////////////////////////////////
// Vamos a agregar un elemento SVG. En primer lugar definiremos parametros generales
const WIDTH  = 800;
const HEIGHT = 500;

let container = d3.select('body').append('div') // Creamos un div para que contenga el SVG (que no esté volando en el body)
                                    .attr('align', 'center') // Lo centramos

let svg = container.append('svg')
                        .attr('width', WIDTH)
                        .attr('height', HEIGHT)

// ///////////////////////////////////////////////            
// Ya tenemos creado un SVG en nuestro DOM, de dimensiones 800x500, pero en este minuto está vacío

let radius = 10;

let circle = svg.append('circle')
                    .attr('cx', Math.floor(WIDTH/2)) // Coordena X del centro del circulo
                    .attr('cy', Math.floor(HEIGHT/2)) // Coordena Y del centro del circulo
                    .attr('r', radius) // Radio del círculo
                    .style('fill', '#000000'); // Color de relleno del círculo (#000000 es negro)