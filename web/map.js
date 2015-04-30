//thurs:
/*

GET RID OF OPACITY
mouseover for graph to show numbers 
1. click to show films (non-ugly rendering if time) - re-render function
2. click on film
3. graph scaling and design/colors

(3. button backgrounds - make buttons pop / collapse css button)
4. Click on poster
5. Add show all button to go back to start state

if time, general highlight box to click on graph and display films / zooming

intro/scroll down and intro disappears - how to do this
definitely write intro with some data analysis and observations about countries
US bias undoubtedly because IMDB is US-based? or is IMDB comprehensive, and the US makes the most movies (probably both but check)
discuss a few examples

intro -> scroll -> all films/box open -> option to close box

no map/no multiple countries

*/

var start_x = 0;
var start_y = 0;

//size of biggest region list, then mod
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

//scale according to number of elements
//pass in more option args
//sizing based on width of image, get from metadata or not?
function set_location(data) {
	var x_space = 0;
	var y_space = 0;
	var films_per_row = 32;

	var x_margin = 30;
	var y_margin = 50;

    for(var i=0;i<data.length;i++){
		if (data[i].image[0]) { 	//&& data[i].country[0] && data[i].country[0] == "Laos" - not working, need to change coords as well
			data[i].x = start_x + (x_margin * x_space);
			//change this to account for browser size
			data[i].y = start_y + (y_margin * y_space);
			x_space++;
			if (x_space % films_per_row == 0) {
				x_space = 0;
				y_space++;
			}
		}
	}

	return data;
}

//2. display films by country - test with US, then with laos, etc
//4. mouseover/animation - main film gets bigger, other films squish down into black lines, then squish back up
		// or film just gets bigger and others stay behind it if that looks ok - mouseover with title/director/year - just show year here
//5. add country filtering, possibly year filtering 

//more than one country at once/if checked off / making rendering look good based on number of films to render

//scroll down from intro and stay there- on scroll hide textbox - or hide button, but if scroll back up see text

//pass in array of country options
function display_posters(data) {
 	data = set_location(data);

	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
    	y = w.innerHeight|| e.clientHeight|| g.clientHeight;

 	var min_year = d3.min(data, function(d) {return d.year[0]; });
 	var max_year = d3.max(data, function(d) {return d.year[0]; });

	var svg = d3.select("body")
		.append("svg")
		.attr('id', 'posters')
		.attr("width", x)
		.attr("height", 2800);

    var imgs = d3.select("svg").selectAll("image")
    	.data(data)
    	.enter()
    	.append("svg:image")
    	.attr("xlink:href", function (d) { return d.image ; })
    	.attr("x", function (d) { return d.x; }) 
    	.attr("y", function (d) { return d.y; })
    	.attr("width", "50")
    	.attr("height", "50");

    d3.select(".selection-box").style("background", "grey"); 
    				//.on("click", )	//hide and show

    d3.selectAll("button").style("visibility", "visible");
    			//.style("background-color", "red");
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
	console.log(num_countries);

	//xscale - max and with filter
	//yscale - takes in i, replace with own function, domain is size of region

	var xscale = d3.scale.linear()
					.domain([0,100])
					.range([0,722]);

	var yscale = d3.scale.linear()
					.domain([0,200]) //multiple by num_countries
					.range([0,700]);

	var colorScale = d3.scale.quantize()
					.domain([0,num_countries])
					.range(colors);

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
				.style('fill', function(d, i) {return colorScale(i);})
				.attr('width', function(d) {
					if (regions_with_countries[region].indexOf(d) > -1) {
						return xscale(country_data[d])
					}
				})
				// .on("mouseover", function(d) {
				// 	console.log(country_data[d]);
				// })
				.on("click", function(d) {
					console.log(d)
				}); 

	var y_pos;
	var transitext = d3.select('#bars')
						.selectAll('text')
						.data(d3.keys(country_data))
						.enter()
						.append('text')
						.attr({'x':function(d) {
							if (regions_with_countries[region].indexOf(d) > -1) { //x coord of text
								return d-200; 
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
						}).style({'fill':'black','font-size':'14px'})
						.on("click", function(d) {
							console.log(d)
						});
}


//put these inside another function, on ready state etc IF TIME
$.getJSON( "../data/data.json", function(json) {
 	display_posters(json);
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