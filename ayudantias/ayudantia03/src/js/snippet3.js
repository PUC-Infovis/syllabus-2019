// ///////////////////////////////////////////////
// Podemos aprovechar este metodo para generar un numero de circulos dentro de nuestro SVG que sigan cierto orden

const WIDTH  = 800;
const HEIGHT = 500;

// Agreguemos un círculo, 
const radius = 10;

const n_circles = 5;

let xscale = Math.floor(WIDTH / (n_circles + 1));
let yscale = Math.floor(HEIGHT / (n_circles + 1));
// console.log(xscale, yscale);

let container = d3.select('body').append('div') // Creamos un div para que contenga el SVG (que no esté volando en el body)
                                    .attr('align', 'center') // Lo centramos

let svg = container.append('svg')
                        .attr('width', WIDTH)
                        .attr('height', HEIGHT)

for (let i = 0; i < n_circles; i++) {
    console.log(xscale * (i + 1), yscale * (i + 1), radius * (i + 1));
    svg.append('circle')
        .attr('cx', xscale * (i + 1))
        .attr('cy', yscale * (i + 1))
        .attr('r', radius * (i + 1))
        .style('fill', '#000');
}