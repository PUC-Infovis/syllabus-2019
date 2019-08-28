// Ya vimos algunas herramientas básicas de como manejar el DOM y agregar elementos a través de D3
// Pero nos falta tal vez lo más importante: Integrar datos al DOM
// Para eso usaremos un json que contiene información de todos los Pokemon® existentes
// Lo bueno de D3 para esto, es que tiene métodos muy faciles para leer estos archivos (y también los csv):


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


////////////////////////////////////////////////////////////////////////////////////
// Primero que nada definiremos el 'layout' de nuestro gráfico

// const HEIGHT = 600;
// const WIDTH  = 1000;

const WIDTH = window.innerWidth;
const HEIGHT  = window.innerHeight;

let margin = {top: 50, right: 50, bottom: 50, left: 100},
    width = WIDTH - margin.left - margin.right,// Use the window's width 
    height = HEIGHT - margin.top - margin.bottom; // Use the window's height

///////////////////////////////////////////////////////////////////////////////////
// Luego definiremos el contenedor, que queremos que tenga los márgenes que  pusimos anteriormente:

let scatterplot = d3.select("body").append("svg")
                        .attr("width", WIDTH)
                        .attr("height", HEIGHT)
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

scatterplot.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "#f2f2f2");


d3.json("/src/data/pokedex.json").then(function(data) {
    // console.log(data);

    let xlabel = "HP",
        ylabel = "Speed";

    let maxX = 0,
        maxY = 0;

    // Queremos ver los limites de nuestros datos
    data.forEach(p => {
        if (p.base[xlabel] > maxX) {
            maxX = p.base[xlabel];
        }
        if (p.base[ylabel] > maxY) {
            maxY = p.base[ylabel];
        }
    });

    console.log("maxX:", maxX, "maxY", maxY);

    // Queremos definir las escalas que tendrá nuestro gráfico

    let xScale = d3.scaleLinear()
        .domain([0, maxX + 10]) // input ¿Por qué +10?
        .range([0, width]); // output

    let yScale = d3.scaleLinear()
        .domain([0, maxY + 10]) // input 
        .range([height, 0]); // output ¿Está Bien?
        // .range([0, height]); // output ¿Está Bien?

    let xAxis = scatterplot.append("g")
                    .attr("class", "xAxis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
    
    let yAxis = scatterplot.append("g")
                    .attr("class", "yAxis")
                    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    let generalTitle = scatterplot.append("text")
                                    .attr("transform", "translate(" + width / 2 + ", " + ( - margin.top / 2) + ")")
                                    .style("text-anchor", "middle")
                                    .attr("dy", "0em")
                                    .attr("font-size", 30)
                                    .text("Pokemon Base Stats")

    let specificTitle = scatterplot.append("text")
                                    .attr("transform", "translate(" + width / 2 + ", " + ( - margin.top / 2) + ")")
                                    .style("text-anchor", "middle")
                                    .attr("dy", "1em")
                                    .text(xlabel + " vs " + ylabel)

    let xtext = scatterplot.append("text")
                    .attr("transform", "translate(" + width / 2 + ", " + ((height + HEIGHT) / 2) + ")")
                    .style("text-anchor", "middle")
                    .attr("font-size", 20)
                    .text(xlabel)
    
    let ytext = scatterplot.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left/2)
                    .attr("x",0 - (height / 2))
                    .style("text-anchor", "middle")
                    .attr("font-size", 20)
                    .text(ylabel);
                    
    
    data.forEach(p => {
            p.circledata = {"cx" : xScale(p.base[xlabel]),
                            "cy" : yScale(p.base[ylabel])}
        });

    // console.log(data);

    
    let nodes = scatterplot.selectAll("circle")
                            .data(data)// Agregar un elemento g por cada nodo (dato, pokemon).
                            .enter().append("g")
                                // Posicionar el elemento g dónde queremos que esté el circulo.
                                .attr("transform", d => {return "translate(" + d.circledata.cx + "," + d.circledata.cy + ")";});

    let circles = nodes.append("circle") // Agregar un circulo a cada elemento
                            .attr("class", "node")
                            .attr("r", 3)
                            .style("fill", (d) => { // Color de fondo
                                        return typeColor[d["type"][0]];
                                    });
});
