$(function(){
    var	userID = getUser();
	shopIsNull(userID,shopcar1,shopcar2);
	slide('classify.html','myshow.html');
});

function deleteList(detail){
	detail.remove();
}

function updateInfo(userID,info,val){
	goodsID = info["goodsID"];
	number = val;
	postShopcar(userID,goodsID,number);
}

//对购物车页面进行数据的填入操作并给按键配置好相关的事件
function getShopcar(userID){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				var _message = message("浏览器异常！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));
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
					
					//对过个按钮的事件进行添加
					minus.on("touchstart",function(){
						var val = parseInt(_number.val());
						val--;
						_number.val(val);
						updateInfo(userID,info,val);
						circumlate();
						if(val<=0){
							detail.remove();
						}
					});
					
					plus.on("touchstart",function(){
						var val = parseInt(_number.val());
						val++;
						_number.val(val);
						updateInfo(userID,info,val);
						circumlate();
					});
					
					dustin.on("touchstart",function(){
						_number.val(0);
						var val = 0;
						updateInfo(userID,info,val);
						circumlate();
						if(val<=0){
							detail.remove();
						}
					});
					
					_number.on("keyup",function(){
						var val =""+parseInt(_number.val());
						if(val!="NaN"){
							_number.val(val);
							updateInfo(userID,info,val);
							circumlate();
							if(val<=0){
								detail.remove();
							}
						}
					});
				
				   if(index == (data.length-1)){
				   	circumlate();
				   }
				   
				});
			}
		}
	});
}

function circumlate(){
	var _number = $(".number");
	var price = $(".price");
	var amount = 0,cost = 0;
	var len = _number.length;
	for(var i=0;i<len;i++){
		amount = amount + parseInt(_number.eq(i).val());
		cost = cost + tran(parseInt(_number.eq(i).val()),Number(price.eq(i).text().substr(1)));
		console.log(_number.eq(i).val());
		console.log(price.eq(i).text().substr(1));
		console.log(cost);
	}
	$("#amount").text(amount);
	$("#money").html("&yen;"+cost);
}

//解决js中小数的乘法运算时会出现浮点错误
Number.prototype.rate = function(){
	var Str = this.toString();
	if(Str.indexOf(".")==-1){
		return 1;
	}else{
		return Math.pow(10,parseInt(Str.length-Str.indexOf(".")-1));
	}
}

function tran(){
	args = tran.arguments;
	var temp = 1;
	for(var i=0;i<args.length;i++){
		temp*=args[i]*args[i].rate();
	}
	for(var i=0;i<args.length;i++){
		temp/=args[i].rate();
	}
	return temp;
}
