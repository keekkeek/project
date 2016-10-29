$(function(){
    goodsID = getQueryString("goodsID");
	getGoods(goodsID,setFace);
	var page_arr3 = [{"box":"#js","page":"introduce.html?goodsID="+goodsID},{"box":"#xq","page":"detail.html?goodsID="+goodsID},
	{"box":"#sp","page":"photo.html?goodsID="+goodsID}];
	turning(page_arr3);
});

function loadSwiper(){
	mySwiper = new Swiper("#banner",{
		autoplay:1000,
		loop:true,
		pagination:".swiper-pagination",
		paginationClickable:true,
		autoplayDisableOnInteraction:false
	});
}

function setFace(data){
	var imgs = data[0].goodsBenUrl;
	var imgsArray = eval(imgs);
	var $slides = $("#slides");
	for(var i=0;i<imgsArray.length;i++){
		var detailImg = $("<div class='swiper-slide'><img src='"+imgsArray[i]+"' width='100%'/></div>")
		$slides.append(detailImg);
	}
	$("#detail").text(data[0].detail);
	loadSwiper();
}
