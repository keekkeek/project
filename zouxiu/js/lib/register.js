
function _register(){
	
	var userId = $("#userId").val();
	var psw = $("#password").val();
	var repsw = $("#repassword").val();
	
	if(userId == ""){
		var _message = message("请输入用户名！",(function(){
			setTimeout(function(){
				_message.remove();
			},1500);
		}));
	}else{
		if(psw == ""){
			var _message = message("请输入密码！",(function(){
				setTimeout(function(){
					_message.remove();
				},1500);
			}));			
		}else{
			if(psw != repsw){
				var _message = message("两次密码输入不一致！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));				
			}else{
				var user = setUser(userId,psw);
				toRegister(user);
			}
		}
	}
}

function toRegister(user){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{status:"register",userID:user.userID,password:user.password},
		success:function(data){
			if(data==0){
				var _message = message("用户名重名！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));					
			}
			if(data==1){
				var _message = message("注册成功！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));				
				save(user);
			}
			if(data==2){
				var _message = message("您的浏览器出现异常！",(function(){
					setTimeout(function(){
						_message.remove();
					},1500);
				}));				
			}
		}
	});
}

function save(user){
	var info = {};
	info.userID = user.userID;
	info.password = user.password;
	var data = JSON.stringify(info);
	localStorage.setItem("user_re",data);
}
