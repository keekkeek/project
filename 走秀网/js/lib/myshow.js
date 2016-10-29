$(function(){
	login(setInfo2,setInfo);	
});

function setInfo(data){
	$(".register").css({"display":"block"});
	$(".signup").css({"display":"block"});
	$(".nicheng").text("未知");
}

function setInfo2(data){
	var info = JSON.parse(data);
	$(".nicheng").text(info[1]);
	
}
