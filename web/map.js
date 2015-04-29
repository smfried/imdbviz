
var data; //save this?
var start_x = -20;
var start_y = 10;

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

//country list

//prelim mouseover, click

//TODO fix this for chrome - wrap call
//save with callback function
//have to save for mouseover images and click images

//svg image elements	

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
function country_callback(country_data) {
		//diff element than p
	d3.select("body").selectAll("p")
    	.data(d3.keys(country_data))
    	.enter()
    	.append("p")

    d3.selectAll("p").text(function(d) { return d + " " + country_data[d]; });
}

$.getJSON( "../data/small_data.json", function(json) {
 	callback(json); 
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