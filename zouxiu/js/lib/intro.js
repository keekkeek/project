$(function(){
    goodsID = getQueryString("goodsID");
	getGoods(goodsID,setFace);
	var page_arr3 = [{"box":"#js","page":"introduce.html?goodsID="+goodsID},{"box":"#xq","page":"detail.html?goodsID="+goodsID},
	{"box":"#sp","page":"photo.html?goodsID="+goodsID}];
	turning(page_arr3);
	slide('',"detail.html?goodsID="+goodsID);
});

function setFace(data){
	var img = data[0][3];
	var buynumber = data[0].buynumber;
	var price = data[0].price;
	var discount = data[0].discount;
	var ori_price = parseInt(price/discount*10);
	$(".display").attr({"src":img});
	$("del").text(ori_price);
	$(".discount").text(discount+"折");
	$(".number").text(buynumber+"人购买");
	var str = "&yen;"+price+" 灰色印花短袖T桖";
	$(".name").html(str);
}































