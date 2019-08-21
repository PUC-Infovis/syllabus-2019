let container = d3.select('body').append('div') // Creamos un div para que contenga el SVG (que no esté volando en el body)
                                    .attr('align', 'center') // Lo centramos

const WIDTH  = 800;
const HEIGHT = 500;

let svg = container.append('svg')
                        .attr('width', WIDTH)
                        .attr('height', HEIGHT)

/////////////////////////////////////////////////


let radium2 = 3;

let n_circles_x = 5;
let n_circles_y = 5;

let xscale = Math.floor(WIDTH / (n_circles_x + 1));
let yscale = Math.floor(HEIGHT / (n_circles_y + 1));

console.log(xscale, yscale);

for (let i = 0; i < n_circles_x; i++) {
    for (let j = 0; j < n_circles_y; j++) {
        svg.append('circle')
            .attr('cx', xscale * (i + 1))
            .attr('cy', yscale * (j + 1))
            .attr('r', radium2 * (i + j + 1))
            .style('fill', 'green'); // los principales colores también se pueden representar con su nombre
    }
}