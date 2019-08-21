// Ya vimos algunas herramientas básicas de como manejar el DOM y agregar elementos a través de D3
// Pero nos falta tal vez lo más importante: Integrar datos al DOM
// Para eso usaremos un json que contiene información de todos los Pokemon® existentes
// Lo bueno de D3 para esto, es que tiene métodos muy faciles para leer estos archivos (y también los csv):


// https://github.com/onury/invert-color

function bwColor(hex) { // Entrega un color de letra dependiendo del background
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

d3.json("/src/data/pokedex.json").then(function(data) {
    console.log(data);
    let pokemons = d3.select("body").selectAll("div")
                        .data(data)
                        .enter()
                        .append("div")
                            .attr("class", "pokemon") // Importante para que agarre el css
                            .attr("id", "pkmn")
                            .style("background-color", (d) => {
                                console.log(d["type"][0]);
                                console.log(typeColor[d["type"][0]]);
                                return typeColor[d["type"][0]];
                            })
                            .style("color", (d) => {
                            //     // console.log(d["type"][0]);
                            //     // console.log(typeColor[d["type"][0]]);
                                return bwColor(typeColor[d["type"][0]], true);
                            })
                            .text(d => {
                                // console.log(d["name"]["english"]);    
                                return `#${d["id"]} - ${d["name"]["english"]}`;
                            })
                            .on("click", d => {window.open(`https://www.pokemon.com/es/pokedex/${d["id"]}`)})
                            .on('mouseover', (d, i , all) =>{
                                // Buscamos todos los que no son el donde está el mouse
                                d3.selectAll('#pkmn').filter(pkmn => pkmn != d).style("opacity", 0.2);
                                })
                            .on('mouseout', (_, i, all) => {
                                d3.selectAll('#pkmn').style("opacity", 1)
                            });
});