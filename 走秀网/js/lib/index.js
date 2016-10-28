var myScroll;
var myWisper;
var id = 1;
var userID;
//滚动图等信息

$(function(){
	load();
	loadSwiper();
	var info = $("#scrollbar")[0].innerHTML;
	getData(id);
	$("#wrapper").on("touchend",function(){
		//下拉刷新
		if(myScroll.y>0){
			$("#scrollbar").empty();
			$("#scrollbar")[0].innerHTML = info;
			id = 1;
			getData(id);
			loadSwiper();
		}
		//上拉刷新
		if(myScroll.y<myScroll.maxScrollY-50){
			id++;
			getData(id);
		}
	});
});

//购物车操作


function getUser(){
	var info = localStorage.getItem("user");
	var value = JSON.parse(info);
	return value["userID"];
}

function getShopCar(userID){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				alert("购物车为空");
			}else{
				alert(data);
			}
		}
	});
}

function load(){
	myScroll = new IScroll("#wrapper",{
		mouseWheel : true,
		scrollbars : true
	});
}

function loadSwiper(){
	myWisper = new Swiper("#banner",{
		autoplay:1000,
		pagination:".swiper-pagination",
		autoplayDisableOnInteraction:false,
		paginationClickable:true
	});
}

function getData(id){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{classID:id},
		success:function(data){
			if(data.length){
				var $scrollBox = $("#scrollbar");
				$.each(data, function(index) {
					//拼接字符串
					var goods = $("<div class='goods'></div>");
					var left = $("<div class='left'>图片加载中....</div>");
					var img = $("<img class='img2' src= '"+data[index].goodsListImg+"' />");
					var right = $("<div class='right'>");
					var p1 = $("<div class='p1'>"+data[index].goodsName+"</div>")
					var p2 = $("<div class='p2'>&yen;"+data[index].price+"</div>")
					var span = $("<span>&nbsp;&nbsp;</span>");
					var del = $("<del>&yen;28880</del>");
					var p3 = $("<div class='p3'>0折</div>")
					var _button = $("<button class='push'></button>");
					
					goods.append(left);
					goods.append(right);
		
					img.on("load",function(){
						myScroll.refresh();
						left.empty();
						left.append(img);
					});
					
					//购物车的button按钮进行设置
					_button.on("touchstart",function(){
						var user = getUser();
						getShopCar(user);
					});
					
					right.append(p1);
					right.append(p2);
					p2.append(span);
					span.append(del);
					right.append(p3);
					right.append(_button);
					
					$scrollBox.append(goods);
				});
			}
		}
	});
}

//模糊查询
function Fuzzyearch(){
	var val = $("#import").val();
	if(val.length > 2){
		var value = encodeURI(val);
		$.ajax({
			type:"get",
			dataType:"jsonp",
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
			data:{selectText:value},
			success:function(data){
				var $box = $("#box_search");
				$box.empty();
				$.each(data, function(index){
					var $li = $("<li>"+data[index].goodsName+"</li>");
					$box.append($li);
				});
				$box.show();
			}
		});
	}else{
		$("#box_search").empty();
		$("#box_search").hide();
	}
}
