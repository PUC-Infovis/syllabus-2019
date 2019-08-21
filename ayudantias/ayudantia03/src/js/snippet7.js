// Ya vimos algunas herramientas básicas de como manejar el DOM y agregar elementos a través de D3
// Pero nos falta tal vez lo más importante: Integrar datos al DOM
// Para eso usaremos un json que contiene información de todos los Pokemon® existentes
// Lo bueno de D3 para esto, es que tiene métodos muy faciles para leer estos archivos (y también los csv):


// https://github.com/onury/invert-color

function bwColor(hex) {
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
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
}

let typeColor = {
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



let WIDTH  = 1500;

let MySvg = d3.select("body").append('svg')
                             .attr('class', 'pkmnSVG')
                             .attr('width', WIDTH)


d3.json("/src/data/pokedex.json").then(function(data) {
    // console.log(data);

    // 5 elementos por fila
    let x_elements = 5;

    // Distancia entre elementos
    let x_pad = Math.floor(WIDTH / (x_elements + 2)); // +2 para los márgenes
    let y_pad = 200;

    // En este caso, quiero que HIGHT dependa de la cantidad de datos que voy a representar
    let HEIGHT = y_pad * (Math.floor(data.length / x_elements) + 2); // +2 para los márgenes

    console.log(HEIGHT);
    
    MySvg.attr('height', HEIGHT);

    console.log(x_pad, y_pad);

    // Esto es un "preprocesamiento" para simplificar el código futuro.

    data.forEach(pokemon => {
        let index = pokemon["id"] - 1
        // dónde quiero poner el circulo de éste pokemon?
        let xcoord = ((index % x_elements) + 1) * (x_pad);
        let ycoord = (Math.floor(index / x_elements) + 1) * y_pad;

        // Su radio depende de su base HP
        let r = pokemon["base"]["HP"] / 2; // Divido por dos para que no sea tan grande

        // Podríamos hacer, por ejemplo, que el radio dependa de la suma de todas las base stats
        
        // let values = new Array();

        // for (var key in pokemon["base"]) {
        //     values.push(pokemon["base"][key]);
        // }
        // let r = values.reduce((a,b) => a + b, 0) / 8; // Divido por dos para que no sea tan grande
        
        // console.log(pokemon["id"], xcoord, ycoord, r)
        pokemon["circledata"] = { // Agrego estos datos al pokemon
            "cx": xcoord,
            "cy": ycoord,
            "r": r
        };
        // console.log(pokemon); // Va a imprimir los datos del pokemon, incluidos los nuevos
    });

    // https://stackoverflow.com/questions/11857615/placing-labels-at-the-center-of-nodes-in-d3-js
    let nodes = MySvg.append("g") // g es un "contenedor" que permite agrupar SVG's
                    .attr("class", "nodes")
                    .selectAll("circle")
                    .data(data)
                    .enter()
                    // Agregar un elemento g por cada nodo (dato, pokemon).
                    .append("g")
                        // Posicionar el elemento g dónde queremos que esté el circulo.
                        .attr("transform", d => {return "translate(" + d["circledata"].cx + "," + d["circledata"].cy + ")";});
                        // Eso es equivalente a:
                        // .attr("cx", d => d["circledata"].cx)
                        // .attr("cy", d => d["circledata"].cy);

    let circles = nodes.append("circle") // Agregar un circulo a cada elemento
                            .attr("class", "node")
                            .attr("r", d => {return d["circledata"].r})
                            .style("fill", (d) => { // Color de fondo
                                        return typeColor[d["type"][0]];
                                    })
    let texts = nodes.append("text")
                            .attr("class", "label")
                            .attr("text-anchor", "middle")
                            .style("color", d => { // color del texto
                                return bwColor(typeColor[d["type"][0]], true);
                                    })
                            .attr("font-size", d => {return Math.floor(d["circledata"].r / 5)})
                            .text(d => {  // Setear texto
                                        return `#${d["id"]} - ${d["name"]["english"]}`;
                                    })

    // Ahora agregaremos MouseEvents a nuestros elementos

    nodes.on("click", d => {window.open(`https://www.pokemon.com/es/pokedex/${d["id"]}`)}) // Abre una nueva pestaña con el link
         .on("mouseover", (d, i, all) => { // d-> dato, i-> indice del dato, all-> toda la data
            // Buscamos todos circulos los que no son el donde está el mouse    
                circles.filter(c => c != d).transition()
                                            .style("opacity", 0.2); // Les bajamos la opacidad a los circulos
                texts.filter(t => t != d).transition()
                                            .style("opacity", 0.2); // Les bajamos la opacidad
            // Filtramos solo este círculo
                circles.filter(c => c == d).transition() // Seleccionamos este elemento
                                            .attr("r", c => c["circledata"].r * 2);

                texts.filter(t => t == d).transition()
                                            .attr("font-size", t => Math.floor(t["circledata"].r / 5) * 2);                                           
            })
         .on("mouseout", (d, i, all) => {
            // Para volver todo a la normalidad cuando el mouse no está sobre un nodo, podemos hacer 2 cosas:
            // 1. Filtrar elementos específicos
            // Buscamos todos circulos los que no son el donde está el mouse
                // Transition() hará que nuestro cambio no sea brusco, sino que una transición "animada"
                circles.filter(c => c != d).transition()
                                            .style("opacity", 1); // Recuperamos la opacidad
                texts.filter(c => c != d).transition()
                                            .style("opacity", 1); // Recuperamos la opacidad
            // Filtramos solo este círculo y  texto
                circles.filter(c => c == d).transition() // Volvemos el radio a la normalidad
                                            .attr("r", d => d["circledata"].r);
                texts.filter(c => c == d).transition() // Volver letra a la normalidad
                                            .attr("font-size", d => {return Math.floor(d["circledata"].r / 5)})
                
            // // 2. Simplemente devolver todos al default
            //     circles.transition()
            //                 .style("opacity", 1) // Recuperamos la opacidad
            //                 .attr("r", d => d["circledata"].r);
            //     texts.transition()
            //                 .style("opacity", 1) // Recuperamos la opacidad
            //                 .attr("font-size", d => {return Math.floor(d["circledata"].r / 5)});
            // ¿Cual es mejor? ¿Por qué?
            })
});
