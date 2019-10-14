  
  // Creamos el grafo
  let g = createGraph();

  // Definimos los links
  g.addLink("fortran", "c");
  g.addLink("c", "c++");
  g.addLink("c++", "perl");
  g.addLink("c", "javascript");

  // Calculamos las diferentes métricas
  d3.select('#betweennes').text(JSON.stringify(betweennes(g)))
  d3.select('#closeness').text(JSON.stringify(closeness(g)))
  d3.select('#degree').text(JSON.stringify(degree(g)))
  d3.select('#eccentricity').text(JSON.stringify(eccentricity(g)))
