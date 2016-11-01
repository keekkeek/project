var page_arr = [{"box":"#shouye","page":"../index.html"},{"box":"#fenlei","page":"classify.html"},
{"box":"#gwc","page":"shopcar.html"},{"box":"#wdx","page":"myshow.html"},
{"box":"#more","page":"more.html"}]

var page_arr2 = [{"box":"#shouye","page":"index.html"},{"box":"#fenlei","page":"html/classify.html"},
	{"box":"#gwc","page":"html/shopcar.html"},{"box":"#wdx","page":"html/myshow.html"},
	{"box":"#more","page":"html/more.html"}];

var goodsID = "";
var userID;
var isLogin = false;


var _location = window.location;
var pathname = _location.pathname;
var page = pathname.split("/");
var arr = page[page.length-1];

//进行翻页处理的函数
function turning(array){
	$.each(array, function(index) {
		var box = array[index].box;
		var page = array[index].page;
		$(box).on("touchstart",function(){
			window.location = page;
		});
	});
}

//footer{共5项}进行翻页的处理
if(arr!="index.html"){
	turning(page_arr);
}else{
	turning(page_arr2);
}

//对页面的后缀进行解析
function getQueryString(name){
	//在要添加的名字前面进行添加前缀   匹配元素的正则表达式
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	//用来查询名称的
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return decodeURI(r[2]);
	}
	return null;
}

//获取商品的信息
function getGoods(goodsID,fn){
	$.ajax({
		type:"get",
		data:{goodsID:goodsID},
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		success:function(data){
			if(fn != ""){
				fn(data);
			}
		}
	});
}

//回到上一个页面
$(".back").on("touchstart",function(){
	history.back();
});
	
//回到首页
$(".return").on("touchstart",function(){
	window.location = "../index.html";
});

//页面的跳转
function pageJump(page){
	console.log(page);
	window.location = page;
}

//login('','');

//判断是否登录的函数
function login(fn,fn2){
	//先获取localsession中的user信息
	//如果存在，就帮用此账号登录，否则，这算没有登录
	var info = localStorage.getItem("user");
	var value = JSON.parse(info);
	if(value!=null){
		userID = value["userID"];
		var password = value["password"];
		user = {
			userID:userID,
			password:password
		};
		ajaxComfirm(user);
	}else{
		var data ='';
		fn2(data);
	}
	
	//ajax数据验证
	function ajaxComfirm(user){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"login",userID:user.userID,password:user.password},
			success:function(data){
				if(data == 0){
					//ajax验证失败,用户名不存在
					isLogin = false;
					if(fn2 != ""){
						fn2(data);
					}
				}else if(data == 2){
					//ajax验证失败,用户名密码不符
					isLogin = false;
					if(fn2 != ""){
						fn2(data);
					}
				}else{
					//ajax验证成功
					isLogin = true;
					if(fn != ""){
						fn(data);
					}
				}
			}
		});
	}
}

//判断购物车是够为空.
function shopIsNull(userID,fn,fn2){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0 || data == 2){	
				if(fn!=''){
					fn();
				}
			}else{
				if(fn2!=''){
					fn2();
				}
			}
		}
	});
}

//购物车有无商品的页面绘制情况
//购物车中内容为空
function shopcar1(){
	$(".info").remove();
	$("#main").empty().removeClass().addClass("main2");
	var p = $("<p class='main2_p'>您的购物车空空&#8764;</p>");
	var img = $("<img class='main2_img' src='../img/base13.png' />");
	var _button = $("<button class='main2_button'>去逛逛</button>");
	$("#main").append(p);
	$("#main").append(img);
	$("#main").append(_button);
	_button.on("touchstart",function(){
		window.location = "../index.html";
	});
}

function shopcar2(userID){
	$(".info").remove();
	var info = $("<div class='info'></div>");
	var p1 = $("<p class='p1'>商品数量 : </p>");
	var amount = $("<span id='amount'></span>");
	var p2 = $("<p class='p2'>应付金额 : </p>");
	var money = $("<span id='money'></span>");
	p2.append(money);
	p1.append(amount);
	info.append(p1);
	info.append(p2);
	$("body").append(info);
	$("#main").empty().removeClass().addClass("main");
	var userID = getUser();
	getShopcar(userID);
}

//获得用户的ID
function getUser(){
	var info = localStorage.getItem("user");
	if(info!=null){
		var value = JSON.parse(info);
		return value["userID"];
	}
}

//设置用户的ID
function setUser(name,psw){
	var user = {
		userID:name,
		password:psw
	}
	return user;
}

function postShopcar(userID,goodsID,number){
	$.ajax({
	type:"post",
	url:"http://datainfo.duapp.com/shopdata/updatecar.php",
	data:{userID:userID,goodsID:goodsID,number:number},
	success:function(data){
		if(data == 1){
			var _message = message("数据更新成功！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));
		}else{
			var _message = message("浏览器异常！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));
		}
	}
	});
}

//出现提示等信息的函数
function message(txt,fn){
	$(".message").remove();
	var message = $("<div class='message'></div>");
	var context = $("<p class='message_txt'></p>");
	message.append(context);
	$(document.body).append(message);
	context.html(txt);
	
	//var clientHeight = document.body.clientHeight||document.documentElement.clientHeight;
	var offsetHeight = message.attr("offsetHeight");
	var _top = (30 - (offsetHeight/16))/2;
	message.css({"top":_top+"rem"});
	if(fn!=''){
		fn();
	}
	return message;
}

//获取购物车中某人(ID)购物的信息并进行操作
function getCarInfo(userID,fn2,fn){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				if(fn2 != ''){
					fn2(data);
				}
			}else{
				if(fn != ''){
					fn(data);
				}
			}
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
						window.location = "html/introduce.html?goodsID="+encodeURI(data[index].goodsID);
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
									window.location = "html/login.html";
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

//页面之间左右的滑动改变页面

function slide(leftLoc,rightLoc){
	var x1,x2;
	$(document).on("touchstart",function(event){
		if(event.targetTouches.length == 1){
			event.preventDefault(); //组织浏览器默认时间
			var touch = event.targetTouches[0];
			  x1 = touch.clientX;
			$(this).on("touchmove",function(event){
				var touch = event.targetTouches[0];
				x2 = touch.clientX;
				$(document).on("touchend",function(){
					var num = x1 - x2;
					if(num < -50){
						if(leftLoc != ""){
							window.location = leftLoc;
						}
					}
					if(num > 50){
						if(rightLoc != ""){
							window.location = rightLoc;
						}
					}
				});
		 	});
	  	}
	});
}
