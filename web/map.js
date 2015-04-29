
var data; //save this?
var start_x = -20;
var start_y = 10;
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
//sizing based on width of image, get from metadata or not?
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
 	data = set_location(data);

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

//position at static location
//DIV POSITIONING
function build_buttons(country_data) {	
	d3.select("body").selectAll("input")
			.data(regions)
			.enter()
			.append("input")
			.attr("type","button")
			.attr("class","button")
			.attr("value", function (d) {return d;} )
			.on("click", function () { 
				display_countries(country_data, this.value);
			});

}

//this needs to redraw every time
function display_countries(country_data, region) {
	var num_countries = Object.keys(country_data).length;
	var num_regions = Object.keys(regions_with_countries).length;

		var grid = d3.range(25).map(function(i){
			return {'x1':0,'y1':0,'x2':0,'y2':480};
		});

		var xscale = d3.scale.linear()
						.domain([1,1784])
						.range([0,722]);

		var yscale = d3.scale.linear()
						.domain([0,240])
						.range([0,700]);

		var colorScale = d3.scale.quantize()
						.domain([0,num_countries])
						.range(colors);

		d3.select("svg").remove();

		var canvas = d3.select('#wrapper')
						.append('svg')
						.attr({'width':1300,'height':800});

		var chart = canvas.append('g')
					.attr('x', 20)
					.attr("transform", "translate(950,0)")
					.attr('id', 'bars')
					.selectAll('rect')
					.data(d3.keys(country_data))
					.enter()
					.append('rect')
					.attr('height', 2)
					.attr({'x':100, 'y':function(d,i) {
						if (regions_with_countries[region].indexOf(d) > -1) {
							return yscale(i)+40; 
						}
					}})
					.style('fill', function(d, i) {return colorScale(i);})
					.attr('width', function(d) {
						if (regions_with_countries[region].indexOf(d) > -1) {
							return xscale(country_data[d])
						}
					}); //new scale function


		var transitext = d3.select('#bars')
							.selectAll('text')
							.data(d3.keys(country_data))
							.enter()
							.append('text')
							.attr({'x':function(d) {
								if (regions_with_countries[region].indexOf(d) > -1) {
									return d-200; 
								}
							},'y':function(d,i) { 
								if (regions_with_countries[region].indexOf(d) > -1) {
									return yscale(i) + 42; 
								}
							}})
							.text(function(d) { 
								if (regions_with_countries[region].indexOf(d) > -1) {
									return d; 
								}
							}).style({'fill':'black','font-size':'9px'});
		//2 columns, fix spacing, fix colors
		//scrolls with floating bar graph

		//select by region and then select by country

		//fix positioning so divs go next to each other

	//map


}

$.getJSON( "../data/small_data.json", function(json) {
 	//callback(json); 
});

$.getJSON("../data/country_data.json", function(json) {
	build_buttons(json);
	//drawMap();
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

//fix formatting/div locations
//countries with one film not showing up
//mouseover/mouseout between graph and posters
//sizing of posters/displaying all poster
//size based on number of posters

//small map
//dateslider later
*/