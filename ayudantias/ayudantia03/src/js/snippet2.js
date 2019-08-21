// Ya vimos algunas herramientas básicas de como manejar el DOM y agregar elementos a través de D3
// Pero nos falta tal vez lo más importante: Integrar datos al DOM
// Para eso usaremos un json que contiene información de todos los Pokemon® existentes
// Lo bueno de D3 para esto, es que tiene métodos muy faciles para leer estos archivos (y también los csv):


// https://github.com/onury/invert-color

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

const typeColor = {
                "Normal": "#A8A77A",
                "Fire":  "#EE8130",
                "Water":  "#6390F0",
                "Electric":  "#F7D02C",
                "Grass":  "#7AC74C",
                "Ice":  "#96D9D6",
                "Fighting":  "#C22E28",
                "Poison":  "#A33EA1",
                "Ground":  "#E2BF65",
                "Flying":  "#A98FF3",
                "Psychic":  "#F95587",
                "Bug":  "#A6B91A",
                "Rock":  "#B6A136",
                "Ghost":  "#735797",
                "Dragon":  "#6F35FC",
                "Dark":  "#705746",
                "Steel":  "#B7B7CE",
                "Fairy":  "#D685AD"
            }

// d3.json("../../data/pokedex.json").then(function(data) {
//     console.log(data);
//     let pokemons = d3.select("body").selectAll("div")
//                     .data(data)
//                     .enter()
//                     .append("div")
//                         .attr("class", "pokemon")
//                         .attr("id", "pkmn")
//                         .style("background-color", (d) => {
//                             // console.log(d["type"][0]);
//                             // console.log(typeColor[d["type"][0]]);
//                             return typeColor[d["type"][0]];
//                         })
//                         .style("color", (d) => {
//                         //     // console.log(d["type"][0]);
//                         //     // console.log(typeColor[d["type"][0]]);
//                             return invertColor(typeColor[d["type"][0]], true);
//                         })
//                         .text(d => {
//                             // console.log(d["name"]["english"]);    
//                             return `#${d["id"]} - ${d["name"]["english"]}`;
//                         })
//                         .on("click", d => {window.open(`https://www.pokemon.com/es/pokedex/${d["id"]}`)})
//                         .on('mouseover', (d, i , all) =>{
//                             // Buscamos todos los que no son el donde está el mouse
//                             d3.selectAll('#pkmn').filter(pkmn => pkmn != d).style("opacity", 0.2);
//                             })
//                         .on('mouseout', (_, i, all) => {
//                             d3.selectAll('#pkmn').style("opacity", 1)
//                         });
//   });

const WIDTH  = 1500;
// const HEIGHT = 500;

let MySvg = d3.select("body").append('svg')
                             .attr('class', 'pkmnSVG')
                             .attr('width', WIDTH)


d3.json("../../data/pokedex.json").then(function(data) {
    // console.log(data);

    const x_elements = 5;

    const x_pad = Math.floor(WIDTH / (x_elements + 2));
    const y_pad = 200;

    const HEIGHT = y_pad * (Math.floor(data.length / x_elements) + 2);

    console.log(HEIGHT);
    
    MySvg.attr('height', HEIGHT);

    console.log(x_pad, y_pad);

    // Esto es un "preprocesamiento" para simplificar el código futuro

    data.forEach(pokemon => {
        let index = pokemon["id"] - 1
        let xcoord = ((index % x_elements) + 1) * (x_pad);
        let ycoord = (Math.floor(index / x_elements) + 1) * y_pad;
        let r = pokemon["base"]["HP"] / 2;
        // console.log(pokemon["id"], xcoord, ycoord, r)
        pokemon["circledata"] = {
            "cx": xcoord,
            "cy": ycoord,
            "r": r
        };
        // console.log(pokemon);
    });
    // https://stackoverflow.com/questions/11857615/placing-labels-at-the-center-of-nodes-in-d3-js
    let nodes = MySvg.append("g")
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(data)
                    .enter()
                    // Agregar un elemento g por cada nodo (dato, pokemon).
                    .append("g")
                        // Posicionar el elemento g dónde queremos que esté el circulo.
                        .attr("transform", d => {return "translate(" + d["circledata"].cx + "," + d["circledata"].cy + ")";});

    let circles = nodes.append("circle") // Agregar un circulo a cada elemento
                            .attr("class", "node")
                            // .attr("cx", d => {return d["circledata"].cx})
                            // .attr("cy", d => {return d["circledata"].cy})
                            .attr("r", d => {return d["circledata"].r})
                            .style("fill", (d) => {
                                        // console.log(d["type"][0]);
                                        // console.log(typeColor[d["type"][0]]);
                                        return typeColor[d["type"][0]];
                                    })
    let texts = nodes.append("text")
                            .attr("class", "label")
                            .attr("text-anchor", "middle")
                            .style("color", d => {
                                // console.log(d["type"][0]);
                                // console.log(typeColor[d["type"][0]]);
                                return invertColor(typeColor[d["type"][0]], true);
                                    })
                            .attr("font-size", d => {return Math.floor(d["circledata"].r / 5)})
                            .text(d => {  
                                        return `#${d["id"]} - ${d["name"]["english"]}`;
                                    })

    // Ahora agregaremos MouseEvents a nuestros elementos

    nodes.on("click", d => {window.open(`https://www.pokemon.com/es/pokedex/${d["id"]}`)})
         .on("mouseover", (d, i, all) => {
            // Buscamos todos circulos los que no son el donde está el mouse    
                circles.filter(c => c != d).transition()
                                            .style("opacity", 0.2); // Les bajamos la opacidad a los circulos
                texts.filter(t => t != d).transition()
                                            .style("opacity", 0.2); // Les bajamos la opacidad
                circles.filter(c => c == d).transition() // Seleccionamos este elemento
                                            .attr("r", c => c["circledata"].r * 2);

                texts.filter(t => t == d).transition()
                                            .attr('background-color', 'magenta')
                                            .attr("font-size", t => Math.floor(t["circledata"].r / 5) * 2);    
                    
                                                    
            })
         .on("mouseout", (d, i, all) => {
            // Buscamos todos circulos los que no son el donde está el mouse
                    circles.filter(c => c != d).transition()
                                .style("opacity", 1); // Les bajamos la opacidad a los circulos
                    texts.filter(c => c != d).transition()
                                .style("opacity", 1); // Les bajamos la opacidad
                    circles.filter(c => c == d).transition() // Seleccionamos este elemento
                                .attr("r", d => d["circledata"].r);
                    texts.filter(c => c == d).transition() // Seleccionamos este elemento
                                .attr("font-size", d => {return Math.floor(d["circledata"].r / 5)})
            })
});
