var page_arr = [{"box":"#shouye","page":"../index.html"},{"box":"#fenlei","page":"page2.html"},
{"box":"#gwc","page":"shopcar.html"},{"box":"#wdx","page":"myshow.html"},
{"box":"#more","page":"page15.html"}]

var page_arr2 = [{"box":"#shouye","page":"index.html"},{"box":"#fenlei","page":"html/page2.html"},
	{"box":"#gwc","page":"html/shopcar.html"},{"box":"#wdx","page":"html/myshow.html"},
	{"box":"#more","page":"html/page15.html"}];

var goodsID = "";

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


var isLogin = false;
var userID;
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
	}
	//ajax数据验证
	function ajaxComfirm(user){
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"login",userID:user.userID,password:user.password},
			success:function(data){
				if(data.charAt(0)){
					//ajax验证成功
					isLogin = true;
					if(fn != ""){
						fn(data);
					}
					//账户页面的改变填写.	
				}else{
					//ajax验证失败
					isLogin = false;
					if(fn2 != ""){
						fn2(data);
					}
				}
			}
		});
	}
}

function shopIsNull(userID,fn,fn2){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				window.location = page_arr2[2].page;
			}else{
				window.location = page_arr2[2].page;
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
}

function shopcar2(){
	$(".info").remove();
	var info = $("<div class='info'></div>");
	var p1 = $("<p class='p1'>商品数量 : </p>");
	var amount = $("<span id='amount'></span>");
	var p2 = $("<p class='p2'>应付金额(不含运费) : </p>");
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

//获得购物车用户的ID
function getUser(){
	var info = localStorage.getItem("user");
	var value = JSON.parse(info);
	return value["userID"];
}

function postShopcar(userID,goodsID,number){
	$.ajax({
	type:"post",
	url:"http://datainfo.duapp.com/shopdata/updatecar.php",
	data:{userID:userID,goodsID:goodsID,number:number},
	success:function(data){
		if(data == 1){
			alert("数据更新成功");
		}else{
			alert("浏览器异常");
		}
	}
	});
}



function updateInfo(userID,info,val){
	goodsID = info["goodsID"];
	number = val;
	postShopcar(userID,goodsID,number);
	if(val<=0){
		deleteList();
	}
}

function getShopcar(userID){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				alert("购物车为空");
			}else{
				$.each(data, function(index) {
					var info = data[index];
					var detail = $("<div class='detail'></div>");
					var left = $("<div class='left'></div>");
					var right = $("<div class='right'></div>");
					$("#main").append(detail);
					detail.append(left);
					detail.append(right);
					var img = $("<img />");
					img.attr({"src":info["goodsListImg"]});
					left.append(img);
					var p3 = $("<p class='p3'></p>");
					p3.text(info["goodsName"])
					var p4 = $("<p class='p4'>单价 : </p>");
					var p5 = $("<p class='p5'>数量 : </p>");
					var amount = $("<div class='amount'></div>");
					var price = $("<span class='price'></span>");
					var size = $("<span class='size'>L</span>");
					price.html("&yen;"+info["price"]);
					var minus = $("<button class='minus'>-</button>");
					var plus = $("<button class='plus'>+</button>");
					var _number = $("<input class='number' type='text' value=''/>");
					_number.attr({"value":info["number"]});
					right.append(p3);
					right.append(p4);
					right.append(amount);
					p4.append(price);
					p4.append(size);
					amount.append(p5);
					amount.append(minus);
					amount.append(_number);
					amount.append(plus);
					var dustin = $("<img class='dustbin' src='../img/base12.png' />");
					right.append(dustin);
					
					function deleteList(){
						detail.remove();
					}
					
					minus.on("touchstart",function(){
						var val = parseInt(_number.val());
						val--;
						_number.val(val);
						updateInfo(userID,info,val);
					});
					
					plus.on("touchstart",function(){
						var val = parseInt(_number.val());
						val++;
						_number.val(val);
						updateInfo(userID,info,val);
					});
					
					dustin.on("touchstart",function(){
						_number.val(0);
						updateInfo(userID,info,val);
					});
					
					_number.on("keyup",function(){
						var val =""+parseInt(_number.val());
						if(val!="NaN"){
							_number.val(val);
							updateInfo(userID,info,val);
						}
					});
				});
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
	
	var clientHeight = document.body.clientHeight||document.documentElement.clientHeight;
	var offsetHeight = message.attr("offsetHeight");
	var _top = (clientHeight - offsetHeight)/2;
	message.css({"top":_top+"px"});
	
	if(fn!=''){
		fn();
	}
}



