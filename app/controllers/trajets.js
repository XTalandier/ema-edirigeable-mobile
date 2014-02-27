var trajets = Alloy.Collections.trajets;
trajets.fetch();

function showDetail(e) {
	var item_id = e.row.item_id;
    Alloy.createController("trajetDetails", {"item_id": item_id}).getView().open();
}
