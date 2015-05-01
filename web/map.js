//thurs:
/*

essential: 
-click on poster and show data - also can be tooltip
-fix text issue

on click show title/director/year in side box (replace graphs)
add go back to all button

-fix corner cases
-mark which country was selected

(3. button backgrounds - make buttons pop / collapse css button)

5. Add show all button to go back to start state / dateslider

if time, general highlight box to click on graph and display films and highlight on mouseover / zooming

intro/scroll down and intro disappears - how to do this
definitely write intro with some data analysis and observations about countries
US bias undoubtedly because IMDB is US-based? or is IMDB comprehensive, and the US makes the most movies (probably both but check)
discuss a few examples

intro -> scroll -> all films/box open -> option to close box

writing/phrasing

no map/no multiple countries

count/history of violence

films over time

*/
var imdb_data;
var GLOBAL_COUNTRY = "all";
var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];


var regions = ["Africa", "Asia", "Central America", "Eastern Europe", "European Union", "Middle East", "North America", "Oceania", "South America", "The Caribbean"];
var regions_with_countries = {"Africa": ["Algeria", "Burkina Faso", "Chad", "Côte d'Ivoire", "Egypt", "Ethiopia", "Kenya", "Liberia", "Libya", "Mali", "Mauritania", "Morocco", "Mozambique", "Nigeria", "Senegal", "South Africa", "Tunisia", "Zimbabwe"],
"Asia": ["Afghanistan", "Angola", "Armenia", "Azerbaijan", "Bangladesh", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Japan", "Kazakhstan", "Korea", "Laos", "Malaysia", "Mongolia", "North Korea", "North Vietnam", "Pakistan", "Philippines", "Singapore", "South Korea", "Sri Lanka", "Taiwan", "Thailand", "Timor-Leste", "Vietnam"],
"Central America": ["Costa Rica", "El Salvador", "Guatemala", "Mexico", "Nicaragua", "Panama"],
"Eastern Europe": ["Albania", "Belarus", "Bosnia and Herzegovina", "Croatia", "Federal Republic of Yugoslavia", "Iceland", "Kosovo", "Liechtenstein", "Monaco", "Norway", "Republic of Macedonia", "Russia", "Serbia", "Serbia and Montenegro", "Soviet Union", "Switzerland", "Turkey", "Ukraine", "Yugoslavia"],
"European Union": ["Austria", "Belgium", "Bulgaria", "Cyprus", "Czech Republic", "Czechoslovakia", "Denmark", "East Germany", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Netherlands", "Netherlands Antilles", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "UK", "West Germany"],
"Middle East": ["Iran", "Iraq", "Israel", "Jordan", "Lebanon", "Palestine", "Qatar", "Syria", "United Arab Emirates"],
"North America": ["Canada", "USA"],
"Oceania": ["Australia", "Fiji", "New Zealand", "Papua New Guinea"],
"South America": ["Argentina", "Brazil", "Chile", "Colombia", "Paraguay", "Peru", "Uruguay", "Venezuela"],
"The Caribbean": ["Cuba", "Dominican Republic", "Haiti", "Puerto Rico"]};

var country_list = ["Algeria", "Burkina Faso", "Chad", "Côte d'Ivoire", "Egypt", "Ethiopia", "Kenya", "Liberia", "Libya", "Mali", "Mauritania", "Morocco", "Mozambique", "Nigeria", "Senegal", "South Africa", "Tunisia", "Zimbabwe", "Afghanistan", "Angola", "Armenia", "Azerbaijan", "Bangladesh", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Japan", "Kazakhstan", "Korea", "Laos", "Malaysia", "Mongolia", "North Korea", "North Vietnam", "Pakistan", "Philippines", "Singapore", "South Korea", "Sri Lanka", "Taiwan", "Thailand", "Timor-Leste", "Vietnam",
						"Costa Rica", "El Salvador", "Guatemala", "Mexico", "Nicaragua", "Panama",
						"Albania", "Belarus", "Bosnia and Herzegovina", "Croatia", "Federal Republic of Yugoslavia", "Iceland", "Kosovo", "Liechtenstein", "Monaco", "Norway", "Republic of Macedonia", "Russia", "Serbia", "Serbia and Montenegro", "Soviet Union", "Switzerland", "Turkey", "Ukraine", "Yugoslavia",
						"Austria", "Belgium", "Bulgaria", "Cyprus", "Czech Republic", "Czechoslovakia", "Denmark", "East Germany", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Netherlands", "Netherlands Antilles", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "UK", "West Germany",
						"Iran", "Iraq", "Israel", "Jordan", "Lebanon", "Palestine", "Qatar", "Syria", "United Arab Emirates",
						"Canada", "USA",
						"Australia", "Fiji", "New Zealand", "Papua New Guinea",
						"Argentina", "Brazil", "Chile", "Colombia", "Paraguay", "Peru", "Uruguay", "Venezuela",
						"Cuba", "Dominican Republic", "Haiti", "Puerto Rico"];

var region_max = {"Africa": 29, "Asia": 203, "Central America": 156, "Eastern Europe": 492, "European Union": 615,
				"Middle East": 81, "North America": 1784, "Oceania": 64, "South America": 22, "The Caribbean": 5};

function set_location(country) {
	var start_x = 0;
	var start_y = 0;
	var x_space = 0;
	var y_space = 0;

	if(country == "all" || country == "USA") {
		var films_per_row = 33;		//41
		var x_margin = 30;
		var y_margin = 50;
	} else {
		var films_per_row = 7;
		var x_margin = 140; //150
		var y_margin = 225; //220
	}

    for(var i=0;i<imdb_data.length;i++){
		if (imdb_data[i].image[0]) { 
			if (country == "all") {
				imdb_data[i].x = start_x + (x_margin * x_space) - 10;
				imdb_data[i].y = start_y + (y_margin * y_space);
				x_space++;
				if (x_space % films_per_row == 0) {
					x_space = 0;
					y_space++;
				}
			} else if (country == "USA") {
				if (imdb_data[i].country.indexOf(country) > -1) {
					imdb_data[i].x = start_x + (x_margin * x_space) - 10;
					imdb_data[i].y = start_y + (y_margin * y_space);
					x_space++;
					if (x_space % films_per_row == 0) {
						x_space = 0;
						y_space++;
					}
				}
			} else {
					if (imdb_data[i].country.indexOf(country) > -1) {
					imdb_data[i].x = start_x + (x_margin * x_space) - 30;
					imdb_data[i].y = start_y + (y_margin * y_space);
					x_space++;
					if (x_space % films_per_row == 0) {
						x_space = 0;
						y_space++;
					}
				}
			} 	//need else if for USA
		}
	}

	return imdb_data;
}

function display_posters(country) {
	imdb_data = set_location(country);

 	d3.select("#posters").remove();

	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
    	y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 	var min_year = d3.min(imdb_data, function(d) {return d.year[0]; });
 	var max_year = d3.max(imdb_data, function(d) {return d.year[0]; });

	var svg = d3.select("body")
		.append("svg")
		.attr('id', 'posters')
		.attr("width", x)
		.attr("height", 2800);
		//.attr("perspective", "800px");

	//on click checking global bool here

    var imgs = d3.select("#posters").selectAll("image")
    	.data(imdb_data)
    	.enter()
    	.append("svg:image")
    	.attr("xlink:href", function (d) { 
    		if (country == "all") {
    			return d.image ; 
    		} else {	//regions_with_countries[region].indexOf(d) > -1
    			if (d.country.indexOf(country) > -1) {
    				return d.image;
    			}	//and set location
    		}
    	})
    	.attr("x", function (d) { return d.x; }) 
    	.attr("y", function (d) { return d.y; })
    	//.attr("transform-style", "preserve-3d")   //-webkit-transform-style: preserve-3d;
 		//.attr("transition", "0.5s")										// -webkit-transition: 0.5s;
    	.attr("width", function () {
    		if (country == "all" || country== "USA") {
    			return 50;
    		} else {
    			return 225;
    		}
    	})
    	.attr("height", function () {
    		if (country == "all" || country == "USA") {
    			return 50;
    		} else {
    			return 225;
    		}
    	})
    	.on("mouseover", function (d) {	//need to fix for edge cases
    		var sel = d3.select(this);
    		this.parentNode.appendChild(this);
    		if (country == "all" || country == "USA") {
    			sel.attr("width", 175).attr("height", 175).attr("x", d.x - 30).attr("y", d.y - 30); //.transition(); //175, 30 looks good - 300 for zoom
    		} else {
    			sel.attr("width", 235).attr("height", 235).attr("x", d.x - 3).attr("y", d.y - 3)
    		}
    	})
    	.on("mouseout", function(d) {
    		if (country == "all" || country == "USA") {
    	  		d3.select(this).attr("width", 50).attr("height", 50).attr("x", d.x).attr("y", d.y);
    	  	} else {
    	  		d3.select(this).attr("width", 225).attr("height", 225).attr("x", d.x).attr("y", d.y);
    	  	}
    	});

    	// .on("mouseover", function(d){
    	// 	return tooltip.text(country_data[d]).style("visibility", "visible");
    	// })
    	// .on("mousemove", function(d){
    	// 	return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
    	// })
    	// .on("mouseout", function(d){
    	// 	return tooltip.style("visibility", "hidden");
    	// });

    	// .on("click", function(d) {
    	// 	var sel = d3.select(this);
    	// 	//  -webkit-transform: rotatex(-180deg);
    	// 	//sel.attr("transform", "rotateY(180deg)")
    	// 	console.log(d.title[0]);
    	// 	console.log(d.year[0]);
    	// 	console.log(d.director[0]);
    	// });

    	// onclick
    	// var transform_x = d.x - 50; //= d.x - 100;
    	// var transform_y = d.y; //= d.y - 100;
    	// if (d.x > 101) {
    	// 	transform_x = d.x - 100;
    	// } if (d.y >= 100) {
    	// 	transform_y = d.y - 100;
    	// }

	    //add onlick for each image, create onclick function
}

function build_buttons(country_data) {	
	d3.selectAll("button")
		.on("click", function() {
			display_countries(country_data, this.value);
		});
}

//fix font and colors - sizes a little smaller to fit all of asia
//onclick to each bar graph element which calls films render function
//start out with all films displaying
//button to go back to all films
function display_countries(country_data, region) {
	var num_countries = regions_with_countries[region].length;
	//console.log(num_countries);
	// .on("click", function () {
	// 	console.log("test");
	// 	d3.select(this).attr("opacity", "0.0");
	// 	//d3.select(this).attr("width", 50).attr("height", 50).attr("x", 1200);
	// });  //.on("click", )	//hide and show

	//xscale - max and with filter
	//yscale - takes in i, replace with own function, domain is size of region

	var max = region_max[region];

	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("font-family", "sans-serif")
		.style("color", "white");

	var xscale = d3.scale.linear()
					.domain([0,400])
					.range([0,250]); //domain is input, range is output

	var yscale = d3.scale.linear()
					.domain([0,num_countries])
					.range([0,num_countries*5]);

	d3.select("#graph").remove();

	var canvas = d3.select('.selection-box')
					.append('svg')
					.attr('id', 'graph')
					.attr({'x': 1000, 'y': 10})
					.attr({'width':200,'height':900});

	//add mouseover for bars
	var chart = canvas.append('g')
				.attr('x', 20)
				.attr('id', 'bars')
				.selectAll('rect')
				.data(d3.keys(country_data))
				.enter()
				.append('rect')
				.attr('height', 20)
				.attr({'x':100, 'y':function(d,i) {
					if (regions_with_countries[region].indexOf(d) > -1) {
						return yscale(regions_with_countries[region].indexOf(d)) + 30 + regions_with_countries[region].indexOf(d)*30; 
					}
				}})
				.style('fill', function(d, i) {return colors[i % 16];})
				.attr('width', function(d) {
					if (regions_with_countries[region].indexOf(d) > -1) {
						return xscale(country_data[d])
					}
				})
				.on("mouseover", function(d){
					return tooltip.text(country_data[d]).style("visibility", "visible");
				})
				.on("mousemove", function(d){
					return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
				})
				.on("mouseout", function(d){
					return tooltip.style("visibility", "hidden");
				});
				// .on("mouseover", function(d) {
				// 	//console.log(country_data[d]);
				// })
				// .on("click", function(d) {
				// 	display_posters(d);
				// }); 

	var y_pos;
	var transitext = d3.select('#bars')		//if too long, put on next line - get length of string js?
						.selectAll('text')
						.data(d3.keys(country_data))
						.enter()
						.append('text')
						.attr({'x':function(d) {
							if (regions_with_countries[region].indexOf(d) > -1) { //x coord of text
								return 20; 
							}
						},'y':function(d,i) { 
							if (regions_with_countries[region].indexOf(d) > -1) { 
								return yscale(regions_with_countries[region].indexOf(d)) + 44 + regions_with_countries[region].indexOf(d)*30; 
							}
						}})
						.text(function(d) { 
							if (regions_with_countries[region].indexOf(d) > -1) {
								return d; 
							}
						}).style({'fill':'black','font-size':'11px', 'font-family':'sans-serif', 'font-weight':'bold'});

}


//put these inside another function, on ready state etc IF TIME
$.getJSON( "../data/data.json", function(json) {
	imdb_data = json;
 	display_posters("Mexico");
 	d3.select(".selection-box").style("background", "grey");
 	d3.selectAll("button").style("visibility", "visible");

 	$.getJSON("../data/country_data.json", function(json) {
 		build_buttons(json);
 	});
});


    //make absolute relative to page so it scrolls with user
    //images: scrolling within div, make border
    //filter by country

    //click - grow out of center, animation - or get dark and appear in center, click outside to go back

    //add mouseover/click to show data - title, director, year

	//mouseover images * - change size, move other images - or just tooltip showing info? depends on size
	//mouseover show title, director, year
	//click images and show info *
	//make div with images into a view
	//scale to fit according to location/date - d3 filter function

// 	d.style.position = "absolute";
// d.style.left = x_pos;
// d.style.top = y_pos;
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

//fix formatting/div locations
//mouseover/mouseout between graph and posters
//sizing of posters/displaying all poster
//size based on number of posters

//small map
//dateslider later
*/