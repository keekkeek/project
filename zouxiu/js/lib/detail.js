$(function(){
    goodsID = getQueryString("goodsID");
	getGoods(goodsID,setFace);
	var page_arr3 = [{"box":"#js","page":"introduce.html?goodsID="+goodsID},{"box":"#xq","page":"detail.html?goodsID="+goodsID},
	{"box":"#sp","page":"photo.html?goodsID="+goodsID}];
	turning(page_arr3);
	slide("introduce.html?goodsID="+goodsID,"photo.html?goodsID="+goodsID);
});

function setFace(data){
	var img = data[0][3];
	$(".brand").attr({"src":img});
	var content = data[0]["detail"];
	$(".context").html(content);
}
