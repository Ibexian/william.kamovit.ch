var windowSize = $(window).width();
var w = windowSize > 800 ? 800 : windowSize;
var h = 600;
var planets = [ //Yes the sizes are not to scale... at all
  { R: 50, r: 5, name: 'mercury', pos: 0},
  { R: 100, r: 9, name: 'venus', pos: 180},
  { R: 150, r: 10, name: 'earth', pos: 90},
  { R: 170, r: 10, name: 'mars', pos: 20},
  { R: 200, r: 20, name: 'jupiter', pos: 170},
  { R: 240, r: 15, name: 'saturn', pos: 100},
  { R: 270, r:  8, name: 'uranus', pos: 220},
  { R: 300, r:  8, name: 'neptune', pos: 33}
];


var svg = d3.select("#planets").insert("svg")
  .attr("width", w).attr("height", h);

svg.append("circle").attr("r", 20).attr("cx", w/2)
  .attr("cy", h/2).attr("class", "sun")

var container = svg.append("g")
  .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

container.selectAll("g.planet")
  .data(planets).enter()
  .append("g")
  .attr("class", "planet")
  .each(function(d, i) {

    d3.select(this).append("circle").attr("class", "orbit")
      .attr("r", d.R);

    d3.select(this).append("circle").attr("r", d.r).attr("cx",d.R)
      .attr("cy", 0).attr("class", "planet").attr("class", d.name)
      .attr("transform", "rotate(" +  d.pos + ")");

  });
