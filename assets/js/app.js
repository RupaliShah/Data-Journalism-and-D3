d3.select(window).on("resize", handleResize);

// When the browser loads, call loadchart()
loadChart();

function handleResize() {
  var svgArea = d3.select("svg");

  // If there is already an svg container on the page, remove it and reload the chart
  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  };
};

function loadChart() {
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data/data.csv", function (err, demoData) {
  if (err) throw err;

  //Parse Data/Cast as numbers
  demoData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.physicalActivity = +data.physicalActivity;
  });

  //Create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(demoData, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([55, d3.max(demoData, d => d.physicalActivity + 5)])
    .range([height, 0]);

  //Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   //Create Circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(demoData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.physicalActivity))
  .attr("r", "12")
  .attr("fill", "blue")
  .attr("opacity", ".5")

  //Create state labels
  labelGroup = chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(demoData)
        .enter()
        .append("tspan")
        .attr("x", function(data) {
          return xLinearScale(data.poverty - 0);
        })
        .attr("y", function(data) {
          return yLinearScale(data.physicalActivity - 0.2);
        })
        .text(function(data) {
          return data.stateCode
        });
  

  //Initialize tool tip
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Poverty: ${d.poverty}<br>Physical Activity: ${d.physicalActivity}`);
    });

  //Create tooltip in the chart
  chartGroup.call(toolTip);

  //Create event listeners to display and hide the tooltip
  circlesGroup.on("click", function (data) {
      toolTip.show(data);
    })
  
  labelGroup.on("click", function(data){
      toolTip.show(data);
  })

    //onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Physical Activity(%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Poverty(%)");
});

};