const degree = (graph, kind) => {
  var getNodeDegree;
  var result = Object.create(null);


  function calculateNodeDegree(node) {
    var links = graph.getLinks(node.id);
    result[node.id] = getNodeDegree(links, node.id);
  }
  function inDegreeCalculator(links, nodeId) {
  var total = 0;
  if (!links) return total;

  for (var i = 0; i < links.length; i += 1) {
    total += (links[i].toId === nodeId) ? 1 : 0;
  }
  return total;
}

function outDegreeCalculator(links, nodeId) {
  var total = 0;
  if (!links) return total;

  for (var i = 0; i < links.length; i += 1) {
    total += (links[i].fromId === nodeId) ? 1 : 0;
  }
  return total;
}

function inoutDegreeCalculator(links) {
  if (!links) return 0;

  return links.length;
}
  
  kind = (kind || 'both').toLowerCase();
  if (kind === 'both' || kind === 'inout') {
    getNodeDegree = inoutDegreeCalculator;
  } else if (kind === 'in') {
    getNodeDegree = inDegreeCalculator;
  } else if (kind === 'out') {
    getNodeDegree = outDegreeCalculator;
  } else {
    throw new Error('Expected centrality degree kind is: in, out or both');
  }

  graph.forEachNode(calculateNodeDegree);

  return result;
}

