
var data; //save this?

/*
-import files and ajax request them 
-get image urls, display image urls
-display images
-display images by decade
-group by country? how to do this?

-map/count on mouseover
-dateslider at bottom

-mouseover: show title/director/year

-look at how many films per year/history of violence? 

*/

//today: images working
//tomorrow: map and dateslider (mvc), lit review

//TODO fix this for chrome - wrap call
//save with callback function
//have to save for mouseover images and click images

//svg image elements	

//this should call other functions
function callback(data) {
	//console.log(data[1].title[0]);

	// d3.select("body").selectAll("p")
 //    	.data(data)
 //    	.enter()
 //    	.append("p")

 //    d3.selectAll("p").text(function(d) { return d.title; });

    var svg = d3.select("body")
            .append("svg")
            .attr("width", 2000)
            .attr("height", 1000)
            .style("border", "1px solid black");


    //only showing one image
    var imgs = svg.selectAll("image").data(data);
    imgs.enter()
        .append("svg:image")
        .attr("xlink:href", function (d) { return d.image ; })
        .attr("x", "60")
        .attr("y", "60")
        .attr("width", "200")
        .attr("height", "200");
    //display actual images
	//mouseover images * - change size, move other images - or just tooltip showing info? depends on size
	//mouseover show title, director, year
	//click images and show info *
	//make div with images into a view
	//scale to fit according to location/date - d3 filter function

}

$.getJSON( "../data/small_data.json", function( json ) {
 	callback(json); 
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