var myScroll;
var id = 1;


$(function(){
	getClassData();
	slide("../index.html","shopcar.html");
	$("#wrapper").on("touchend",function(){
		//下拉刷新
		if(myScroll.y>0){
			$("#scrollbar").empty();
			$("#scrollbar")[0].innerHTML = info;
			id = 1;
			getData(id);
			//getData(id);
		}
		//上拉刷新
		if(myScroll.y<myScroll.maxScrollY-5){
			id++;
			getData(id);
		}
	});
});

var isspread = false;

function changeArrow(obj){
	var arr = $(".title");
	$.each(arr, function(index) {
		var _img = $(arr[index]).find("img").eq(0);
		_img.attr({"src":"../img/base10.png"});
	});

	var _img = obj.find("img").eq(0);
	_img.attr({"src":"../img/base9.png"});
	
}

var isSpread = false;

//点击全部按钮对下面的进行控制
function _isSpread(){
	if(isSpread){
		$(".kind2").css({"display":"none"});
		$(".kind1").find(".img2").attr({"src":"../img/base10.png"});
		isSpread = false;
	}else{
		$(".kind2").css({"display":"-webkit-box"});
		$(".kind1").find(".img2").attr({"src":"../img/base9.png"});
		isSpread = true;
	}
}

$(".kind1").on("touchstart",function(){
	_isSpread();
});

function getClassData(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success:function(data){
			var thisdata = JSON.parse(data);
			$.each(thisdata,function(index){
				var classID = thisdata[index]["classID"];
				var className = thisdata[index]["className"];
				var div = $("<div class='kind2'></div>");
				var title = $("<div class='title'>"+className+"<img class='img2' src='../img/base10.png'/></div>");
				$("#all").append(div);
				div.append(title);
				title.on("touchstart",function(){
					var isSpread = div.find("#wrapper");
					if(isSpread.length != 0){
						$("#wrapper").remove();
						var _img = title.find("img").eq(0);
						_img.attr({"src":"../img/base10.png"});
					}else{
						var isExist = $("#wrapper");
						if(isExist.length != 0){
							$("#wrapper").remove();
						}
						var wrapper = $("<div class='wrapper main' id='wrapper'></div>");
						var scrollbar = $("<div class='scrollbar' id='scrollbar'></div>");
						div.append(wrapper);
						wrapper.append(scrollbar);
						load();
						getData(classID);
						changeArrow(title);
					}
				});
			});
		}
	});
}

//根据类ID获取一类的数据
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
					
					img.on("touchstart",function(){
						goodsID = data[index].goodsID;
						window.location = "introduce.html?goodsID="+encodeURI(data[index].goodsID);
					});
					
					//针对页面的每购物车按钮进行控制,跳转的函数
					_button.on("touchstart",function(){
						var goodsID = data[index].goodsID;
						var number = 1;
						if(isLogin){
							getCarInfo(userID,updateDate,fn);
						}else{
							login(loginYes,loginNO);
						}
						function loginYes(data){
							isLogin = true;
							getCarInfo(userID,updateDate,fn);
						}
						
						function loginNO(data){
							isLogin = false;
							message("未登录账号",(function(){
								var left = $("<button class='message_left'>去登录</button>");
								var right = $("<button class='message_right'>取消</button>");
								$(".message").append(left);
								$(".message").append(right);
								left.on("touchstart",function(){
									window.location = "login.html";
								});
								right.on("touchstart",function(){
									$(".message").remove();
								});
							}));
						}
						
						function updateDate(){
							$.ajax({
								type:"post",
								url:"http://datainfo.duapp.com/shopdata/updatecar.php",
								data:{userID:userID,goodsID:goodsID,number:number},
								success:function(data){
									if(data==1){
										var _message = message("在购物车中加1",(function(){
											setTimeout(function(){
												_message.remove();
											},1500);
										}));
									}else{
										var _message = message("浏览器异常",(function(){
											setTimeout(function(){
												_message.remove();
											},1500);
										}));
									}
								}
							});
						}
						
						function fn(data){
							$.each(data, function(index) {
								var goods_id = data[index]["goodsID"];
								
								if(goods_id == goodsID){
									console.log(data[index]["number"]);
									number = parseInt(data[index]["number"]) + 1;
								}
							});
							updateDate();
						}
						
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

//滚动条验证登录
function load(){
	myScroll = new IScroll("#wrapper",{
		mouseWheel : true,
		scrollbars : true
	});
}
