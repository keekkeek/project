var userID;
$(function(){
	//userID = getUser();
	//getShopCar(userID);
});

function getUser(){
	var info = localStorage.getItem("user");
	var value = JSON.parse(info);
	return value["userID"];
}

function getShopCar(userID){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:userID},
		success:function(data){
			if(data == 0){
				alert("购物车为空");
			}else{
				alert(data);
			}
		}
	});
}

function revise(){
	
}
