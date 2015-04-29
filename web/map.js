
var data; //save this?
var start_x = -20;
var start_y = 10;
var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];


//globals for poster sizes
//country - will need to change count per year in country_data json

/*
-import files and ajax request them 
-display images by decade
-group by country? how to do this?

-map/count on mouseover
-dateslider at bottom

-mouseover: show title/director/year

-look at how many films per year/history of violence? 

*/

//prelim mouseover, click

//TODO fix this for chrome - wrap call
//save with callback function
//have to save for mouseover images and click images

//svg image elements	

//scale according to number of elements
//pass in more option args
function set_location(data) {
	var x_space = 0;
	var y_space = 0;
    for(var i=0;i<data.length;i++){
		if (data[i].image[0]) {
			data[i].x = start_x + (140 * x_space);
			//change this to account for browser size
			data[i].y = start_y + (200 * y_space);
			x_space++;
			if (x_space % 5 == 0) {
				x_space = 0;
				y_space++;
			}
		}
	}

	return data;
}

//this should call other functions
//add onload to make less ugly
//country panel/map 
//smaller posters/
function callback(data) {
	//console.log(data[1].title[0]);

	//diff element than p
	// d3.select("body").selectAll("p")
 //    	.data(data)
 //    	.enter()
 //    	.append("p")

 //    d3.selectAll("p").text(function(d) { return d.country; });

 //need to create new data file, then do checks across files for country section**
 //python script, countries and counts, if country==country? want mvc

 	data = set_location(data);

 	//use to create dateslider
 	var min_year = d3.min(data, function(d) {return d.year[0]; });
 	var max_year = d3.max(data, function(d) {return d.year[0]; });

	var svg = d3.select("body")
		.append("svg")
		.attr("width", 2000)	//get size of browser? 
		.attr("height", 1000);


	//need to space images - function? 
    var imgs = d3.select("svg").selectAll("image")
    	.data(data)
    	.enter()
    	.append("svg:image")
    	.attr("xlink:href", function (d) { return d.image ; })
    	.attr("x", function (d) { return d.x; }) 
    	.attr("y", function (d) { return d.y; })
    	.attr("width", "200")
    	.attr("height", "200");

    //add mouseover/click to show data - title, director, year



	//mouseover images * - change size, move other images - or just tooltip showing info? depends on size
	//mouseover show title, director, year
	//click images and show info *
	//make div with images into a view
	//scale to fit according to location/date - d3 filter function
}

//put this in a div and format
//create div, make bar graph
//implement click to only show that country / back to all countries
//add map
function country_callback(country_data) {
	var num_countries = Object.keys(country_data).length;
	console.log(num_countries);


		var grid = d3.range(25).map(function(i){
			return {'x1':0,'y1':0,'x2':0,'y2':480};
		});

		var tickVals = grid.map(function(d,i){
			if(i>0){ return i*10; }
			else if(i===0){ return "100";}
		});

		var xscale = d3.scale.linear()
						.domain([10,250])
						.range([0,722]);

		var yscale = d3.scale.linear()
						.domain([0,num_countries])
						.range([0,700]);

		var colorScale = d3.scale.quantize()
						.domain([0,num_countries])
						.range(colors);

		var canvas = d3.select('#wrapper')
						.append('svg')
						.attr({'width':1300,'height':800});

		// var grids = canvas.append('g')
		// 				  .attr('id','grid')
		// 				  .attr('transform','translate(150,10)')
		// 				  .selectAll('line')
		// 				  .data(grid)
		// 				  .enter()
		// 				  .append('line')
		// 				  .attr({'x1':function(d,i){ return i*30; },
		// 						 'y1':function(d){ return d.y1; },
		// 						 'x2':function(d,i){ return i*30; },
		// 						 'y2':function(d){ return d.y2; },
		// 					})
		// 				  .style({'stroke':'#adadad','stroke-width':'1px'});

		// var	xAxis = d3.svg.axis();
		// 	xAxis
		// 		.orient('bottom')
		// 		.scale(xscale)
		// 		.tickValues(tickVals);

		// var	yAxis = d3.svg.axis();
		// 	yAxis
		// 		.orient('left')
		// 		.scale(yscale)
		// 		.tickSize(2)
		// 		.data(country_data)
		// 		.tickFormat(function(d){ return d; })
		// 		.tickValues(d3.range(17));

		// var y_xis = canvas.append('g')
		// 				  .attr("transform", "translate(150,0)")
		// 				  .attr('id','yaxis')
		// 				  .call(yAxis);

		// var x_xis = canvas.append('g')
		// 				  .attr("transform", "translate(150,480)")
		// 				  .attr('id','xaxis')
		// 				  .call(xAxis);

		//country_data[d]
		//spacing between bars?
		//log scale, spacing, fix colors, hover show number, axis on bottom? 
		var chart = canvas.append('g')
					.attr("transform", "translate(150,0)")
					.attr('id', 'bars')
					.selectAll('rect')
					.data(d3.keys(country_data))
					.enter()
					.append('rect')
					.attr('height', 2)
					.attr({'x':100, 'y':function(d,i) {return yscale(i)+40; }})
					.style('fill', function(d, i) {return colorScale(i);})
					.attr('width', function(d) {return country_data[d]}); //new scale function


		// var chart = canvas.append('g')
		// 					.attr("transform", "translate(150,0)")
		// 					.attr('id','bars')
		// 					.selectAll('rect')
		// 					.data(country_data)
		// 					.enter()
		// 					.append('rect')
		// 					.attr('height',19)
		// 					.attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
		// 					.style('fill',function(d,i){ return colorScale(i); })
		// 					.attr('width',function(d){ return 0; });


		// var transit = d3.select("svg").selectAll("rect")
		// 				    .data(country_data)
		// 				    .transition()
		// 				    .duration(1000) 
		// 				    .attr("width", function(d) {return xscale(d); });

		var transitext = d3.select('#bars')
							.selectAll('text')
							.data(d3.keys(country_data))
							.enter()
							.append('text')
							.attr({'x':function(d) {return d-100; },'y':function(d,i){ return yscale(i) + 30; }})
							.text(function(d){ return d; }).style({'fill':'black','font-size':'9px'});
		//log scale, 2 columns, fix spacing, fix colors
}

$.getJSON( "../data/small_data.json", function(json) {
 	//callback(json); 
});

//fix asynchronous callbacks
$.getJSON("../data/country_data.json", function(json) {
	country_callback(json);
});


// function getData() {

// // 	var request = new XMLHttpRequest();
// // 	request.open("GET", "../data/data.json", false);
// // 	request.send(null)
// // 	var my_JSON_object = JSON.parse(request.responseText);
// // 	alert (my_JSON_object.result[0]);
// }

/*
var client = new XMLHttpRequest();
client.open('GET', '/foo.txt');
client.onreadystatechange = function() {
  alert(client.responseText);
}
client.send();
*/