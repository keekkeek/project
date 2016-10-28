
function _register(){
	
	var userId = $("#userId").val();
	var psw = $("#password").val();
	var repsw = $("#repassword").val();
	
	if(userId == ""){
		alert("请输入用户名");
	}else{
		if(psw == ""){
			alert("请输入密码");
		}else{
			if(psw != repsw){
				alert("两次密码输入不一致");
			}else{
				var user = getUser(userId,psw);
				toRegister(user);
			}
		}
	}
}

function getUser(name,psw){
	var user = {
		userID:name,
		password:psw
	}
	return user;
}

function toRegister(user){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		data:{status:"register",userID:user.userID,password:user.password},
		success:function(data){
			if(data==0){
				alert("用户名重名");
			}
			if(data==1){
				alert("注册成功");
				save(user);
			}
			if(data==2){
				alert("您的浏览器出现异常");
			}
		}
	});
}

function save(user){
	var info = {};
	info.userID = user.userID;
	info.password = user.password;
	var data = JSON.stringify(info);
	localStorage.setItem("choujiang",data);
}
