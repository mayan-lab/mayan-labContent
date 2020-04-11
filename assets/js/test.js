let root = d3.root(mineralsjson);

let x0 = Infinity;
let x1 = -x0;
root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
});

let svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

let g = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", `translate(${root.dy / 3}, ${root.dx -x0}`);

let link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

let node = g.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("")


let width = "100%";
let height = "400px";
let svg = d3.select("#demo1")
    .append('svg')
    .attr('width', width)
    .attr('height', height);
