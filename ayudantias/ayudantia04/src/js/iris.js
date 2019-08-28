////////////////////////////////////////////////////////////////////////////////////
// Primero que nada definiremos el 'layout' de nuestro gráfico

const HEIGHT = 600;
const WIDTH  = 1000;

// const WIDTH = window.innerWidth;
// const HEIGHT  = window.innerHeight;

let margin = {top: 50, right: 50, bottom: 50, left: 100},
    width = WIDTH - margin.left - margin.right,// Use the window's width 
    height = HEIGHT - margin.top - margin.bottom; // Use the window's height

const keys = ["Virginica", "Versicolor", "Setosa"];

let typeColor = d3.scaleOrdinal()
                    .domain(keys)
                    .range(["red", "green", "blue"]);

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


d3.csv("/src/data/iris.csv").then(function(data) {
    // console.log(data);

    

    // Queremos hacer 2 cosas a modo de preprocesamiento:
    // 1. Parsear los floats (pasar de str a float)
    // 2. Queremos ver los limites de nuestros datos
    let maxX = 0,
        maxY = 0;

    // Diremos que compararemos según los pétalos
    
    let attr = "petal";

    data.forEach(p => { 
        p["data"] = {
                    "petal": {"length" : parseFloat(p["petal.length"]),
                              "width": parseFloat(p["petal.width"])},
                    "sepal": {"length": parseFloat(p["sepal.length"]),
                              "width": parseFloat(p["sepal.width"])}
                    }
        if (p["data"][attr]["length"] > maxX) {
            maxX = p.data[attr]["length"];
        }
        if (p["data"][attr]["width"] > maxY) {
            maxY = p.data[attr]["width"];
        }
    });

    // console.log("maxX:", maxX, "maxY", maxY);

    // // Queremos definir las escalas que tendrá nuestro gráfico

    let xScale = d3.scaleLinear()
        .domain([0, maxX * 1.1]) // input ¿Por qué +10?
        .range([0, width]); // output

    let yScale = d3.scaleLinear()
        .domain([0, maxY * 1.1]) // input 
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
                                    .text("Iris Dataset Clustering");

    let specificTitle = scatterplot.append("text")
                                    .attr("transform", "translate(" + width / 2 + ", " + ( - margin.top / 2) + ")")
                                    .style("text-anchor", "middle")
                                    .attr("dy", "1em")
                                    .text("Based on " + attr + " data");

    let xtext = scatterplot.append("text")
                    .attr("transform", "translate(" + width / 2 + ", " + ((height + HEIGHT) / 2) + ")")
                    .style("text-anchor", "middle")
                    .attr("font-size", 20)
                    .text("Length");
    
    let ytext = scatterplot.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left/2)
                    .attr("x",0 - (height / 2))
                    .style("text-anchor", "middle")
                    .attr("font-size", 20)
                    .text("Width");
                    
    
    data.forEach(p => {
            p.circledata = {"cx" : xScale(p["data"][attr]["length"]),
                            "cy" : yScale(p["data"][attr]["width"])}
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
                                        return typeColor(d["variety"]);
                                    });
    

    let legend = scatterplot.selectAll("legends")
                                .data(keys)
                                .enter()
    

    // https://www.d3-graph-gallery.com/graph/custom_legend.html

    scatterplot.append("rect")
                    .attr("x", margin.left/2)
                    .attr("y", margin.top/2)
                    .attr("width", 200)
                    .attr("height", 100)
                    .attr("fill", "#e6e6e6");

    legend.append("circle")
            .attr("cx", margin.left)
            .attr("cy", function(d,i){ return margin.top + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", function(d){ return typeColor(d)})

    
    legend.append("text")
            .attr("x", margin.left + 10)
            .attr("y", function(d,i){ return margin.top + 2 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return typeColor(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
});
