$(function(){
	var user = localStorage.getItem("user_re");
	if(user&&user!=""){
		$("#userId").val(JSON.parse(user).userID);
		$("#password").val(JSON.parse(user).password);
	}
})

function _login(){
	var userID = $("#userId").val();
	var pwd = $("#password").val();
	var check = $("#check").attr("checked");
	
	if(userID == ""){
		var _message = message("请输入用户名！",(function(){
			setTimeout(function(){
				_message.remove();
			},1500);
		}));
	}else{
		if(pwd == ""){
			var _message = message("请输入密码！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));		   
		}else{
			if(check != "checked"){
				var _message = message("确认框没有勾选！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));				
			}else{
				var user = setUser(userID,pwd);
				toLogin(user);
			}
		}
	}
}

function toLogin(user){
	var check = $("#check").attr("checked");
	
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",
	{status:"login",userID:user.userID,password:user.password},function(data){
		if(data == 0){
			//ajax验证失败,用户名不存在
			var _message = message("用户名不存在！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));			
		}else if(data == 2){
			//ajax验证失败,用户密码不符
			var _message = message("用户密码不符！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));				
		}else{
			//ajax验证成功				
			if(check){
				var obj = {
					userID:user.userID,
					password:user.password
				}
				var str = JSON.stringify(obj);
				localStorage.setItem("user",str);
			}
			var _message = message("登录成功！",(function(){
				setTimeout(function(){
					_message.remove();
					window.location = "../index.html";
				},1500);
			}));
		}
	})
}
