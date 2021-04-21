import * as d3 from "d3";

function drawTree(treeData: object, findedValue?: number | string): void {

    d3.select("svg").remove();

    // set the dimensions and margins of the diagram
    const margin = { top: 40, right: 90, bottom: 50, left: 90 },
        width = 660 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    const treemap = d3.tree()
        .size([width, height]);

    // maps the node data to the tree layout
    let nodes = treemap(d3.hierarchy(treeData));
    nodes = treemap(nodes);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select(".tree").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        g = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    const link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d: any) {
            return "M" + d.x + "," + d.y
                + "C" + d.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                + " " + d.parent.x + "," + d.parent.y;
        });

    // adds each node as a group
    const node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", d => `node${d.children ? " node--internal" : " node--leaf"}`)
        .attr("transform", d => `translate(${d.x}, ${d.y})`,
    );

    // adds the circle to the node
    node.append("circle")
        .attr("r", 20)
        .attr("fill", function (d: any) {
            return d.data.value === findedValue ? "red" : "wheat";
        });

    // adds the text to the node
    node.append("text")
        .attr("dx", -5)
        .attr("dy", 5)
        .text(function (d: any) { return d.data.value; });
}

export { drawTree };
