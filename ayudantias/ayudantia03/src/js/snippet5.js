let container = d3.select('body').append('div') // Creamos un div para que contenga el SVG (que no esté volando en el body)
                                    .attr('align', 'center') // Lo centramos

const WIDTH  = 800;
const HEIGHT = 500;

let svg = container.append('svg')
                        .attr('width', WIDTH)
                        .attr('height', HEIGHT)

// // // Una de las tantas funcionalidades que tiene D3, es que es muy fácil interpolar valores, 
// // // gracias a las llamadas escalas lineares que tiene (hay de otros tipos), por ejemplo:

let scale1 = d3.scaleLinear() // Genera una escala linear
                 .domain([0, 10]) // Dominio va desde 0 a 10 (hay que ponerlo entre corchetes [])
                 .range([0, 100]); // Recorrido va desde 0 a 100 (hay que ponerlo entre corchetes [])

// // // ¿Que imprimen los siguientes logs?
console.log(scale1(8.4));
console.log(scale1(3));
console.log(scale1(9.9));
console.log(scale1(1));

// // También se pueden hacer escalas inversas:
let scale2 = d3.scaleLinear()
                 .domain([0, 10])
                 .range([50, 0]);

// // Y estos logs, ¿Que imprimen?
console.log(scale2(8.4));
console.log(scale2(3));
console.log(scale2(9.9));
console.log(scale2(1));

// // Esto nos servirá mucho a futuro para los ejes de los gráficos, pero por ahora, 
// // ¿Qué uso le podemos dar a nuestros circulos?


let radium2 = 3;

let n_circles_x = 5; // Prueben cambiando estos valores, que pasa?
let n_circles_y = 5;

let xscale = Math.floor(WIDTH / (n_circles_x + 1));
let yscale = Math.floor(HEIGHT / (n_circles_y + 1));

// // Podemos crear una escala de colores, de manera que el color del circulo dependa de distintas variables

var colorScale = d3.scaleLinear() // Genera una escala lineal, la que despues será llamada por colorScale(valor)
                   .domain([0, (n_circles_x + n_circles_y) / 2, n_circles_x + n_circles_y]) // El dominio (input) ira desde 0 a 10 en este caso
                   .range(["red", "yellow", "blue"]); // El recorrido (lo que saldrá de la función)

for (let i = 0; i < n_circles_x; i++) {
    for (let j = 0; j < n_circles_y; j++) {
        svg.append('circle')
            .attr('cx', xscale * (i + 1))
            .attr('cy', yscale * (j + 1))
            .attr('r', radium2 * (i + j + 1))
            .style('fill', colorScale(i + j));
        }
}