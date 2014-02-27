var args = arguments[0] || {};

var points = Alloy.Collections.points;
points.fetch();

/*
var points = Alloy.Collections.points;

points.fetch();


*/
function whereFunction(collection) {
    return points.where({trajetid:args.item_id});
}
function transformFunction(model) {
	var transform = model.toJSON();
	transform.title = JSON.stringify(transform);  //'[' + transform.title + ']';
	// Example of creating a custom attribute, reference in the view using {custom}
	//transform.custom = transform.title + " by " + transform.author;
	return transform;
}

//$.init();
