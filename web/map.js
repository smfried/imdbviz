
var data; //save this?

/*
-download jquery, use jquery to upload file
-import files and ajax request them 
-parse json, get image urls, display image urls
-display images
-display images by decade
-group by country? how to do this?

-map/count on mouseover
-dateslider at bottom

-mouseover: show title/director/year

-look at how many films per year/history of violence? 

*/

//TODO fix this for chrome - wrap call
//save with callback function
//display images with callback function?
//have to save for mouseover images and click images

var dataset = [ 5, 10, 15, 20, 25 ];

//this should call other functions
function callback(data) {
	console.log(data[1].title[0]);

	d3.select("body").selectAll("p")
    	.data(data)
    	.enter()
    	.append("p")

    d3.selectAll("p").text(function(d) { return d.title; });
    //display actual images
	//mouseover images * - change size, move other images - or just tooltip showing info? depends on size
	//click images and show info *
	//make div with images into a view

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