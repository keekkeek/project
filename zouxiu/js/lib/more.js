$(function(){
	$("#exit").on("touchstart",function(){
		login(exit,exit2);
	});
	slide('myshow.html','');
});

function exit(){
	localStorage.removeItem("user");
	var _message = message("退出成功",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
	}));
}

function exit2(){
	var _message = message("你丫的，压根就没登录",(function(){
		setTimeout(function(){
			_message.remove();
		},1500);
	}));
}
