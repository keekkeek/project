$(function(){
	login(setInfo,setInfo2);
	slide('shopcar.html','more.html');
});

function setInfo(data){
	var info = JSON.parse(data);
	$(".nicheng").text(info[1]);
	$("#myorder").on("touchstart",function(){
		pageJump('myorder.html');
	});
	$("#mycoupon").on("touchstart",function(){
		pageJump('mycoupon.html');
	});
	$("#record").on("touchstart",function(){
		pageJump('record.html');
	});
	$("#mystore").on("touchstart",function(){
		pageJump('mystore.html');
	});
}

function setInfo2(data){
	$(".register").css({"display":"block"});
	$(".signup").css({"display":"block"});
	$(".nicheng").text("未知");
	$(".register").on("touchstart",function(){
		window.location = "register.html";
	});
	$(".signup").on("touchstart",function(){
		window.location = "login.html";
	});
	
	$("#myorder").on("touchstart",function(){
		var _message = message("请先登录",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
		}));
	});
	
	$("#mycoupon").on("touchstart",function(){
		var _message = message("请先登录",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
		}));
	});
	$("#record").on("touchstart",function(){
		var _message = message("请先登录",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
		}));
	});
	$("#mystore").on("touchstart",function(){
		var _message = message("请先登录",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
		}));
	});
}

