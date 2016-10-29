$(function(){
	var user = localStorage.getItem("user");
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
		alert("请输入用户名");
	}else{
		if(pwd == ""){
		   alert("请输入密码");
		}else{
			if(check != "checked"){
				alert("确认框没有勾选");
			}else{
				var user = getUser(userID,pwd);
				toLogin(user);
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

function toLogin(user){
	var check = $("#check").attr("checked");
	
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",
	{status:"login",userID:user.userID,password:user.password},function(data){
		if(data.charAt(0)){
			alert("登录成功");
			if(check){
				var obj = {
					userID:user.userID,
					password:user.password
				}
				var str = JSON.stringify(obj);
				localStorage.setItem("user",str);
				//sessionStorage.setItem("user",str);
			}
		}else{
			alert("登录失败");
		}
	})
}
